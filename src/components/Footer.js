'use client'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Footer() {
  const clicksRef = useRef([])
  const router = useRouter()

  const handleSecretClick = () => {
    const now = Date.now()
    clicksRef.current.push(now)
    
    // Sirf last 20 seconds ke clicks rakho
    clicksRef.current = clicksRef.current.filter(t => now - t < 20000)
    
    // 5 clicks in 20 seconds
    if (clicksRef.current.length >= 5) {
      clicksRef.current = []
      router.push('/admin/login')
    }
  }

  return (
    <footer className="footer">
      <div className="footer-grid">

        {/* Column 1 */}
        <div className="footer-col">
          <h4>Company</h4>
          <Link href="#">About</Link>
          <Link href="#">Advertising</Link>
          <Link href="#">Submit</Link>
          <Link href="#">Contact</Link>
          <Link href="#">Team</Link>
          <Link href="#">Privacy Policy</Link>
        </div>

        {/* Column 2 */}
        <div className="footer-col">
          <h4>Builds</h4>
          <Link href="/category/cafe-racers">Cafe Racers</Link>
          <Link href="/category/trackers">Trackers</Link>
          <Link href="/category/bobbers">Bobbers</Link>
          <Link href="/category/choppers">Choppers</Link>
          <Link href="/category/classics">Classics</Link>
          <Link href="/category/scramblers">Scramblers</Link>
        </div>

        {/* Column 3 */}
        <div className="footer-col">
          <h4>Brands</h4>
          <Link href="#">Honda</Link>
          <Link href="#">Suzuki</Link>
          <Link href="#">Hi Speed</Link>
          <Link href="#">Yamaha</Link>
          <Link href="#">Kawasaki</Link>
          <Link href="#">Crown Lifan</Link>
          <Link href="#">Ravi</Link>
          <Link href="#">Harley-Davidson</Link>
          <Link href="#">BMW</Link>
        </div>

        {/* Column 4 */}
        <div className="footer-col">
          <h4>Follow Us</h4>
          <a href="https://www.instagram.com/bikemodpk?igsh=MWZjaXZiMHh0NGE1OA==" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61579679754995" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://www.youtube.com/@BIKEMODPK" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://www.tiktok.com/@bikemodpk?_r=1&_t=ZS-95eJIORN6vq" target="_blank" rel="noopener noreferrer">TikTok</a>
        </div>

      </div>

      {/* Hidden Admin Trigger */}
      <div className="footer-bottom">
        <p 
          onClick={handleSecretClick}
          style={{ cursor: 'default', userSelect: 'none' }}
        >
          BUILT FOR THE 1% WHO BUILD. © 2026 BIKEMODPK
        </p>
      </div>

    </footer>
  )
}