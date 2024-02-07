
const MeetOwnerButton = ({user}) => {
  return (
<div>
<button className="meet-owner-card" onClick={()=>{console.log("message")}}>
  Meet My Owner! 
  <img className="owner-profile-pic" src={user.picture} alt="User Profile Picture" />
  </button>
</div>
  )
}

export default MeetOwnerButton;