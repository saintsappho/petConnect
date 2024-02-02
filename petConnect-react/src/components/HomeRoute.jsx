import NavBar from './partials/NavBar';
import '../styles/TopNav.scss';
export default function HomeRoute() {
  return (
    <div>

      <head>
        <title>PetConnect</title>
        
      </head>

      <header>
        <NavBar />
      </header>

      <body>
        <img src="../public/Logo.png"></img>
        <h1>PetConnect</h1>
        <h2>This is my App</h2>
        <h3>I hope you like it!</h3>
      </body>

      <footer>
        <p>Created by: <a href="Team13">Team13</a></p>
      </footer>
    </div>
  )
}