import React from 'react'
import axios from 'axios'

const DeleteUser = async() => {

    const userId=localStorage.getItem('userId'); // Get user ID from local storage
    try {
        const response = await axios.delete(`http://localhost:8000/auth/users/${userId}`);
        console.log("User deleted successfully:", response.data);
        alert("User deleted successfully");
        localStorage.removeItem('userId'); // Clear user ID from local storage
    } catch (error) {
        console.error("Error deleting user:", error.response ? error.response.data : error.message);
        alert("Failed to delete user");
    }

}

export default DeleteUser;