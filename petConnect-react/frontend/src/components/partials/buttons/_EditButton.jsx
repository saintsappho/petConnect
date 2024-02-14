
export default function EditButton (props) {

  axios.put(`http://localhost:8080/posts/${postId}`, updatedPost)
  .then(response => {  // Handle success
     console.log('Post updated successfully', response.data);
  })
  .catch(error => {    // Handle error
    console.error('Error updating post', error);
  });

  return(
    <button className="edit-button bubbly-button">Edit</button>
  )
}