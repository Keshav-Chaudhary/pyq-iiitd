import React from 'react'
import { AXIS_POLICY } from '../data/programData'
import { 
  Laptop, 
  GraduationCap, 
  Leaf, 
  Target, 
  Sun, 
  Briefcase, 
  Rocket, 
  Compass, 
  Trophy, 
  FileText, 
  AlertTriangle,
  ArrowRightLeft,
  TrendingUp,
  Handshake,
  Calculator,
  Search,
  Coins,
  Ban
} from 'lucide-react'
import '../styles/Resources.css'

const QUICK_LINKS = [
  {
    name: 'ERP Portal',
    url: 'https://iiitd.nurecampus.com/',
    icon: <Laptop size={36} strokeWidth={1.5} />,
    desc: 'Crucial for Result declarations, fee payment, and academic records.',
    noVpn: true
  },
  {
    name: 'AXIS Portal (New)',
    url: 'https://axis.iiitd.edu.in',
    icon: <GraduationCap size={36} strokeWidth={1.5} />,
    desc: 'Check graduation requirements & timetable.',
    vpnRequired: true
  },
  {
    name: 'SG/CW Portal',
    url: 'http://sgcw.iiitd.edu.in/',
    icon: <Leaf size={36} strokeWidth={1.5} />,
    desc: 'Registration for Self Growth or Community Work.',
    vpnRequired: true
  }
]

const REGULATIONS = [
  { name: 'Full UG Regulations', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2025/2025-October-UG%20Regulations.pdf', branch: 'ALL' },
  { name: 'CSE', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2024/2024-May-BTech(CSE)-Regulations.pdf', branch: 'CSE' },
  { name: 'ECE', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2024/2024-May-BTech(ECE)-Regulations.pdf', branch: 'ECE' },
  { name: 'CSAM', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2024/2024-May-BTech(CSAM)-Regulations.pdf', branch: 'CSAM' },
  { name: 'CSAI', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2025/2025-October-BTech(CSAI)-Regulations.pdf', branch: 'CSAI' },
  { name: 'CSD', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2024/2024-May-BTech(CSD)-Regulations.pdf', branch: 'CSD' },
  { name: 'CSSS', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2024/2024-May-BTech(CSSS)-Regulations.pdf', branch: 'CSSS' },
  { name: 'CSB', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2024/2024-August-BTech(CSB)-Regulations.pdf', branch: 'CSB' },
  { name: 'EVE', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2025/2025-October-BTech(EVE)-Regulations.pdf', branch: 'EVE' },
  { name: 'CSECON', url: 'https://iiitd.ac.in/sites/default/files/docs/education/2025/2025-Jan-BTech(CSECON)-Regulations_64th%20Senate.pdf', branch: 'CSECON' },
]

const TIMELINE_EVENTS = [
  {
    semester: 'Semester 1',
    title: 'Entering B.Tech & Branch Transfer (7.6)',
    icon: <Target size={24} strokeWidth={2} />,
    color: '#3b82f6',
    content: (
      <>
        <p>Welcome to IIITD! Your first semester sets the academic baseline. Continuous evaluation through quizzes, labs, assignments, mid-semester, and end-semester exams starts immediately.</p>
        <ul className="timeline-list">
          <li><strong>Credit Cap:</strong> Normal registration limit is capped at <strong>20 credits</strong> (typically 5 courses).</li>
          <li><strong>Campus Life:</strong> Dive into student life by joining various technical (e.g. Foobar, Zen, Byld) and cultural clubs.</li>
        </ul>
        <div className="info-box">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><ArrowRightLeft size={18} /> Branch Transfer Rules (Regulation 7.6)</h4>
          <p>Transfer of B.Tech students from one program to another is possible <strong>only</strong> after the grades of the first semester are out. This is the <strong>only</strong> time branch transfer will occur.</p>
          <ul className="timeline-list" style={{ marginTop: '10px' }}>
            <li><strong>Explicit Request:</strong> Submit a request with program preferences within <strong>1 week</strong> of the first-semester result announcement.</li>
            <li><strong>AICTE Admission:</strong> Students admitted through AICTE must produce a No Objection Certificate (NOC) from AICTE.</li>
            <li><strong>Eligibility:</strong> Students must satisfy the admission eligibility criteria for the target branch at the time of admission, and must have passed all 1st-semester credits.</li>
            <li><strong>CSE / CSAI / CSAM / CSD / CSSS / CSB Requirements:</strong> Must receive a <strong>B or better grade</strong> in both <em>Introduction to Programming (IP)</em> and <em>Mathematics-I</em>.</li>
            <li><strong>ECE / EVE Requirements:</strong> Must receive a <strong>B or better grade</strong> in both <em>Digital Circuits</em> and <em>Mathematics-I</em>.</li>
          </ul>
          
          <h5 style={{ color: 'var(--text)', marginTop: '14px', marginBottom: '6px', fontWeight: '800', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><TrendingUp size={16} /> Priority & Capacity Constraints</h5>
          <ul className="timeline-list">
            <li><strong>Priority List:</strong> Ordered strictly based on <strong>CGPA</strong>. Repeaters repeating the first year are also eligible under the same rules.</li>
            <li><strong>Capacity Limits:</strong> The base strength of a program is the number of enrolled students as of Dec 15 (after Sem 1), excluding repeaters. The final strength of any program must not reduce or increase by more than <strong>10%</strong> of its base strength.</li>
          </ul>

          <h5 style={{ color: 'var(--text)', marginTop: '14px', marginBottom: '6px', fontWeight: '800', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}><Handshake size={16} /> Tie-Breaking Rules</h5>
          <ul className="timeline-list">
            <li><strong>Rule I (CS-related programs):</strong> In case of a CGPA tie, higher grade in the order: <em>IP → Maths-I → Introduction to HCI → Digital Circuits → Communication Skills</em>.</li>
            <li><strong>Rule II:</strong> Higher JEE Rank.</li>
          </ul>
        </div>
      </>
    )
  },
  {
    semester: 'Semester 2 & Summer Term 1',
    title: 'Unified Foundation & SG/CW Requirements',
    icon: <Sun size={24} strokeWidth={2} />,
    color: '#10b981',
    content: (
      <>
        <p>Semester 2 maintains a unified curriculum where the majority of courses are common across all branches. The normal registration limit remains <strong>20 credits</strong>.</p>
        
        <div className="info-box">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Sun size={18} /> Summer Term 1 (Optional but Strategic)</h4>
          <p>Runs from the last week of May to the last week of July. It progresses at double speed, completing courses in half the usual duration. There is <strong>no late registration</strong> allowed.</p>
          <ul className="timeline-list" style={{ marginTop: '10px' }}>
            <li><strong>Credit Limits:</strong> First-year students can register for a maximum of <strong>6 credits</strong> (including SG/CW). You are <strong>not</strong> eligible for IP/IS/UR/BTP.</li>
            <li><strong>SG/CW Graduation Rule:</strong> Completing <strong>2 credits of Self-Growth (SG)</strong> and <strong>2 credits of Community Work (CW)</strong> is mandatory for graduation. Because these are Pass/Fail, summer is the ideal time to clear them.</li>
            <li><strong>Online Course (OC) Bucket Warning:</strong> You are allowed a strict maximum of <strong>8 credits of Online Courses (OC)</strong> (including TA duty credits) toward your entire degree. <strong>Do not exhaust this early!</strong> In your final semester (Sem 8), a 6-month off-campus internship requires a 4-credit underload, which can only be met by IP/IS/UR/BTP or OC credits. If you have none left, graduation complications arise.</li>
            <li><strong>Grade Improvement:</strong> If you received a 'D' or 'F' in core courses, you can take refresher modules (if offered by the department) to potentially improve your grade by half a letter (e.g., F to D, or D to C-).</li>
          </ul>
        </div>
      </>
    )
  },
  {
    semester: 'Semesters 3 & 4',
    title: 'Branch Core Introduction & Regulations',
    icon: <Briefcase size={24} strokeWidth={2} />,
    color: '#f59e0b',
    content: (
      <>
        <p>Your branch-specific core courses are introduced here. This is the crucial time to establish and build your CGPA. The credit limit remains capped at <strong>20 credits</strong> (5 regular courses) per semester.</p>
        <ul className="timeline-list">
          <li><strong>Semester 3:</strong> Deep dive into core subjects of your chosen branch (CSE, ECE, CSAM, CSAI, CSD, CSSS, CSB, EVE).</li>
          <li><strong>Semester 4:</strong> Advanced core topics and special electives. Be mindful of branch-specific regulations and requirements. Refer to the <a href="https://iiitd.ac.in/academics/resources" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>IIITD Academic Resources</a> page.</li>
        </ul>
        <div className="info-box">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Calculator size={18} /> How is CGPA Calculated?</h4>
          <p>CGPA is the weighted average of your grades. Formula: <code>∑ (Credits × Grade Points) / ∑ Credits</code> on a 10-point scale (A=10, B=8, C=6, etc.).</p>
        </div>
        <div className="info-box error-box">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><AlertTriangle size={18} /> Backlog & Course Repeat Rules</h4>
          <p>If you fail a course (F grade), you must repeat it if it is a core mandatory course. Clear all prerequisites on time to ensure you do not face registration blocks or graduation delays.</p>
        </div>
      </>
    )
  },
  {
    semester: 'Summer Term 2 (After Sem 4)',
    title: 'Project Registration & Internship Kickoff',
    icon: <Rocket size={24} strokeWidth={2} />,
    color: '#ef4444',
    content: (
      <>
        <p>After your second year, you are allowed a maximum of <strong>6 credits</strong> during the summer. You are now eligible to register for up to 4 credits of Independent Project (IP), Independent Study (IS), Undergraduate Research (UR), or B.Tech Project (BTP).</p>
        <ul className="timeline-list">
          <li><strong>Typical Strategy:</strong> Students generally choose a 2-credit course and 4 credits of IP/IS/UR/BTP under a faculty advisor.</li>
          <li><strong>Clearing Pending Credits:</strong> Finish any remaining SG/CW credits if you haven't already.</li>
        </ul>

        <div className="info-box">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Briefcase size={18} /> Campus Placements & Internships Kickoff</h4>
          <p>Registration for placements and internships happens <strong>only once</strong> in an academic year (via Google Form in <strong>January</strong>). Internship interviews start in <strong>mid-July</strong> and run through mid-August.</p>
          <ul className="timeline-list" style={{ marginTop: '10px' }}>
            <li><strong>Eligibility:</strong> Minimum CGPA criteria of <strong>CGPA ≥ 6.0</strong> is required to participate.</li>
            <li><strong>50% Participation Clause:</strong> Registered students must participate in at least <strong>50% of the companies</strong> for which they are eligible in the 1st Phase (July-August). Non-participation/under-participation leads to removal from the complete cycle.</li>
            <li><strong>Absenteeism Penalty:</strong> Missing the first step (e.g. PPT/Test) after registering for a company:
              <br />• <em>1st time:</em> Debarred from next 5 A+ companies.
              <br />• <em>2nd time:</em> Debarred from next 10 A+ companies.
              <br />• <em>3rd time:</em> Debarred from on-campus placements for the complete year.
            </li>
            <li><strong>No Quitting:</strong> Once you enter a selection process (or apply, if step 1 is a test/shortlist), quitting in between leads to immediate deregistration from the entire placement season.</li>
          </ul>
        </div>
      </>
    )
  },
  {
    semester: 'Semesters 5 & 6 + Summer Term 3',
    title: 'Pre-Final Year & 6-Month Internship Audit',
    icon: <Compass size={24} strokeWidth={2} />,
    color: '#8b5cf6',
    content: (
      <>
        <p>In the pre-final year, your registration limit increases to a normal cap of <strong>22 credits</strong> (approx. 5-6 courses). Selected students complete their summer internships in Summer Term 3.</p>

        <div className="info-box">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Search size={18} /> 6-Month Internship Eligibility (Crucial Audit)</h4>
          <p>If you are planning to take a 6-month long-term internship during your 8th semester, you must audit your transcript and meet the following criteria by the end of Summer Term 3:</p>
          <ul className="timeline-list" style={{ marginTop: '10px' }}>
            <li><strong>Credit Requirement:</strong> Completed at least <strong>126 credits</strong> (credits registered in Summer Term 3 are counted).</li>
            <li><strong>Core & SG/CW:</strong> Cleared all core courses and completed all 4 credits of Self-Growth and Community Work.</li>
            <li><strong>Remaining Credits:</strong> Have a maximum of 4 credits of IP/IS/UR/Online courses/BTP remaining for graduation.</li>
          </ul>
          <p style={{ marginTop: '10px', fontSize: '0.9em', color: 'var(--text-muted)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
            <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
            <span><em>Reminder:</em> Keep the <strong>8-credit Online Course (OC)</strong> limit in mind. If you go for a 6-month internship, you must take a 4-credit underload in Sem 8. This underload can only be cleared via IP/IS/UR/BTP or OC credits.</span>
          </p>
        </div>
      </>
    )
  },
  {
    semester: 'Semesters 7 & 8',
    title: 'Final Year, Placements & 6-Month Internships',
    icon: <Trophy size={24} strokeWidth={2} />,
    color: '#ec4899',
    content: (
      <>
        <p>The final stretch! The academic load is capped at <strong>22 credits</strong>. Students who qualified go for their 6-month internships in Semester 8, while others finish their BTP, electives, and secure full-time job offers.</p>

        <div className="info-box">
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Coins size={18} /> Placement Rules & Offer Categories</h4>
          <p>Companies visiting IIITD are classified based on CTC:</p>
          <ul className="timeline-list" style={{ marginTop: '10px' }}>
            <li><strong>A+ Category (CTC ≥ 13 LPA):</strong> Securing an A+ offer deems it accepted, and you are out of the campus placement process.</li>
            <li><strong>A Category (CTC 7 LPA to &lt; 13 LPA):</strong> Placed students can upgrade to A+. The previous offer is cancelled upon upgrading.</li>
            <li><strong>B Category / Mass Recruiter (CTC &lt; 7 LPA):</strong> Opens depending on student performance in Phase 1. Unplaced students must secure a B offer to remain eligible for A & A+. Placed B students remain eligible for A & A+.</li>
            <li><strong>Double Category (2x Upgrade):</strong> You can participate in a company offering at least <strong>double (2x)</strong> your current compensation, even if you already hold an A+ offer. Subject to placement office approval (applicable to in & off campus).</li>
          </ul>
        </div>

        <div className="info-box error-box" style={{ marginTop: '16px' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Ban size={18} /> Off-Campus & Declining Policies</h4>
          <ul className="timeline-list">
            <li><strong>Off-Campus Approval:</strong> You <strong>must</strong> get prior written approval from the Placement Office before applying to off-campus companies (limit: 3 companies at a time for internships).</li>
            <li><strong>Unapproved Applications:</strong> Applying off-campus without approval leads to immediate deregistration from placements and your "No Dues" clearance being held.</li>
            <li><strong>Declining Offers:</strong> You can decline a campus placement/PPO offer <strong>only</strong> if you are pursuing higher studies. You must submit your official admit/offer letter to the Placement Office by March 31, otherwise your "No Dues" clearance will be withheld.</li>
          </ul>
        </div>
      </>
    )
  }
]

export default function Resources() {
  return (
    <div className="resource-page">
      {/* Header */}
      <div className="res-header">
        <div className="res-header-glow"></div>
        <div className="container">
          <h1 className="res-title">
            <span className="res-title-gradient">Resources & Journey</span>
          </h1>
          <p className="res-sub">Essential IIITD portals and a complete roadmap of your B.Tech journey.</p>
        </div>
      </div>

      <div className="container res-body">
        
        {/* Quick Links Grid */}
        <section className="res-section animate-fadeup" style={{ animationDelay: '0.1s' }}>
          <h2 className="section-title">Most Searched IIITD <span className="section-title-gradient">Portals</span></h2>
          <div className="links-grid">
            {QUICK_LINKS.map((link) => (
              <a key={link.name} href={link.url} target="_blank" rel="noreferrer" className="link-card">
                <div className="link-icon">{link.icon}</div>
                <div className="link-info">
                  <div className="link-name-row">
                    <h3 className="link-name">{link.name}</h3>
                    {link.vpnRequired && <span className="vpn-badge">VPN Required</span>}
                    {link.noVpn && <span className="no-vpn-badge">No VPN needed</span>}
                  </div>
                  <p className="link-desc">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Regulations Section */}
        <section className="res-section animate-fadeup" style={{ animationDelay: '0.2s' }}>
          <h2 className="section-title">B.Tech Academic <span className="section-title-gradient">Regulations</span></h2>
          <p className="section-desc">Official curriculum guidelines and graduation requirements per branch (Updated May 2026).</p>
          <div className="regulations-grid">
            {REGULATIONS.map((reg) => (
              <a key={reg.branch} href={reg.url} target="_blank" rel="noreferrer" className="reg-card">
                <span className="reg-icon"><FileText size={20} strokeWidth={1.5} /></span>
                <span className="reg-name">{reg.name}</span>
                <span className="reg-arrow">→</span>
              </a>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="res-section animate-fadeup" style={{ animationDelay: '0.3s' }}>
          <h2 className="section-title">The B.Tech <span className="section-title-gradient">Journey</span></h2>
          <p className="section-desc">From your first day on campus to securing your dream job. Here's what to expect in every phase of your 4-year degree.</p>
          
          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {TIMELINE_EVENTS.map((event, idx) => (
              <div key={idx} className="timeline-node">
                <div className="timeline-marker" style={{ borderColor: event.color, color: event.color, boxShadow: `0 0 15px ${event.color}40` }}>
                  {event.icon}
                </div>
                <div className="timeline-content">
                  <div className="timeline-semester" style={{ color: event.color }}>{event.semester}</div>
                  <h3 className="timeline-card-title">{event.title}</h3>
                  <div className="timeline-text">
                    {event.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclaimer Section */}
        <section className="res-disclaimer animate-fadeup" style={{ animationDelay: '0.4s' }}>
          <div className="disclaimer-content">
            <span className="disclaimer-icon"><AlertTriangle size={24} strokeWidth={2} /></span>
            <div className="disclaimer-text">
              <h4>Official Sources & Disclaimer</h4>
              <p>
                The regulations, credit limits, and placement policies displayed on this page are derived from official IIITD academic regulations and the Placement Policy 2026-27. While the developer has compiled this information to the best of their knowledge to provide an accurate roadmap, policies are subject to change. Please re-verify specific rules directly via the <a href="https://iiitd.ac.in/academics/resources" target="_blank" rel="noreferrer">IIITD Academic Resources</a> and the official T&P portal.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}
