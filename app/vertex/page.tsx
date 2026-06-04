import './vertex.css'
import Navbar from './Navbar'
import HeroContent from './HeroContent'
import FooterElements from './FooterElements'

export default function VertexPage() {
  return (
    <main className="hero-section">
      <video
        className="hero-bg-video"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_162107_3cd240af-dff4-4396-b8b7-22e25c9adb1c.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <Navbar />
      <HeroContent />
      <FooterElements />
    </main>
  )
}
