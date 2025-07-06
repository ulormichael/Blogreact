import React, { useEffect, useState } from "react";
import "./Home.css";
function Home() {
    const [posts, setPosts] = useState([]);
    async function fetchAllPosts() {
        const response = fetch("http://localhost:3000/posts", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const incomingData = response.json();
        console.log(incomingData);
        setPosts(incomingData);
    }
    fetchAllPosts();
    
    useEffect(() => {
        fetchAllPosts();
    }, []);
    const cars = []
    return (
        <div>
            <h1 className="text">Welcome to my blog</h1>
            <div className="container">
            <button type="button" className="btn btn-success">Show me</button>
                {posts.map((each_value) => (
                <div key={each_value._id} className="postCard">
                    <img src={each_value.image} alt="my blog post"></img>
                    <h3>{each_value.title}</h3>
                </div>
                ))}
            </div>
        </div>
    )
}

export default Home;

// Note: How to create new react app
// npx create-react-app blogreactapp or
// npm create vite@latest blogreactapp