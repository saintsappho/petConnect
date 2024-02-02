import "./App.css";
import HomeRoute from "./components/HomeRoute";
import Login from "./components/Login";
// import { getUsers } from "../backend/db/queries/users.js";

function App() {
  return (
    <div>
      <HomeRoute />
      {/* {getUsers()} */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
