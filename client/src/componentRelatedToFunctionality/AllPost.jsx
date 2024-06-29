import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, NavLink, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../components/Footer';
import { useAuth } from '../store/Auth';

const AllPost = () => {
  const { isLoggedIn } = useAuth();
  const [posts, setPosts] = useState([]);
  const [errorToastShown, setErrorToastShown] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !errorToastShown) {
      toast.error("You need to sign in or sign up to access this page.To See Posts");
      setErrorToastShown(true);
    } else {
      fetchPosts();
    }
  }, [isLoggedIn, errorToastShown]);

  const fetchPosts = async () => {
    try {
      const url = `${import.meta.env.VITE_APP_URL}/getPost`;
      const response = await axios.get(url);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const getBase64Image = (photo) => {
    return photo ? `data:image/jpeg;base64,${btoa(new Uint8Array(photo.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}` : null;
  };

  if (!isLoggedIn) {
    return <Navigate to="/SignIn" />;
  }

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Posts</h1>
        <div className="flex justify-end mb-4">
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post._id} className="border p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{post.name}</h2>
              <p>Type: {post.birdType}</p>
              <p>Color: {post.birdColor}</p>
              {post.photo && <img src={getBase64Image(post.photo)} alt="Bird" className="w-full h-auto mb-4" />}
              <p>Address: {post.address}</p>
              <p>Email: {post.email}</p>
              <p>Description: {post.description}</p>
              <div className="flex justify-between mt-4">
                <NavLink to={`/UpdatePost/${post._id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md">
                  Update
                </NavLink>
                <NavLink to={`/DeletePost/${post._id}`}  className="bg-red-500 text-white py-2 px-4 rounded-md">
                  Delete
                </NavLink>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link to="/CreatePost" className="bg-green-500 text-white py-2 px-4 rounded-md">
            Create Post
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllPost;
