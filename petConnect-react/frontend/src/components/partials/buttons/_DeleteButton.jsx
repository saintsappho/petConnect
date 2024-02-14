import React, { useState } from 'react';
import axios from 'axios';

export default function DeleteButton(props) {
  const { postId, onSuccess } = props;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:8080/posts/${postId}/delete`)
      .then((response) => {
        // Handle success
        console.log('Post deleted successfully', response.data);
        setShowConfirmation(false);
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch((error) => {
        // Handle error
        console.error('Error deleting post', error);
        setShowConfirmation(false);
        
      });
  };

  const showDeleteConfirmation = () => {
    setShowConfirmation(true);
  };

  const hideDeleteConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <div>
      <button className="delete-button bubbly-button" onClick={showDeleteConfirmation}>
        Delete
      </button>

      {showConfirmation && (
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={hideDeleteConfirmation}>No</button>
        </div>
      )}
    </div>
  );
}
