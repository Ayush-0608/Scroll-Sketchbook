import { useEffect, useMemo, useState, useRef } from 'react'
import { backCoverLogo, pageSpreads } from './bookImages'
import './App.css'

const PAGE_SCROLL = 0.5
const PAGE_COUNT = pageSpreads.length * 2
const base = import.meta.env.BASE_URL;

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max)
}

function easeInOut(x) {
  return x < 0.5 ? 2 * x * x : 1 - 2 * (1 - x) * (1 - x);
}

function Sticker() {
  return <img className="sticker" src={`${base}/logo.svg`} alt="Project logo" />
}

function PageSide({ side, children, pageNumber }) {
  return (
    <div className={`page__half page__half--${side}`}>
      {children}
      {pageNumber ? <div className="page__number">{pageNumber}</div> : null}
    </div>
  )
}

function SketchLink({ sketch }) {
  return (
    <button className="sketchButton" onClick={() => onClick(sketch)} aria-label={`View details for ${sketch.alt}`}>
      <img src={sketch.image} alt={sketch.alt} />
    </button>
  )
}

function App() {
  const [viewportHeight, setViewportHeight] = useState(() => window.innerHeight)
  const [scrollY, setScrollY] = useState(() => window.scrollY)
  const targetScroll = useRef(window.scrollY)
  const currentScroll = useRef(window.scrollY)


  useEffect(() => {
    let frameId = 0

    const updateScroll = () => {
      targetScroll.current = window.scrollY
    }

    const updateLoop = () => {
      const diff = targetScroll.current - currentScroll.current

      let move = diff * 0.08
      move = clamp(move, -15, 15)

      currentScroll.current += move
      setScrollY(currentScroll.current)

      frameId = requestAnimationFrame(updateLoop)
    }

    const updateViewport = () => {
      setViewportHeight(window.innerHeight)
      updateScroll()
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateViewport)
    updateLoop()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateViewport)
    }
  }, [])

  const step = viewportHeight * PAGE_SCROLL
  const bookOpenProgress = clamp(scrollY / step)
  const bookScale = 0.5 + bookOpenProgress * 0.5
  const bookAnchorShift = `${-50 + bookOpenProgress * 50}%`
  const bookYShift = `${-50 - (bookOpenProgress * 15)}%`
  const logoOpacity = clamp((scrollY - 13.5 * step) / (0.5 * step))
  const devscapeOpacity = 1 - bookOpenProgress

  const pages = useMemo(() => {
    return [
      { type: 'front-cover' },
      ...pageSpreads.map((spread) => ({ type: 'spread', spread })),
      { type: 'back-cover' },
    ]
  }, [])

  const pageStyles = pages.map((_, index) => {
    const turnProgress = index === pages.length - 1 ? 0 : clamp((scrollY - (index + 1) * step) / step)
    const zProgress = index === pages.length - 1 ? 0 : clamp((scrollY - (index + 1) * step) / (0.5 * step))
    const initialZ = index === 0 ? 13 : -index
    const finalZ = index === 0 ? -13 : index
    const easedTurn = easeInOut(turnProgress)
    const rotateY = -easedTurn * (180 - index / 2)
    const z = initialZ + (finalZ - initialZ) * zProgress

    return {
      '--page-index': index + 1,
      '--page-rotate': `${rotateY}deg`,
      '--page-z': `${z}px`,
    }
  })

  return (
    <main
      className="book-scroll"
      style={{ '--page-count': PAGE_COUNT, '--book-scale': bookScale, '--book-anchor-shift': bookAnchorShift, '--book-y-shift': bookYShift }}
    >
      <div className="devscape" aria-label="devscape" style={{ opacity: devscapeOpacity }}>
        <span>Devscape</span>
      </div>
      <h1>Scroll</h1>
      <div className="book" aria-label="Scrollable sketch book">
        <div className="book__spine"></div>

        {pages.map((page, index) => {
          if (page.type === 'front-cover') {
            return (
              <div
                className="page book__page book__cover book__cover--front"
                key={page.type}
                style={pageStyles[index]}
              >
                <PageSide side="front">
                  <Sticker />
                </PageSide>
                <PageSide side="back">
                  <div className="book__insert"></div>
                </PageSide>
              </div>
            )
          }

          if (page.type === 'back-cover') {
            return (
              <div
                className="page book__page book__cover book__cover--back"
                key={page.type}
                style={pageStyles[index]}
              >
                <PageSide side="front" />
                <PageSide side="back" />
                <div className="book__insert">
                  <a href={backCoverLogo.href} target="_blank" rel="noopener noreferrer" aria-label={backCoverLogo.alt}>
                    <img
                      className="logo"
                      src={backCoverLogo.image}
                      alt={backCoverLogo.alt}
                    />
                  </a>
                  {backCoverLogo.sticker ? (
                    <img className="sticker" src={backCoverLogo.sticker} alt="Project sticker" />
                  ) : null}
                </div>
              </div>
            )
          }

          const frontNumber = index * 2 - 1
          const backNumber = index * 2

          return (
            <div className="page book__page" key={frontNumber} style={pageStyles[index]}>
              <PageSide side="front" pageNumber={frontNumber}>
                <SketchLink sketch={page.spread[0]} />
              </PageSide>
              <PageSide side="back" pageNumber={backNumber}>
                <SketchLink sketch={page.spread[1]} />
              </PageSide>
            </div>
          )
        })}
      </div>
    </main>
  )
}

export default App
