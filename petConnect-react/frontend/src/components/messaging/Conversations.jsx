import { useState, useEffect } from "react";
import axios from 'axios';
import StatusOnline from "./StatusOnline";
//hooks
import useFetchData from "../../hooks/useFetchData";
import "./Conversations.scss";

export default function Conversations({ onConversationClick, accessToken }) {
  const [conversations, setConversations] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  // const [userData, setUserData] = useState({ profilePicture: '', name: '' });
  console.log('rendering Conversations component');

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        console.log("User data:", response.data); // Log user data
        if (response.data.length > 0) {
          setUserId(response.data[0].user_id);
        }
      } catch (error) {
        console.error("Error fetching userId:", error); // Log the error
        setError(error.message);
      }
    };
  
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchConversations = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/conversations/${userId}`);
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error.message);
        setError(error.message);
      }
    };

    fetchConversations();
  }, [userId]);


  // useEffect(() => {
  //   console.log("Fetching conversations for user:", userId); // Log userId
  //   const fetchConversations = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:8080/api/conversations/${userId}`);
  //       console.log("Response data:", response.data); // Log response data
  //       setConversations(response.data);
  //     } catch (error) {
  //       console.error("Error fetching conversations:", error.message);
  //       setError(error.message);
  //     }
  //   };
  
  //   fetchConversations();
  // }, [userId]);

  console.log("Received userId:", userId);

  console.log("Conversations:", conversations);


 // Fetch user data for private conversations
 const fetchUserData = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user data:`, error.message);
    return [];
  }
};

return (
  <div className="conversations">
    {error && <p>Error fetching conversations: {error}</p>}
    {conversations && Array.isArray(conversations) && conversations.map((user) => (
      <div key={user.chat_id} className="conversations_container" onClick={() => onConversationClick(user)}>
        {/* Display user information */}
        <StatusOnline />
        <img className="conversations_image" src={user.picture} alt="Profile" />
        <span className="conversations_name">{user.name}</span>
      </div>
    ))}
  </div>
);
}


// return (
//   <div className="conversations">
//     {error && <p>Error fetching conversations: {error}</p>}
//     {conversations && Array.isArray(conversations) && conversations.map((conversation) => (
//       <div
//         key={conversation.chat_id}
//         className="conversations_container"
//         onClick={() => onConversationClick(conversation)}
//       >
//         {/* Display user information */}
//         {users.map((user) => {
//           if (conversation.user2_ID === user.id) {
//             return (
//               <React.Fragment key={user.id}>
//                 <img className="conversations_image" src={fetchUserData.profile_picture} alt="Profile" />
//                 <span className="conversations_name">{fetchUserData.name}</span>
//               </React.Fragment>
//             );
//           }
//           return null;
//         })}
//       </div>
//     ))}
//   </div>
// )
// }
