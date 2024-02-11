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

  useFetchData("http://localhost:8080/posts", "posts", setPosts, setFetchError);  

  return (
    <>
      <button className="bubbly-button" onClick={() => loginWithRedirect()}>Log In</button>;
      <Feed posts={posts} setPosts={setPosts} error={fetchError} />
    </>

  )
  
}

