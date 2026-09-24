import { 
  GraduationCap, Monitor, Zap, Sigma, Palette, Users, Dna, Bot, Cpu, TrendingUp 
} from 'lucide-react'
import { COURSE_ROWS } from './courseRows'

// Maps each subject code to its B.Tech branch/programme, full name, and course code
// Used for filtering by branch on the subjects page

export const SUBJECT_META = {
  // Computer Science & Engineering (CSE)
  DSA:   { full: 'Data Structures & Algorithms',       branch: 'CSE', code: 'CSE102' },
  ADA:   { full: 'Algorithm Design and Analysis',        branch: 'CSE', code: 'CSE222' },
  OS:    { full: 'Operating Systems',                  branch: 'CSE', code: 'CSE231' },
  CN:    { full: 'Computer Networks',                  branch: 'CSE', code: 'CSE232' },
  DBMS:  { full: 'Fundamentals of Database Management System',        branch: 'CSE', code: 'CSE202' },
  TOC:   { full: 'Theory of Computation',              branch: 'CSE', code: 'CSE322' },
  CO:    { full: 'Computer Organization',              branch: 'CSE', code: 'CSE112' },
  DC:    { full: 'Digital Circuits',              branch: 'CSE', code: 'ECE111' },
  CA:    { full: 'Computer Architecture',              branch: 'CSE' },
  DS:    { full: 'Discrete Structures',                branch: 'CSE', code: 'MTH210' },
  SC:    { full: 'Scientific Computing',                      branch: 'CSE' },
  TC:    { full: 'Topics in Cryptanalysis',              branch: 'CSE' },
  NS:    { full: 'Network Science',                   branch: 'CSE' },
  ISA:   { full: 'Introduction to Sociology and Anthropology',   branch: 'CSE' },
  SDOS:  { full: 'Software Development using Open Source',      branch: 'CSE' },
  MAD:   { full: 'Modern Algorithm Design',             branch: 'CSE' },
  HCI:   { full: 'Human Computer Interaction',         branch: 'CSD', code: 'DES204' },
  IP:    { full: 'Introduction to Programming',                   branch: 'CSE', code: 'CSE101' },
  IR:    { full: 'Information Retrieval',              branch: 'CSE' },
  IIS:   { full: 'Introduction to Intelligent Systems',    branch: 'CSAI', code: 'CSE140' },
  COO:   { full: 'Convex Optimization',                    branch: 'CSE', code: 'CSE577' },
  CTD:   { full: 'Circuit Theory and Devices',           branch: 'CSE', code: 'ECE215' },
  CTRSS: { full: 'Critical Thinking and Readings in Social Science', branch: 'CSE', code: 'SSH101' },
  GT:    { full: 'Graph Theory',                        branch: 'CSEC' },
  TDL:   { full: 'Theories of Deep Learning',            branch: 'CSAI' },
  DSCD:  { full: 'Distributed Systems: Concepts & Design',        branch: 'CSE' },
  EAI:   { full: 'Edge AI',                         branch: 'CSAI', code: 'SSH325' },
  UsS:   { full: 'Usable Security and Privacy',                    branch: 'CSE' },
  AC:    { full: 'Applied Cryptography',                           branch: 'CSE' },
  ST:    { full: 'Software Testing',                               branch: 'CSE' },

  // Artificial Intelligence & Machine Learning (CSAI)
  AI:    { full: 'Artificial Intelligence',            branch: 'CSAI', code: 'CSE643' },
  ML:    { full: 'Machine Learning',                   branch: 'CSAI', code: 'CSE343' },
  DL:    { full: 'Deep Learning',                      branch: 'CSAI' },
  NLP:   { full: 'Natural Language Processing',        branch: 'CSAI' },
  CV:    { full: 'Computer Vision',                    branch: 'CSAI' },
  RL:    { full: 'Reinforcement Learning',             branch: 'CSAI' },
  SML:   { full: 'Statistical Machine Learning',       branch: 'CSAI', code: 'CSE342' },
  MLBA:  { full: 'Machine Learning for Biomedical Applications',          branch: 'CSAI' },
  LLM:   { full: 'Large Language Models',              branch: 'CSAI' },
  DMMRS: { full: 'Decision Making for Multi-robot Systems', branch: 'CSAI' },
  'DMMRS 2025': { full: 'Deep Models & Multimodal Reasoning', branch: 'CSAI' },
  NAI:   { full: 'Networked AI',                       branch: 'CSAI' },

  // Applied Mathematics (CSAM)
  DM:    { full: 'Discrete Mathematics',               branch: 'CSAM', code: 'CSE121' },
  LA:    { full: 'Linear Algebra',                     branch: 'CSAM', code: 'MTH100' },
  M3:    { full: 'Mathematics III',                    branch: 'CSAM', code: 'MTH203' },
  M4:    { full: 'Mathematics IV',                     branch: 'CSAM', code: 'MTH204' },
  GMT:   { full: 'Game Theory',              branch: 'CSAM' },
  GMB:   { full: 'Genetics and Molecular Biology',            branch: 'CSB', code: 'BIO214' },
  MTL:   { full: 'Meta-Learning',    branch: 'CSAM' },
  NT:    { full: 'Number Theory',                      branch: 'CSAM' },
  GS:    { full: 'Game & Strategy',                    branch: 'CSAM' },
  SI:    { full: 'Statistical Inference',              branch: 'CSAM', code: 'MTH372' },
  QM:    { full: 'Quantum Mechanics',               branch: 'CSAM' },
  BDA:   { full: 'Big Data Analytics',                 branch: 'CSAM' },
  DSc:   { full: 'Data Science',                       branch: 'CSAM' },
  BioStats: { full: 'Biostatistics',                   branch: 'CSB' },
  PRMP:  { full: 'Parallel Runtimes for Modern Processors', branch: 'CSAM' },

  // Electronics & Communication (ECE / EVE)
  ABIN:  { full: 'Algorithms in Bioinformatics',          branch: 'ECE' },
  DVD:   { full: 'Digital VLSI Design',                        branch: 'EVE', code: 'ECE314' },
  DSP:   { full: 'Digital Signal Processing',          branch: 'ECE', code: 'ECE351' },
  EEE:   { full: 'Ecology, Evolution, and Environment',     branch: 'ECE' },
  ComN:  { full: 'Communication Networks',             branch: 'ECE' },
  S_S:   { full: 'Signals & Systems',                  branch: 'ECE', code: 'ECE250' },
  'S&S': { full: 'Signals and Systems',                  branch: 'ECE', code: 'ECE250' },
  CGAS:  { full: 'Computational Gastronomy',           branch: 'ECE' },
  PNS:   { full: 'Probability & Stochastic Processes', branch: 'ECE', code: 'MTH201' },
  WN:    { full: 'Wireless Networks',                  branch: 'ECE' },
  CMM:   { full: 'Cognition of Motor Movement',         branch: 'ECE' },
  SPA:   { full: 'Stochastic Processes and Applications',   branch: 'ECE', code: 'MTH371' },
  NEID:  { full: 'Neural Engineering and Implantable Devices',           branch: 'ECE' },

  // Biosciences (CSB)
  CBB:   { full: 'Cell Biology and Bio-Chemistry', branch: 'CSB', code: 'BIO211' },
  BioP:  { full: 'Biophysics',                         branch: 'CSB', code: 'BIO361' },
  MB:    { full: 'Mechanics of Bodies',                  branch: 'CSB' },
  FOB:   { full: 'Foundations of Biology',             branch: 'CSB', code: 'BIO101' },
  BDMH:  { full: 'Big Data Mining in Healthcare',  branch: 'CSB' },
  PB:    { full: 'Practical Bioinformatics',              branch: 'CSB', code: 'BIO221' },
  NSc:   { full: 'Neuroscience',                       branch: 'CSB' },
  IROB:  { full: 'Intelligent Robotics',               branch: 'CSE' },
  NDM:   { full: 'Neuroscience of Decision Making',          branch: 'CSB' },
  CADD:  { full: 'Computer Aided Drug Design',         branch: 'CSB' },
  BAOC:  { full: 'Biological Aspects of Cognition',    branch: 'CSB' },
  IIA:   { full: 'Information Integration and Applications', branch: 'CSB' },
  MC:    { full: 'Mobile Computing',              branch: 'CSB' },
  IQB:   { full: 'Introduction to Quantitative Biology', branch: 'CSB', code: 'BIO213' },
  'CeB(Cellular Biophysics)': { full: 'Cellular Biophysics', branch: 'CSB' },

  // Social Sciences (CSSS)
  COM:   { full: 'Communication Skills', branch: 'CSSS', code: 'COM101' },
  'Communication Skills': { full: 'Communication Skills', branch: 'CSSS', code: 'COM101' },
  EVS:   { full: 'Environmental Sciences',              branch: 'CSSS' },
  AP:    { full: 'Advanced Programming',                 branch: 'CSSS', code: 'CSE201' },
  ATP:   { full: 'Attention and Perception',      branch: 'CSSS' },
  AUC:   { full: 'Art, Urbanism & Culture',            branch: 'CSSS' },
  BE:    { full: 'Basic Electronics',                    branch: 'CSSS', code: 'ECE113' },
  CM:    { full: 'Computing for Medicine',                branch: 'CSSS' },
  DR:    { full: 'Design Research',                    branch: 'CSD' },
  EI:    { full: 'Ethics in AI',      branch: 'CSSS', code: 'SSH325' },
  FF:    { full: 'Foundations of Finance',                     branch: 'CSSS' },
  InT:   { full: 'Information Theory',        branch: 'CSSS' },

  // Design (CSD)
  VDF:   { full: 'VLSI Design Flow',         branch: 'CSD', code: 'ECE513' },
  VPM:   { full: 'Valuation and Portfolio Management',        branch: 'CSD' },
  ADDV:  { full: 'Advanced Digital Design and Verification',        branch: 'CSD' },
  CG:    { full: 'Computer Graphics',                  branch: 'CSD' },

  // Economics (CSEC)
  // Game theory and Econometrics map to CSEC
}

// Canonical IIITD B.Tech branches list
export const BRANCHES = [
  { id: 'all',  label: 'All Branches',  color: '#6366f1', icon: <GraduationCap size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'CSE',  label: 'CSE',           color: '#3b82f6', icon: <Monitor size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'ECE',  label: 'ECE',           color: '#10b981', icon: <Zap size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'CSAM', label: 'CSAM',          color: '#f59e0b', icon: <Sigma size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'CSD',  label: 'CSD',           color: '#ec4899', icon: <Palette size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'CSSS', label: 'CSSS',          color: '#8b5cf6', icon: <Users size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'CSB',  label: 'CSB',           color: '#ef4444', icon: <Dna size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'CSAI', label: 'CSAI',          color: '#6366f1', icon: <Bot size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'EVE',  label: 'EVE',           color: '#06b6d4', icon: <Cpu size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
  { id: 'CSEC', label: 'CSEC',          color: '#f97316', icon: <TrendingUp size={16} strokeWidth={2.5} style={{ verticalAlign: 'text-bottom' }} /> },
]

export function getBranch(subject) {
  return SUBJECT_META[subject]?.branch || 'CSE'
}

export function getFullName(subject) {
  return SUBJECT_META[subject]?.full || subject
}

export function getSubjectCode(subject) {
  return SUBJECT_META[subject]?.code || null
}

export function getSubjectCurriculumMeta(subjectAbbr) {
  const matches = COURSE_ROWS.filter(r => r.course_code_hint?.toUpperCase() === subjectAbbr.toUpperCase())
  
  if (matches.length > 0) {
    const branches = [...new Set(matches.map(m => m.branch_code))]
    const semesters = matches.reduce((acc, curr) => {
      acc[curr.branch_code] = curr.semester
      return acc
    }, {})
    
    return {
      branches: branches.map(b => BRANCHES.find(br => br.id === b)).filter(Boolean),
      semesters
    }
  }

  // Fallback to primary tag if not found in curriculum
  const primaryBranch = getBranch(subjectAbbr)
  return {
    branches: [BRANCHES.find(b => b.id === primaryBranch) || BRANCHES[1]],
    semesters: {}
  }
}
