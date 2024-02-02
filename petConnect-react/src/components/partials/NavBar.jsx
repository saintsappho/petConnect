import React from 'react';

export default function NavBar() {
  return (
    <nav className="top-nav-bar">
      
      <li className="top-nav-bar__logo"><a href="/"><img src="../public/RoundLogo.png"></img></a></li>
      <li className="top-nav-bar__item"><a href="/">Home</a></li>
      <li className="top-nav-bar__item"><a href="/about">About</a></li>
      <li className="top-nav-bar__item"><a href="/contact">Contact</a></li>
    </nav>
  )
}