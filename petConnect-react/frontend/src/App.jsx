import './App.css'
import HomeRoute from './components/HomeRoute'
import Login from './components/Login'
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isLoading, error, user } = useAuth0();
  
  return (
<div> 
  {/* <HomeRoute /> */}
  {!user && <LoginButton />}
      {error && <p>Authentication Error</p>}
      {!error && isLoading && <p>Loading...</p>}
      {!error && !isLoading && user && (
        <>
          
          <LogoutButton />
          <Profile />
          </>
      )}
</div>
  )
}

export default App
