import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { BookingProvider } from './context/BookingContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingButtons from './components/FloatingButtons'
import BookingModal from './components/BookingModal'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const target = document.getElementById(hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname, hash])

  return null
}

export default function App() {
  return (
    <BookingProvider>
      <ScrollManager />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-navy-deep"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
      <BookingModal />
    </BookingProvider>
  )
}
