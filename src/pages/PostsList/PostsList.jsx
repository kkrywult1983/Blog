import { useEffect, useState } from "react";
import { Spin } from "antd";
import { PostPreview } from "./components";
import "./PostsList.css";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState([false]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {loading ? (
        <Spin />
      ) : (
        <div>
          {/* {posts.map(({ id, title }) => (
            <div key={id}>{title}</div>
          ))} */}
        </div>
      )}
      <div className="title">Blogasek</div>
      <div>
        <PostPreview key={posts.id} posts={posts} />{" "}
      </div>
    </div>
  );
};

export default PostsList;
