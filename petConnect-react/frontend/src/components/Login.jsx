import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

export default LoginButton;

// import React from 'react';
// import '../styles/Login.css';

// export default function Login() {
//   return (
//     <div className='Login'>
//       <form action="">
//         <h1>Login</h1>
//         <div className="user-pass-box">
//           <input type="text" placeholder='Username' required />
//         </div>
//         <div className="user-pass-box">
//           <input type="password" placeholder='Password' required />
//         </div>

//         <div className="remember-pass">
//           <label><input type="checkbox" />Remeber me</label>
//         </div>

//         <button type="submit">Login</button>

//         <div className="register-forgot">
//           <p>Not already signed up? <a href="#">Register now!</a></p>
//           <a href="#">Forgot password?</a>
//         </div>
//       </form>

//     </div>
//   )
// }
