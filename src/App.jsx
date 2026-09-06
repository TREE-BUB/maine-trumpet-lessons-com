import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Lessons from './pages/Lessons'
import Policies from './pages/Policies'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

function ScrollAndFade() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (typeof document === 'undefined' || document.visibilityState !== 'visible') return
    const el = document.querySelector('main .page')
    if (!el) return
    el.classList.remove('in')
    void el.offsetWidth
    el.classList.add('in')
  }, [pathname])
  return null
}

export default function App() {
  return (
    <>
      <Nav />
      <ScrollAndFade />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lessons" element={<Lessons />} />
          <Route path="/policies" element={<Policies />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
