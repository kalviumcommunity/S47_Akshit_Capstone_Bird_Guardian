import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer'; 

const DeletePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const url = `${import.meta.env.VITE_APP_URL}/deletePost/${id}`;
            await axios.delete(url);
            navigate('/AllPost');
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
        <div>
            
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6">Delete Post</h1>
                <p className="mb-4">Are you sure you want to delete this post?</p>
                <div className="flex space-x-4">
                    <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-md">Yes, Delete</button>
                    <button onClick={() => navigate('/AllPost')} className="bg-gray-500 text-white py-2 px-4 rounded-md">Cancel</button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default DeletePost;

