import NavBar from "./partials/_NavBar";
import PetPost from "./partials/_PetPost";
import "../styles/TopNav.scss";
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
        <div className="dashboard">
          <PetPost />
          <PetPost />
          <PetPost />
        </div>
      </body>

      <footer>
        <p>
          Created by: <a href="Team13">Team13</a>
        </p>
      </footer>
    </div>
  );
}
