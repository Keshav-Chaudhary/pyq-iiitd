import { useState, useEffect } from 'react'
import { Star } from 'lucide-react'
import '../styles/FloatingStarCTA.css'

const BUTTON_EMOJIS = ['🙂', '😊']
const TEXT_EMOJIS = ['😃', '🤩']

export default function FloatingStarCTA() {
  const [hoverState, setHoverState] = useState('rest') // 'rest', 'button', 'text'
  const [btnIndex, setBtnIndex] = useState(0)
  const [txtIndex, setTxtIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check for footer to trigger pop-up
    const footer = document.querySelector('footer') || document.querySelector('.footer') || document.querySelector('#footer')
    
    if (footer) {
      const observer = new IntersectionObserver((entries) => {
        setIsVisible(entries[0].isIntersecting)
      }, { threshold: 0.1 })
      
      observer.observe(footer)
      return () => observer.disconnect()
    } else {
      // Fallback if no footer element is explicitly found
      const handleScroll = () => {
        setIsVisible(window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 300)
      }
      window.addEventListener('scroll', handleScroll)
      handleScroll()
      return () => window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    let interval;
    if (hoverState === 'button') {
      setBtnIndex(0)
      let i = 0
      interval = setInterval(() => {
        i++
        if (i < BUTTON_EMOJIS.length) {
          setBtnIndex(i)
        } else {
          clearInterval(interval)
        }
      }, 150) // 150ms per frame
    } else if (hoverState === 'text') {
      setTxtIndex(0)
      let i = 0
      interval = setInterval(() => {
        i++
        if (i < TEXT_EMOJIS.length) {
          setTxtIndex(i)
        } else {
          clearInterval(interval)
        }
      }, 150)
    }
    
    return () => clearInterval(interval)
  }, [hoverState])

  return (
    <div className={`floating-cta-wrapper ${isVisible ? 'visible' : 'hidden'}`}>
      {hoverState === 'rest' && (
        <div className="floating-particles outside">
          <span className="particle p1">✨</span>
          <span className="particle p2">⭐</span>
          <span className="particle p3">💫</span>
          <span className="particle p4">✨</span>
          <span className="particle p5">💧</span>
          <span className="particle p6">✨</span>
          <span className="particle p7">⭐</span>
          <span className="particle p8">💫</span>
        </div>
      )}
      <a 
        href="https://github.com/Keshav-Chaudhary/pyq-iiitd" 
        target="_blank" 
        rel="noreferrer"
        className="floating-star-cta"
        aria-label="Support us on GitHub"
        onMouseEnter={() => setHoverState('button')}
        onMouseLeave={() => setHoverState('rest')}
      >
        <div className={`star-icon-wrap ${hoverState}`}>
          {hoverState === 'rest' && (
            <div className="emoji-blinker">
              <span className="emoji-open">🥺</span>
              <span className="emoji-closed">😔</span>
            </div>
          )}
          {hoverState === 'button' && BUTTON_EMOJIS[btnIndex]}
          {hoverState === 'text' && TEXT_EMOJIS[txtIndex]}
        </div>
        <span className="star-text">
          Love this? 
          <span 
            className="star-highlight"
            onMouseEnter={() => setHoverState('text')}
            onMouseLeave={() => setHoverState('button')}
          >
            <Star size={13} fill="currentColor" /> Star on GitHub
          </span>
        </span>
      </a>
    </div>
  )
}
