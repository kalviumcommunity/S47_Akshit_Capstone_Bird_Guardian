// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar'; 
// import Footer from '../components/Footer'; 

// const CreatePost = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         birdType: '',
//         birdColor: '',
//         photo: null,
//         address: '',
//         email: '',
//         description: ''
//     });

//     const navigate = useNavigate();

//     const handleChange = e => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleFileChange = e => {
//         setFormData({
//             ...formData,
//             photo: e.target.files[0]
//         });
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();

//         const data = new FormData();
//         for (let key in formData) {
//             data.append(key, formData[key]);
//         }

//         try {
//             await axios.post('/PostYourPosts', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             navigate('/AllPost');
//         } catch (error) {
//             console.error('Error creating post:', error);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className="container mx-auto px-4 py-8">
//                 <h1 className="text-3xl font-bold mb-6">Create Post</h1>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Name</label>
//                         <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Bird Type</label>
//                         <input type="text" name="birdType" value={formData.birdType} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Bird Color</label>
//                         <input type="text" name="birdColor" value={formData.birdColor} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Photo</label>
//                         <input type="file" name="photo" onChange={handleFileChange} className="mt-1 block w-full p-2 border rounded-md" />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Address</label>
//                         <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Email</label>
//                         <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required />
//                     </div>
//                     <div>
//                         <label className="block text-sm font-medium text-gray-700">Description</label>
//                         <textarea name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full p-2 border rounded-md" required></textarea>
//                     </div>
//                     <div>
//                         <button type="submit" className="bg-gradient-to-r from-orange-500 to-orange-800 text-white py-2 px-4 rounded-md">Submit</button>
//                     </div>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     );
// };

// export default CreatePost;
