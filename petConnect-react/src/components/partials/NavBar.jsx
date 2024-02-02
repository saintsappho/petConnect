export default function NavBar() {
  return (
    <nav className="nav-bar">
      <li className="nav-logo"><a href="/"><img src="../public/RoundLogo.png"></img></a></li>
      <li className="nav-item"><a href="/">Home</a></li>
      <li className="nav-item"><a href="/about">About</a></li>
      <li className="nav-item"><a href="/contact">Contact</a></li>
    </nav>
  )
}