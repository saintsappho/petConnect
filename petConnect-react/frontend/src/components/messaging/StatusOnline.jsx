import { useEffect, useState } from "react";
import './StatusOnline.scss';

export default function StatusOnline({ user }) {
  const [isOnline, setIsOnline] = useState(true);
  let interval = null;

 const InternetErrMessagenger = () => setIsOnline(navigator.onLine===true); // for do like this shortform


 useEffect(()=>{
    interval = setInterval(InternetErrMessagenger, 6000); // call the function name only not with function with call `()`
    return ()=>{
       clearInterval(interval) // for component unmount stop the interval
    }
 },[])
  
  return (
    <div className="status_online">
      <div className="status_online__container">
        {/* Check if the user object is defined before accessing its properties */}
        {user && (
          <div className="status_online_user">
            {/* Use a conditional class based on the user's online status */}
            <div className={`status_badge ${user.isOnline ? 'online' : ''}`}></div>
            {/* <img className="status_online__image" src="./src/assets/profile-hex.png" alt="Profile" /> */}
          </div>
        )}
      </div>
    </div>
  );
}