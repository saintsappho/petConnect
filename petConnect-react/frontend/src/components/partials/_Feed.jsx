import React from 'react';
import PetPost from './PetPost';

const PetPostList = ({ petPosts }) => {
  return (
    <div>
      {petPosts.map((petPost) => (
        <PetPost key={petPost.id} petPost={petPost} />
      ))}
    </div>
  );
};

export default PetPostList;