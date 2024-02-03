
import PetPost from './PetPost';

export default function PetPostList ({ petPosts }) {
  return (
    <div>
      {petPosts.map((petPost) => (
        <PetPost key={petPost.id} petPost={petPost} />
      ))}
    </div>
  );
};

