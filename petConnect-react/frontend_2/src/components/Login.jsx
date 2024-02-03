<<<<<<< HEAD:petConnect-react/frontend/src/components/Login.jsx
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};
=======
import React from "react";
import "../styles/Login.css";

export default function Login() {
  return (
    <div className="Login">
      <form action="">
        <h1>Login</h1>
        <div className="user-pass-box">
          <input type="text" placeholder="Username" required />
        </div>
        <div className="user-pass-box">
          <input type="password" placeholder="Password" required />
        </div>

        <div className="remember-pass">
          <label>
            <input type="checkbox" />
            Remeber me
          </label>
        </div>
>>>>>>> main:petConnect-react/frontend_2/src/components/Login.jsx

export default LoginButton;

<<<<<<< HEAD:petConnect-react/frontend/src/components/Login.jsx
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
=======
        <div className="register-forgot">
          <p>
            Not already signed up? <a href="#">Register now!</a>
          </p>
          <a href="#">Forgot password?</a>
        </div>
      </form>
    </div>
  );
}
>>>>>>> main:petConnect-react/frontend_2/src/components/Login.jsx
