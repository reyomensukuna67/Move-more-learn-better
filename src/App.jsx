import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Suggestions from './components/Suggestions'
import Petition from './components/Petition'
import Messages from './components/Messages'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import Admin from './components/Admin'
import './styles.css'

export default function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    function onPop() { setPath(window.location.pathname) }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (path.startsWith('/admin')) {
    return <Admin />
  }

  return (
    <div id="top">
      <Navbar />
      <Hero />
      <About />
      <div id="suggestions">
        <Suggestions />
      </div>
      <Petition />
      <Messages />
      <div id="faq">
        <FAQ />
      </div>
      <Footer />
    </div>
  )
}
