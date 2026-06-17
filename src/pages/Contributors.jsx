import { useState, useEffect } from 'react'
import { GitCommit, Trophy, ChevronDown, ChevronUp, Crown, AlertTriangle, UserX, Star, GitFork, CircleDot, UserPlus, ChevronRight } from 'lucide-react'
import '../styles/Contributors.css'

const Podium = ({ top3 }) => {
  const slots = [
    { c: top3[1], rank: 2 },
    { c: top3[0], rank: 1 },
    { c: top3[2], rank: 3 },
  ];
  
  return (
    <div className="podium-container animate-fadeup">
      {slots.map(({ c, rank }) => c && (
        <a key={c.id} href={c.html_url} target="_blank" rel="noreferrer" className={`podium-slot rank-${rank}-slot`}>
          {rank === 1 && <div className="podium-crown"><Crown size={32} color="#fbbf24" strokeWidth={2.5} /></div>}
          <div className={`podium-avatar-wrapper rank-${rank}-avatar`}>
            <img src={c.avatar_url} alt={c.login} loading="lazy" />
            <div className="podium-rank-badge">{rank}</div>
          </div>
          <div className="podium-name">{c.login}</div>
          <div className={`podium-score score-${rank}`}>{c.contributions}</div>
          <div className="podium-username">@{c.login}</div>
        </a>
      ))}
    </div>
  );
};

const LeaderboardListItem = ({ contributor, rank }) => (
  <a href={contributor.html_url} target="_blank" rel="noreferrer" className="lb-list-item animate-fadeup">
    <div className="lb-list-left">
      <img src={contributor.avatar_url} alt={contributor.login} className="lb-avatar" loading="lazy" />
      <div className="lb-info">
        <div className="lb-name">{contributor.login}</div>
        <div className="lb-username">@{contributor.login}</div>
      </div>
    </div>
    <div className="lb-score">{contributor.contributions}</div>
  </a>
);

const ContributorCard = ({ contributor, rank }) => {
  let rankBadge = null;
  if (rank === 1) {
    rankBadge = <div className="ucc-rank-badge rank-1" title="Legend"><Trophy size={14} strokeWidth={2.5} /></div>;
  } else if (rank === 2) {
    rankBadge = <div className="ucc-rank-badge rank-2" title="Master"><Trophy size={14} strokeWidth={2.5} /></div>;
  } else if (rank === 3) {
    rankBadge = <div className="ucc-rank-badge rank-3" title="Expert"><Trophy size={14} strokeWidth={2.5} /></div>;
  }

  return (
    <a 
      href={contributor.html_url} 
      target="_blank" 
      rel="noreferrer" 
      className={`unique-contributor-card animate-fadeup ${rank ? `rank-${rank}-glow` : ''}`}
    >
      <div className="ucc-avatar-wrapper">
        <img src={contributor.avatar_url} alt={contributor.login} className="ucc-avatar" loading="lazy" />
        {rankBadge}
      </div>
      
      <div className="ucc-name">@{contributor.login}</div>
      
      {contributor.contributions !== undefined && (
        <div className="ucc-commits">
          <GitCommit size={12} strokeWidth={3} />
          {contributor.contributions} {contributor.contributions === 1 ? 'commit' : 'commits'}
        </div>
      )}
    </a>
  )
}

const SkeletonGrid = () => (
  <div className="contributors-grid animate-fadeup">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="skeleton-card">
        <div className="skeleton-avatar-float"></div>
        <div className="skeleton-name"></div>
        <div className="skeleton-badge"></div>
      </div>
    ))}
  </div>
)

const ErrorGrid = () => (
  <div className="contributors-grid animate-fadeup">
    {[1, 2, 3, 4].map(i => (
      <div key={i} className="skeleton-card" style={{ borderColor: 'rgba(239, 68, 68, 0.4)', borderStyle: 'dashed', background: 'linear-gradient(rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05)), var(--card)' }}>
        <div className="skeleton-avatar-float" style={{ animation: 'none', background: 'linear-gradient(rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.15)), var(--bg)', borderColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <UserX size={28} color="rgba(239, 68, 68, 0.8)" />
        </div>
        <div className="skeleton-name" style={{ background: 'rgba(239, 68, 68, 0.25)', width: '50%' }}></div>
        <div className="skeleton-badge" style={{ background: 'rgba(239, 68, 68, 0.25)' }}></div>
      </div>
    ))}
  </div>
)

const ErrorLeaderboard = () => (
  <div className="leaderboard-wrapper" style={{ pointerEvents: 'none' }}>
    <div className="podium-container">
      <div className="podium-slot rank-2-slot" style={{ 
        borderColor: 'rgba(239, 68, 68, 0.4)', 
        borderStyle: 'dashed', 
        borderBottom: 'none',
        background: 'linear-gradient(rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05)), var(--card)' 
      }}>
        <div className="podium-avatar-wrapper rank-2-avatar">
          <div className="error-podium-avatar">
            <UserX size={32} color="rgba(239, 68, 68, 0.8)" />
          </div>
          <div className="podium-rank-badge" style={{ 
            background: 'linear-gradient(rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.15)), var(--bg)', 
            color: 'rgba(239, 68, 68, 0.8)', 
            borderColor: 'rgba(239, 68, 68, 0.4)' 
          }}>2</div>
        </div>
        <div className="skeleton-name" style={{ width: '70%', height: '14px', background: 'rgba(239, 68, 68, 0.25)', margin: '8px auto' }}></div>
        <div className="skeleton-name" style={{ width: '40%', height: '24px', background: 'rgba(239, 68, 68, 0.25)', margin: '8px auto' }}></div>
      </div>
      <div className="podium-slot rank-1-slot" style={{ 
        borderColor: 'rgba(239, 68, 68, 0.4)', 
        borderStyle: 'dashed', 
        borderBottom: 'none',
        background: 'linear-gradient(rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05)), var(--card-2)' 
      }}>
        <div className="podium-avatar-wrapper rank-1-avatar">
          <div className="error-podium-avatar">
            <AlertTriangle size={40} color="rgba(239, 68, 68, 0.8)" />
          </div>
          <div className="podium-rank-badge" style={{ 
            background: 'linear-gradient(rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.15)), var(--bg)', 
            color: 'rgba(239, 68, 68, 0.8)', 
            borderColor: 'rgba(239, 68, 68, 0.4)' 
          }}>1</div>
        </div>
        <div className="skeleton-name" style={{ width: '75%', height: '16px', background: 'rgba(239, 68, 68, 0.25)', margin: '12px auto 8px' }}></div>
        <div className="skeleton-name" style={{ width: '45%', height: '32px', background: 'rgba(239, 68, 68, 0.25)', margin: '8px auto' }}></div>
      </div>
      <div className="podium-slot rank-3-slot" style={{ 
        borderColor: 'rgba(239, 68, 68, 0.4)', 
        borderStyle: 'dashed', 
        borderBottom: 'none',
        background: 'linear-gradient(rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05)), var(--card)' 
      }}>
        <div className="podium-avatar-wrapper rank-3-avatar">
          <div className="error-podium-avatar">
            <UserX size={32} color="rgba(239, 68, 68, 0.8)" />
          </div>
          <div className="podium-rank-badge" style={{ 
            background: 'linear-gradient(rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.15)), var(--bg)', 
            color: 'rgba(239, 68, 68, 0.8)', 
            borderColor: 'rgba(239, 68, 68, 0.4)' 
          }}>3</div>
        </div>
        <div className="skeleton-name" style={{ width: '70%', height: '14px', background: 'rgba(239, 68, 68, 0.25)', margin: '8px auto' }}></div>
        <div className="skeleton-name" style={{ width: '40%', height: '24px', background: 'rgba(239, 68, 68, 0.25)', margin: '8px auto' }}></div>
      </div>
    </div>
    <div className="lb-list-container" style={{ 
      borderColor: 'rgba(239, 68, 68, 0.4)', 
      borderStyle: 'dashed',
      background: 'linear-gradient(rgba(239, 68, 68, 0.02), rgba(239, 68, 68, 0.02)), var(--card)' 
    }}>
      {[1, 2, 3].map(i => (
        <div key={i} className="lb-list-item" style={{ borderBottomColor: 'rgba(239, 68, 68, 0.2)', pointerEvents: 'none' }}>
          <div className="lb-list-left">
            <div className="lb-avatar" style={{ 
              background: 'linear-gradient(rgba(239, 68, 68, 0.15), rgba(239, 68, 68, 0.15)), var(--bg)', 
              border: '2px solid var(--bg)' 
            }}></div>
            <div className="lb-info">
              <div className="skeleton-name" style={{ width: '120px', height: '16px', background: 'rgba(239, 68, 68, 0.25)', margin: 0 }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

// Ghost slot components for invitations
const EmptyGridCard = () => (
  <a href="https://github.com/Keshav-Chaudhary/pyq-iiitd" target="_blank" rel="noreferrer" className="unique-contributor-card ghost-card">
    <div className="ucc-avatar-wrapper ghost-avatar">
      <UserPlus size={28} color="var(--text-muted)" />
    </div>
    <div className="ucc-name" style={{ color: 'var(--text-muted)' }}>You?</div>
    <div className="ghost-desc">Join the dev team</div>
  </a>
)

const EmptyListRow = () => (
  <a href="https://github.com/NalishJain/IIITD-PYQs/blob/main/README.md" target="_blank" rel="noreferrer" className="lb-list-item ghost-row">
    <div className="lb-list-left">
      <div className="lb-avatar ghost-list-avatar">
        <UserPlus size={20} color="var(--text-muted)" />
      </div>
      <div className="lb-info">
        <div className="lb-name" style={{ color: 'var(--text-muted)' }}>Your Name Here</div>
        <div className="lb-username" style={{ marginTop: '2px' }}>Contribute a paper to the repo</div>
      </div>
    </div>
    <div className="ghost-arrow">
      <ChevronRight size={20} />
    </div>
  </a>
)

const SkeletonLeaderboard = () => (
  <div className="leaderboard-wrapper animate-fadeup" style={{ pointerEvents: 'none' }}>
    <div className="podium-container">
      {[2, 1, 3].map(rank => (
        <div key={rank} className={`podium-slot rank-${rank}-slot`}>
          <div className={`podium-avatar-wrapper rank-${rank}-avatar`}>
            <div className="skeleton-podium-avatar skeleton-name"></div>
            <div className="podium-rank-badge" style={{ background: 'var(--border)', borderColor: 'var(--border)', color: 'transparent' }}>{rank}</div>
          </div>
          <div className="skeleton-name" style={{ width: rank === 1 ? '75%' : '70%', height: rank === 1 ? '16px' : '14px', margin: rank === 1 ? '12px auto 8px' : '8px auto' }}></div>
          <div className="skeleton-name" style={{ width: rank === 1 ? '45%' : '40%', height: rank === 1 ? '32px' : '24px', margin: '8px auto' }}></div>
        </div>
      ))}
    </div>
    <div className="lb-list-container">
      {[1, 2, 3].map(i => (
        <div key={i} className="lb-list-item" style={{ pointerEvents: 'none' }}>
          <div className="lb-list-left">
            <div className="skeleton-avatar-float" style={{ position: 'relative', top: 0, width: '44px', height: '44px', border: 'none' }}></div>
            <div className="lb-info" style={{ gap: '6px' }}>
              <div className="skeleton-name" style={{ width: '120px', margin: 0 }}></div>
              <div className="skeleton-name" style={{ width: '80px', height: '12px', margin: 0 }}></div>
            </div>
          </div>
          <div className="skeleton-badge" style={{ width: '40px' }}></div>
        </div>
      ))}
    </div>
  </div>
)

export default function Contributors() {
  const [sourceContributors, setSourceContributors] = useState([])
  const [websiteContributors, setWebsiteContributors] = useState([])
  const [loadingSource, setLoadingSource] = useState(true)
  const [loadingWebsite, setLoadingWebsite] = useState(true)
  const [showAllSource, setShowAllSource] = useState(false)
  const [showAllWebsite, setShowAllWebsite] = useState(false)
  const [apiError, setApiError] = useState(null)
  const [repoStats, setRepoStats] = useState(null)

  useEffect(() => {
    const fetchRepoStats = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/NalishJain/IIITD-PYQs')
        if (res.status === 403) throw new Error('Rate limit exceeded');
        if (!res.ok) throw new Error('Failed to fetch stats')
        const data = await res.json()
        setRepoStats({
          stars: data.stargazers_count,
          forks: data.forks_count,
          issues: data.open_issues_count
        })
      } catch (err) {
        console.error("Error fetching repo stats", err)
      }
    }

    const fetchSourceContributors = async () => {
      try {
        const res = await fetch('https://api.github.com/repos/NalishJain/IIITD-PYQs/contributors')
        if (res.status === 403) {
          setApiError("API limit reached for your IP, please try again later.");
          throw new Error('Rate limit exceeded');
        }
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setSourceContributors(data)
      } catch (err) {
        console.error("Error fetching source contributors", err)
      } finally {
        setLoadingSource(false)
      }
    }

    const fetchWebsiteContributors = async () => {
      try {
        let res = await fetch('https://api.github.com/repos/Keshav-Chaudhary/pyq-iiitd/contributors')
        
        if (res.status === 403) {
          setApiError("API limit reached for your IP, please try again later.");
          throw new Error('Rate limit exceeded');
        }

        if (!res.ok) {
          res = await fetch('https://api.github.com/users/Keshav-Chaudhary')
          if (res.status === 403) {
            setApiError("API limit reached for your IP, please try again later.");
            throw new Error('Rate limit exceeded');
          }
          if (!res.ok) throw new Error('Failed to fetch user')
          const data = await res.json()
          setWebsiteContributors([{
            id: data.id,
            login: data.login,
            avatar_url: data.avatar_url,
            html_url: data.html_url,
            contributions: 'Main'
          }])
        } else {
          const data = await res.json()
          setWebsiteContributors(data)
        }
      } catch (err) {
        console.error("Error fetching website contributors", err)
      } finally {
        setLoadingWebsite(false)
      }
    }

    fetchRepoStats()
    fetchSourceContributors()
    fetchWebsiteContributors()
  }, [])

  const displayedWebsite = showAllWebsite ? websiteContributors : websiteContributors.slice(0, 8);
  const displayedSource = showAllSource ? sourceContributors : sourceContributors.slice(0, 8);

  const handleToggleWebsite = () => {
    if (showAllWebsite) {
      const el = document.getElementById('website-section')
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setTimeout(() => setShowAllWebsite(false), 400);
      } else {
        setShowAllWebsite(false);
      }
    } else {
      setShowAllWebsite(true);
    }
  }

  const handleToggleSource = () => {
    if (showAllSource) {
      const el = document.getElementById('source-section')
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
        setTimeout(() => setShowAllSource(false), 400);
      } else {
        setShowAllSource(false);
      }
    } else {
      setShowAllSource(true);
    }
  }

  return (
    <div className="contributors-page">
      
      <div className="contributors-header">
        <div className="contributors-header-glow"></div>
        <div className="container">
          <h1 className="contributors-title-gradient">Our Contributors</h1>
          <p>Meet the amazing individuals who power IIITD PYQs.</p>
        </div>
      </div>

      <div className="container contributors-body">
        
        {apiError && (
          <div className="api-error-message animate-fadeup" style={{
            display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 24px', 
            background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: 'var(--r-lg)', color: '#fca5a5', marginBottom: '24px',
            fontSize: '0.95rem'
          }}>
            <AlertTriangle size={20} />
            {apiError}
          </div>
        )}

        <div className="contributors-section" id="website-section">
          <h2 className="contributors-heading animate-fadeup" style={{ animationDelay: '0.1s' }}>
            Website <span className="contributors-heading-gradient">Developers</span>
          </h2>
          {loadingWebsite ? (
            <SkeletonGrid />
          ) : websiteContributors.length === 0 ? (
            <ErrorGrid />
          ) : (
            <>
              <div className="contributors-grid">
                {displayedWebsite.map((c, i) => (
                  <div key={c.id} style={{ animationDelay: `${0.1 + i * 0.05}s` }} className="animate-fadeup">
                    <ContributorCard contributor={c} />
                  </div>
                ))}
                <div className="animate-fadeup" style={{ animationDelay: `${0.1 + displayedWebsite.length * 0.05}s` }}>
                  <EmptyGridCard />
                </div>
              </div>
              {websiteContributors.length > 8 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                  <button onClick={handleToggleWebsite} className="show-more-btn">
                    {showAllWebsite ? (
                      <>Show Less <ChevronUp size={16} style={{ marginLeft: 6 }} /></>
                    ) : (
                      <>Show {websiteContributors.length - 8} More <ChevronDown size={16} style={{ marginLeft: 6 }} /></>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="contributors-section" id="source-section">
          <h2 className="contributors-heading animate-fadeup" style={{ animationDelay: '0.2s' }}>
            PYQ Repository <span className="contributors-heading-gradient">Contributors</span>
          </h2>
          {loadingSource ? (
            <div className="dashboard-grid animate-fadeup" style={{ pointerEvents: 'none' }}>
              <div className="dashboard-sidebar left-sidebar">
                <div className="widget-card stats-widget">
                  <div className="skeleton-name" style={{ width: '50%', height: '24px', marginBottom: '20px' }}></div>
                  <div className="stats-list skeleton-stats">
                    <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)' }}></div>
                    <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)' }}></div>
                    <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)' }}></div>
                  </div>
                </div>
              </div>
              <div className="dashboard-center">
                <SkeletonLeaderboard />
              </div>
              <div className="dashboard-sidebar right-sidebar">
                <div className="widget-card cta-widget">
                  <div className="skeleton-name" style={{ width: '80%', height: '24px' }}></div>
                  <div className="skeleton-name" style={{ width: '100%', height: '40px', marginTop: '16px' }}></div>
                  <div className="skeleton-badge" style={{ width: '100%', height: '44px', marginTop: '16px', borderRadius: 'var(--r-full)' }}></div>
                </div>
              </div>
            </div>
          ) : sourceContributors.length === 0 ? (
            <div className="dashboard-grid animate-fadeup" style={{ pointerEvents: 'none' }}>
              <div className="dashboard-sidebar left-sidebar">
                <div className="widget-card stats-widget" style={{ 
                  borderColor: 'rgba(239, 68, 68, 0.4)', 
                  borderStyle: 'dashed', 
                  background: 'linear-gradient(rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05)), var(--card)' 
                }}>
                  <div className="skeleton-name" style={{ width: '50%', height: '24px', marginBottom: '20px', background: 'rgba(239, 68, 68, 0.25)' }}></div>
                  <div className="stats-list">
                    <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)', background: 'rgba(239, 68, 68, 0.25)' }}></div>
                    <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)', background: 'rgba(239, 68, 68, 0.25)' }}></div>
                    <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)', background: 'rgba(239, 68, 68, 0.25)' }}></div>
                  </div>
                </div>
              </div>
              <div className="dashboard-center">
                <ErrorLeaderboard />
              </div>
              <div className="dashboard-sidebar right-sidebar">
                <div className="widget-card cta-widget" style={{ 
                  borderColor: 'rgba(239, 68, 68, 0.4)', 
                  borderStyle: 'dashed', 
                  background: 'linear-gradient(rgba(239, 68, 68, 0.05), rgba(239, 68, 68, 0.05)), var(--card)' 
                }}>
                  <div className="skeleton-name" style={{ width: '80%', height: '24px', background: 'rgba(239, 68, 68, 0.25)' }}></div>
                  <div className="skeleton-name" style={{ width: '100%', height: '40px', marginTop: '16px', background: 'rgba(239, 68, 68, 0.25)' }}></div>
                  <div className="skeleton-badge" style={{ width: '100%', height: '44px', marginTop: '16px', borderRadius: 'var(--r-full)', background: 'rgba(239, 68, 68, 0.25)' }}></div>
                </div>
              </div>
            </div>
          ) : sourceContributors.length >= 3 ? (
            <div className="dashboard-grid animate-fadeup">
              {/* Left Sidebar */}
              <div className="dashboard-sidebar left-sidebar">
                <div className="widget-card stats-widget">
                  <h3 className="widget-title">Repository Stats</h3>
                  {repoStats ? (
                    <div className="stats-list">
                      <div className="stat-item">
                        <div className="stat-icon repo-star"><Star size={18} /></div>
                        <div className="stat-info">
                          <span className="stat-value">{repoStats.stars}</span>
                          <span className="stat-label">Stars</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon fork"><GitFork size={18} /></div>
                        <div className="stat-info">
                          <span className="stat-value">{repoStats.forks}</span>
                          <span className="stat-label">Forks</span>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon issue"><CircleDot size={18} /></div>
                        <div className="stat-info">
                          <span className="stat-value">{repoStats.issues}</span>
                          <span className="stat-label">Open Issues</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="stats-list skeleton-stats">
                      <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)' }}></div>
                      <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)' }}></div>
                      <div className="skeleton-name" style={{ height: '64px', width: '100%', margin: 0, borderRadius: 'var(--r-lg)' }}></div>
                    </div>
                  )}
                </div>
              </div>

              {/* Center Content */}
              <div className="dashboard-center">
                <div className="leaderboard-wrapper">
                  <Podium top3={sourceContributors.slice(0, 3)} />
                  <div className="lb-list-container">
                    {displayedSource.slice(3).map((c, i) => (
                      <div key={c.id} style={{ animationDelay: `${0.1 + i * 0.05}s` }}>
                        <LeaderboardListItem contributor={c} rank={i + 4} />
                      </div>
                    ))}
                    <div style={{ animationDelay: `${0.1 + Math.max(0, displayedSource.length - 3) * 0.05}s` }} className="animate-fadeup">
                      <EmptyListRow />
                    </div>
                  </div>
                </div>
                {sourceContributors.length > 8 && (
                  <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                    <button onClick={handleToggleSource} className="show-more-btn">
                      {showAllSource ? (
                        <>Show Less <ChevronUp size={16} style={{ marginLeft: 6 }} /></>
                      ) : (
                        <>Show {sourceContributors.length - 8} More <ChevronDown size={16} style={{ marginLeft: 6 }} /></>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <div className="dashboard-sidebar right-sidebar">
                <div className="widget-card cta-widget">
                  <div className="cta-icon-wrapper"><Trophy size={28} color="#fbbf24" /></div>
                  <h3 className="cta-title">Want to see your name here?</h3>
                  <p className="cta-desc">Help us build a comprehensive collection of past year questions for IIITD!</p>
                  
                  <div className="cta-steps">
                    <p className="cta-steps-title">How to Contribute:</p>
                    <ol>
                      <li><strong>Fork</strong> the repository & create a new branch.</li>
                      <li><strong>Add papers</strong> to the appropriate directory (e.g. <code>ADA/ADA 2023</code>).</li>
                      <li><strong>Commit</strong> your changes and submit a Pull Request!</li>
                    </ol>
                  </div>

                  <a href="https://github.com/NalishJain/IIITD-PYQs/blob/main/README.md" target="_blank" rel="noreferrer" className="cta-btn">
                    Read Full Guidelines
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="contributors-grid">
                {displayedSource.map((c, i) => (
                  <div key={c.id} style={{ animationDelay: `${0.2 + i * 0.05}s` }} className="animate-fadeup">
                    <ContributorCard contributor={c} rank={i + 1} />
                  </div>
                ))}
              </div>
              {sourceContributors.length > 8 && (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                  <button onClick={handleToggleSource} className="show-more-btn">
                    {showAllSource ? (
                      <>Show Less <ChevronUp size={16} style={{ marginLeft: 6 }} /></>
                    ) : (
                      <>Show {sourceContributors.length - 8} More <ChevronDown size={16} style={{ marginLeft: 6 }} /></>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  )
}
