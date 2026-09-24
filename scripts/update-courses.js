import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

const srcCourseDataPath = path.join(rootDir, 'src', 'courseData.json')
const publicCourseDataPath = path.join(rootDir, 'public', 'courseData.json')
const srcSyncReportPath = path.join(rootDir, 'src', 'data', 'syncReport.json')
const publicSyncReportPath = path.join(rootDir, 'public', 'data', 'syncReport.json')
const envPath = path.join(rootDir, '.env')

// Read GitHub token from process.env or .env if available
function getGitHubToken() {
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN
  if (process.env.GH_TOKEN) return process.env.GH_TOKEN
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8')
      const match = content.match(/^(?:GITHUB_TOKEN|GH_TOKEN|VITE_GITHUB_TOKEN)=(.*)$/m)
      if (match) return match[1].trim().replace(/^['"]|['"]$/g, '')
    } catch {}
  }
  return null
}

// Academic resource extensions only (PDFs, Docs, TXT, Slides, Spreadsheets, Images, Archives, Notebooks)
const ALLOWED_EXTENSIONS = new Set([
  'pdf',
  'docx',
  'doc',
  'txt',
  'rtf',
  'odt',
  'pptx',
  'ppt',
  'xlsx',
  'xls',
  'csv',
  'jpg',
  'jpeg',
  'png',
  'webp',
  'zip',
  'rar',
  '7z',
  'ipynb'
])

function isAllowedFile(filePath, filename, ext) {
  if (!ALLOWED_EXTENSIONS.has(ext)) return false
  const lowerPath = filePath.toLowerCase()
  const lowerFile = filename.toLowerCase()

  // Ignore system, build, IDE, and version control noise
  if (
    lowerPath.includes('/cmakefiles/') ||
    lowerPath.includes('/node_modules/') ||
    lowerPath.includes('/.git/') ||
    lowerPath.includes('/.github/') ||
    lowerPath.includes('/build/') ||
    lowerPath.includes('/dist/') ||
    lowerPath.includes('/compilerid') ||
    lowerPath.includes('/__macosx/') ||
    lowerPath.includes('/.idea/') ||
    lowerPath.includes('/.vscode/')
  ) {
    return false
  }

  // Ignore hidden files and OS artifacts
  if (
    filename.startsWith('.') ||
    filename.startsWith('~') ||
    filename.endsWith('~') ||
    lowerFile === 'thumbs.db' ||
    lowerFile === 'desktop.ini' ||
    lowerFile === '.ds_store'
  ) {
    return false
  }

  return true
}

// Dynamically resolve any submodule or nested commit entry from GitHub without hardcoded lists
async function resolveSubmoduleDynamically(subPath, headers) {
  try {
    // 1. Find the commit on NalishJain/IIITD-PYQs that introduced or touched this submodule
    const commitUrl = `https://api.github.com/repos/NalishJain/IIITD-PYQs/commits?path=${encodeURIComponent(subPath)}`
    const commitRes = await fetch(commitUrl, { headers })
    if (!commitRes.ok) return []
    const commits = await commitRes.json()
    if (!Array.isArray(commits) || commits.length === 0) return []

    const author = commits[0].author?.login
    const commitSha = commits[0].sha

    // 2. Check the commit details for file changes/renames under this path
    const detailUrl = `https://api.github.com/repos/NalishJain/IIITD-PYQs/commits/${commitSha}`
    const detailRes = await fetch(detailUrl, { headers })
    if (detailRes.ok) {
      const detail = await detailRes.json()
      if (Array.isArray(detail.files)) {
        const extracted = []
        const subPrefixUnderscore = subPath.replace(/\s+/g, '_')
        for (const f of detail.files) {
          if (f.filename === subPath || !f.filename.includes('.')) continue
          const ext = f.filename.split('.').pop().toLowerCase()
          if (!ALLOWED_EXTENSIONS.has(ext)) continue
          if (f.filename.startsWith(subPath) || f.filename.startsWith(subPrefixUnderscore)) {
            const rawUrl = f.raw_url || `https://raw.githubusercontent.com/NalishJain/IIITD-PYQs/main/${encodeURI(f.filename)}`
            const name = f.filename.split('/').pop()
            extracted.push({ path: rawUrl, name, type: ext })
          }
        }
        if (extracted.length > 0) return extracted
      }
    }

    // 3. If files were in author's personal repository matching the course name
    if (author) {
      const subject = subPath.split('/')[0]
      const userReposRes = await fetch(`https://api.github.com/users/${author}/repos?per_page=100`, { headers })
      if (userReposRes.ok) {
        const repos = await userReposRes.json()
        if (Array.isArray(repos)) {
          const matchedRepo = repos.find((r) => r.name.toLowerCase() === subject.toLowerCase())
          if (matchedRepo) {
            const defaultBranch = matchedRepo.default_branch || 'main'
            const treeRes = await fetch(
              `https://api.github.com/repos/${author}/${matchedRepo.name}/git/trees/${defaultBranch}?recursive=1`,
              { headers }
            )
            if (treeRes.ok) {
              const treeData = await treeRes.json()
              if (Array.isArray(treeData.tree)) {
                return treeData.tree
                  .filter((i) => i.type === 'blob')
                  .map((i) => {
                    const name = i.path.split('/').pop()
                    const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : ''
                    return {
                      path: `https://raw.githubusercontent.com/${author}/${matchedRepo.name}/${defaultBranch}/${encodeURI(i.path)}`,
                      name,
                      type: ext
                    }
                  })
              }
            }
          }
        }
      }
    }
  } catch (err) {
    console.warn(`Could not resolve submodule ${subPath} dynamically:`, err.message)
  }
  return []
}

async function syncCourses() {
  console.log('='.repeat(70))
  console.log('🚀 NalishJain/IIITD-PYQs Automated Synchronization System')
  console.log('='.repeat(70))

  const token = getGitHubToken()
  const headers = {
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'IIITD-PYQ-Sync-Tool'
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
    console.log('🔑 Authenticated GitHub session detected.')
  } else {
    console.log('ℹ️  Anonymous GitHub request (Rate limit: 60/hr).')
  }

  console.log('📡 Fetching repository tree from GitHub (NalishJain/IIITD-PYQs:main)...')
  const apiUrl = 'https://api.github.com/repos/NalishJain/IIITD-PYQs/git/trees/main?recursive=1'
  const response = await fetch(apiUrl, { headers })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`GitHub API error (${response.status} ${response.statusText}): ${errorText}`)
  }

  const data = await response.json()
  if (!data.tree || !Array.isArray(data.tree) || data.tree.length < 50) {
    throw new Error(`Sanity check failed: GitHub API returned only ${data.tree?.length || 0} entries. Aborting to protect course data.`)
  }

  // Load previous dataset to calculate exact diffs
  let previousData = []
  if (fs.existsSync(srcCourseDataPath)) {
    try {
      previousData = JSON.parse(fs.readFileSync(srcCourseDataPath, 'utf8'))
    } catch {}
  }

  // Build a lookup map of previous files: `${subject}:::${year}:::${filename}`
  const prevFileSet = new Set()
  const prevSubjectMap = new Map()
  for (const sub of previousData) {
    let subCount = 0
    for (const yr of sub.years) {
      for (const f of yr.files) {
        prevFileSet.add(`${sub.subject}:::${yr.year}:::${f.name}`)
        subCount++
      }
    }
    prevSubjectMap.set(sub.subject, subCount)
  }

  // Filter regular blobs (strictly academic PYQ document extensions, skipping code/compiler dumps)
  const blobs = data.tree.filter((item) => {
    if (item.type !== 'blob') return false
    const parts = item.path.split('/')
    if (parts.length < 2) return false // Ignore root files (README.md, .gitignore)
    const filename = parts[parts.length - 1]
    if (filename.startsWith('.') || filename === 'Thumbs.db') return false
    const ext = filename.includes('.') ? filename.split('.').pop().toLowerCase() : ''
    return isAllowedFile(item.path, filename, ext)
  })

  // Detect commit submodules
  const commitSubmodules = data.tree.filter((item) => item.type === 'commit')

  // Subject -> Year -> Files
  const subjectMap = new Map()

  for (const blob of blobs) {
    const parts = blob.path.split('/')
    const subject = parts[0]
    const filename = parts[parts.length - 1]
    const ext = filename.includes('.') ? filename.split('.').pop().toLowerCase() : ''

    const yearMatch = blob.path.match(/(?:20\d\d|19\d\d)/)
    const year = yearMatch ? yearMatch[0] : 'Other'

    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, new Map())
    }
    const yearMap = subjectMap.get(subject)
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }

    const yearFiles = yearMap.get(year)
    // Avoid duplicate entries by name or path
    const isDup = yearFiles.some(
      (f) => f.name.toLowerCase() === filename.toLowerCase() || f.path === blob.path
    )
    if (!isDup) {
      yearFiles.push({
        path: blob.path,
        name: filename,
        type: ext
      })
    }
  }

  // Handle any submodule or nested commit folders dynamically
  for (const sub of commitSubmodules) {
    const parts = sub.path.split('/')
    const subject = parts[0]
    const yearMatch = sub.path.match(/(?:20\d\d|19\d\d)/)
    const year = yearMatch ? yearMatch[0] : 'Other'

    const dynamicFiles = await resolveSubmoduleDynamically(sub.path, headers)
    if (!subjectMap.has(subject)) {
      subjectMap.set(subject, new Map())
    }
    const yearMap = subjectMap.get(subject)
    if (!yearMap.has(year)) {
      yearMap.set(year, [])
    }
    for (const df of dynamicFiles) {
      if (!isAllowedFile(df.path, df.name, df.type)) continue
      const yearFiles = yearMap.get(year)
      const isDup = yearFiles.some(
        (f) => f.name.toLowerCase() === df.name.toLowerCase() || f.path === df.path
      )
      if (!isDup) {
        yearFiles.push(df)
      }
    }
  }

  // Sort and build final structure
  const sortedSubjects = Array.from(subjectMap.keys()).sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: 'base' })
  )

  const addedFilesList = []
  const removedFilesList = []
  const subjectSummaries = []

  const currentFileSet = new Set()

  const result = sortedSubjects.map((subject) => {
    const yearMap = subjectMap.get(subject)
    const years = Array.from(yearMap.keys())

    const numericYears = years
      .filter((y) => y !== 'Other')
      .sort((a, b) => parseInt(b, 10) - parseInt(a, 10))
    const orderedYears = yearMap.has('Other') ? [...numericYears, 'Other'] : numericYears

    let subjectTotalFiles = 0

    const formattedYears = orderedYears.map((year) => {
      // Deterministic sort: files sorted alphabetically by filename
      const files = yearMap.get(year).sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: 'base', numeric: true })
      )
      subjectTotalFiles += files.length

      for (const f of files) {
        const key = `${subject}:::${year}:::${f.name}`
        currentFileSet.add(key)
        if (!prevFileSet.has(key)) {
          addedFilesList.push({ subject, year, name: f.name, type: f.type })
        }
      }

      return {
        year,
        files
      }
    })

    const prevCount = prevSubjectMap.get(subject) || 0
    const diff = subjectTotalFiles - prevCount
    subjectSummaries.push({
      subject,
      totalFiles: subjectTotalFiles,
      years: orderedYears,
      diff
    })

    return {
      subject,
      years: formattedYears
    }
  })

  // Detect removed files
  for (const prevKey of prevFileSet) {
    if (!currentFileSet.has(prevKey)) {
      const [subject, year, name] = prevKey.split(':::')
      removedFilesList.push({ subject, year, name })
    }
  }

  const jsonContent = JSON.stringify(result, null, 2) + '\n'

  // Load raw disk content to check for exact byte equality
  let existingRaw = ''
  if (fs.existsSync(srcCourseDataPath)) {
    try {
      existingRaw = fs.readFileSync(srcCourseDataPath, 'utf8')
    } catch {}
  }

  const isDataIdentical = (existingRaw.trim() === jsonContent.trim())
  const hasAddedFiles = addedFilesList.length > 0
  const hasRemovedFiles = removedFilesList.length > 0
  const hasChanges = !isDataIdentical || hasAddedFiles || hasRemovedFiles

  // Calculate high level stats
  const totalFiles = result.reduce(
    (acc, curr) => acc + curr.years.reduce((yAcc, y) => yAcc + y.files.length, 0),
    0
  )
  const prevTotalFiles = previousData.reduce(
    (acc, curr) => acc + curr.years.reduce((yAcc, y) => yAcc + y.files.length, 0),
    0
  )

  const newlyAddedSubjects = sortedSubjects.filter((s) => !prevSubjectMap.has(s))
  const removedSubjects = Array.from(prevSubjectMap.keys()).filter((s) => !subjectMap.has(s))

  // IDEMPOTENCY GUARD: If no changes whatsoever, do not touch ANY files on disk!
  if (!hasChanges) {
    console.log('\n' + '='.repeat(70))
    console.log('✨ EVERYTHING IS ALREADY UP-TO-DATE!')
    console.log('='.repeat(70))
    console.log(`📚 Total Subjects:       ${result.length} (up-to-date)`)
    console.log(`📄 Total Course Files:   ${totalFiles.toLocaleString()} (up-to-date)`)
    console.log(`🔒 Added: 0, Removed: 0`)
    console.log(`⚡ Datasets left untouched on disk to prevent redundant Git commits.`)
    console.log('='.repeat(70) + '\n')
    return
  }

  // 1. Write src/courseData.json
  fs.writeFileSync(srcCourseDataPath, jsonContent, 'utf8')
  // 2. Write public/courseData.json (for direct static fetches & PWA precache)
  fs.writeFileSync(publicCourseDataPath, jsonContent, 'utf8')

  // Build Sync Report
  const syncReport = {
    timestamp: new Date().toISOString(),
    sourceRepo: 'NalishJain/IIITD-PYQs',
    branch: 'main',
    stats: {
      totalSubjects: result.length,
      totalFiles,
      previousTotalFiles: prevTotalFiles,
      newFilesCount: addedFilesList.length,
      removedFilesCount: removedFilesList.length
    },
    newlyAddedSubjects,
    removedSubjects,
    recentAddedFiles: addedFilesList.slice(0, 100),
    subjectSummaries
  }

  // Ensure public/data directory exists
  const publicDataDir = path.dirname(publicSyncReportPath)
  if (!fs.existsSync(publicDataDir)) {
    fs.mkdirSync(publicDataDir, { recursive: true })
  }
  const srcDataDir = path.dirname(srcSyncReportPath)
  if (!fs.existsSync(srcDataDir)) {
    fs.mkdirSync(srcDataDir, { recursive: true })
  }

  fs.writeFileSync(srcSyncReportPath, JSON.stringify(syncReport, null, 2) + '\n', 'utf8')
  fs.writeFileSync(publicSyncReportPath, JSON.stringify(syncReport, null, 2) + '\n', 'utf8')

  // Output Full Information
  console.log('\n' + '='.repeat(70))
  console.log('📊 SYNCHRONIZATION SUMMARY')
  console.log('='.repeat(70))
  console.log(`📚 Total Subjects:       ${result.length} (${newlyAddedSubjects.length > 0 ? `+${newlyAddedSubjects.length} new` : 'up-to-date'})`)
  console.log(`📄 Total Course Files:   ${totalFiles.toLocaleString()} (${addedFilesList.length > 0 ? `+${addedFilesList.length} added` : 'up-to-date'})`)
  console.log(`💾 Updated Datasets:     src/courseData.json & public/courseData.json`)
  console.log(`📋 Generated Reports:    src/data/syncReport.json & public/data/syncReport.json`)

  if (newlyAddedSubjects.length > 0) {
    console.log('\n✨ Newly Added Subjects:')
    newlyAddedSubjects.forEach((s) => console.log(`   + ${s}`))
  }

  if (removedSubjects.length > 0) {
    console.log('\n🗑️  Removed/Consolidated Subjects:')
    removedSubjects.forEach((s) => console.log(`   - ${s}`))
  }

  // Highlight subjects with changed file counts
  const changedSubjects = subjectSummaries.filter((s) => s.diff !== 0)
  if (changedSubjects.length > 0) {
    console.log(`\n📦 Subject Updates Breakdown (${changedSubjects.length} subjects modified):`)
    changedSubjects.forEach((s) => {
      const sign = s.diff > 0 ? `+${s.diff}` : `${s.diff}`
      console.log(`   • ${s.subject.padEnd(25)} ${s.totalFiles} files total (${sign} files) [Years: ${s.years.join(', ')}]`)
    })
  }

  if (addedFilesList.length > 0) {
    console.log(`\n📑 Sample of Newly Added Files (showing first 15 of ${addedFilesList.length}):`)
    addedFilesList.slice(0, 15).forEach((f) => {
      console.log(`   + [${f.subject}] (${f.year}) ${f.name}`)
    })
  }

  console.log('\n' + '='.repeat(70))
  console.log('✅ Synchronization completed successfully!')
  console.log('='.repeat(70) + '\n')

  // Handle CLI automation flags (--push, --deploy, --all)
  const args = process.argv.slice(2)
  const shouldPush = args.includes('--push') || args.includes('--all')
  const shouldDeploy = args.includes('--deploy') || args.includes('--all')

  if (shouldPush) {
    console.log('🚀 Auto-committing and pushing course data to Git...')
    try {
      execSync('git add src/courseData.json public/courseData.json src/data/syncReport.json public/data/syncReport.json', { stdio: 'inherit', cwd: rootDir })
      execSync('git commit -m "chore(pyq): auto-sync courses from NalishJain/IIITD-PYQs"', { stdio: 'inherit', cwd: rootDir })
      execSync('git push', { stdio: 'inherit', cwd: rootDir })
      console.log('✅ Git push successful!')
    } catch (err) {
      console.warn('⚠️ Git push skipped or no changes to commit:', err.message)
    }
  }

  if (shouldDeploy) {
    console.log('🏗️ Building and deploying to Firebase Hosting...')
    try {
      execSync('npm run deploy', { stdio: 'inherit', cwd: rootDir })
      console.log('✅ Firebase deployment successful!')
    } catch (err) {
      console.error('❌ Firebase deployment failed:', err.message)
    }
  }
}

syncCourses().catch((err) => {
  console.error('\n❌ Course sync failed:', err.message)
  process.exit(1)
})
