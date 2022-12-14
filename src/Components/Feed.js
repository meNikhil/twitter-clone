import React, { useEffect, useState } from "react";
import "../Assets/Styles/Feed.css";
import Post from "./Post";
import TweetBox from "./TweetBox";
import db from "./firebase";
import FlipMove from "react-flip-move";

export default function Feed() {
    const [posts, setPosts] = useState([]);

    // use snapshot to detect any change on firebase' database
    useEffect(() => {
        db.collection("posts").onSnapshot((snapshot) =>
            setPosts(snapshot.docs.map((doc) => doc.data()))
        );
    }, []);

    return (
        <div className="feed">
            {/* Header */}
            <div className="feed__header">
                <h2>Home</h2>
            </div>

            {/* TweetBox */}
            <TweetBox />

            {/* Post */}
            <FlipMove>
                {posts.map((post) => (
                    <Post
                        key={post.text}
                        displayName={post.displayName}
                        username={post.username}
                        verified={post.verified}
                        text={post.text}
                        avatar={post.avatar}
                        image={post.image}
                    />
                ))}
            </FlipMove>
        </div>
    );
}
