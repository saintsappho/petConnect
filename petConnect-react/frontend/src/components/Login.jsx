import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import Feed from "./partials/_Feed";
import useFetchData from "../hooks/useFetchData";
import "../styles/BubblyButton.scss";
import "../styles/HomeRoute.css";

export default function LoginButton ()  {
  const { loginWithRedirect } = useAuth0();
  const [posts, setPosts] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  var animateButton = function (e) {
    e.preventDefault;
    e.target.classList.remove('animate');
    e.target.classList.add('animate');
    setTimeout(function () {
      e.target.classList.remove('animate');
    }, 700);
  };
  var bubblyButtons = document.getElementsByClassName("bubbly-button");
  for (var i = 0; i < bubblyButtons.length; i++) {
    bubblyButtons[i].addEventListener('click', animateButton, false);
  }


  useFetchData("http://localhost:8080/posts", "posts", setPosts, setFetchError);  

  return (
    <>
    <div className="home-image" alt="logo" />
    <h1>Welcome to PetConnect!</h1>
      <button className="bubbly-button" onClick={() => loginWithRedirect()}>Log In</button>
    </>
  );
}

