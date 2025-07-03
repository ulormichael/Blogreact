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
                <div className="postcard">
                    <img src="" alt="my blog post"></img>
                    <h3>Post title</h3>
                </div>
                <div className="postcard">
                    <img src="" alt="my blog post"></img>
                    <h3>Post title</h3>
                </div>
            </div>
        </div>
    )
}

export default Home;
           