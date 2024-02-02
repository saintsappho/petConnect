//User Profile component will be a modal that pops up when the user clicks on "profile" in the top right corner of the NavBar. It will display the user's name, email, phone number, and a list of their pets. 
//The user's name, email, and phone number will be hardcoded for now, but the list of pets will be dynamic and will be pulled from the database.
//the user's information will be able to be edited by the user, and the user will be able to add or remove pets from their list.

export default function UserProfile () {
  return (
    <div>
      <h1>User Profile</h1>
      <h2>Ashley Tree</h2>
      <p>email: jane@doe.com</p>
      <p>phone: 403 777 7777</p>
      <ul>pets: 
        <li>Fluffy</li>
        <li>Spot</li>
        <li>Whiskers</li>
      </ul>
    </div>
  )
}