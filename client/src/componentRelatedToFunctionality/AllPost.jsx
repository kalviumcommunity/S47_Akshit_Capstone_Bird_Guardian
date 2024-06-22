// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Navbar from '../components/Navbar'; 
// import Footer from '../components/Footer'; 

// const AllPost = () => {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         fetchPosts();
//     }, []);

//     const fetchPosts = async () => {
//         try {
//             const response = await axios.get('http://localhost:5000/Post'); // Ensure this matches your backend URL
//             setPosts(response.data);
//         } catch (error) {
//             console.error('Error fetching posts:', error);
//         }
//     };

//     const getBase64Image = (photo) => {
//         return photo ? `data:image/jpeg;base64,${btoa(new Uint8Array(photo.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}` : null;
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-3xl font-bold mb-6">Posts</h1>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {posts.map(post => (
//                         <div key={post._id} className="border p-4 rounded-lg shadow-lg">
//                             <h2 className="text-xl font-semibold">{post.name}</h2>
//                             <p>Type: {post.birdType}</p>
//                             <p>Color: {post.birdColor}</p>
//                             {post.photo && <img src={getBase64Image(post.photo)} alt="Bird" className="w-full h-auto mb-4" />}
//                             <p>Address: {post.address}</p>
//                             <p>Email: {post.email}</p>
//                             <p>Description: {post.description}</p>
//                             <div className="flex space-x-2 mt-4">
//                                 <Link to={`/updatePost/${post._id}`} className="bg-blue-500 text-white py-2 px-4 rounded-md">
//                                     Update
//                                 </Link>
//                                 <Link to={`/deletePost/${post._id}`} className="bg-red-500 text-white py-2 px-4 rounded-md">
//                                     Delete
//                                 </Link>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <div className="flex justify-center mt-8">
//                     <Link to="/managePost" className="bg-green-500 text-white py-2 px-4 rounded-md">
//                         Manage Your Posts
//                     </Link>
//                 </div>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default AllPost;
