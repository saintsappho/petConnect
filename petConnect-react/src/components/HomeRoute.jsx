import NavBar from './partials/_NavBar';
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
        <div className='dashboard'>
          
        </div>
      </body>

      <footer>
        <p>Created by: <a href="Team13">Team13</a></p>
      </footer>
    </div>
  )
}