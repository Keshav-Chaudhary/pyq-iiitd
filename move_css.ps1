$srcDir = "D:\Side_Projects\Copy\Rag2.0\CodingHere\pyq-website\src"
$stylesDir = Join-Path $srcDir "styles"
if (-not (Test-Path $stylesDir)) { New-Item -ItemType Directory -Path $stylesDir }

$cssFiles = Get-ChildItem -Path $srcDir -Filter *.css -Recurse | Where-Object { $_.DirectoryName -ne $stylesDir }

foreach ($file in $cssFiles) {
    Write-Host "Moving $($file.Name)"
    Move-Item -Path $file.FullName -Destination $stylesDir -Force
}

$jsFiles = Get-ChildItem -Path $srcDir -Include *.jsx,*.js,*.ts,*.tsx -Recurse
foreach ($file in $jsFiles) {
    $content = Get-Content -Path $file.FullName -Raw
    if (-not $content) { continue }
    
    $relPath = $file.DirectoryName.Substring($srcDir.Length)
    $depth = 0
    if ($relPath.Length -gt 0) {
        $depth = ($relPath.TrimStart('\') -split '\\').Count
    }
    
    $prefix = ""
    if ($depth -eq 0) {
        $prefix = "./styles/"
    } elseif ($depth -eq 1) {
        $prefix = "../styles/"
    } elseif ($depth -eq 2) {
        $prefix = "../../styles/"
    }
    
    # Replace imports
    $newContent = [regex]::Replace($content, 'import\s+[''"](?:[\.\/\w-]+/)*([\w-]+\.css)[''"]', "import '$prefix`$1'")
    
    if ($content -ne $newContent) {
        Write-Host "Updating imports in $($file.Name)"
        Set-Content -Path $file.FullName -Value $newContent -NoNewline
    }
}
Write-Host "Done!"
