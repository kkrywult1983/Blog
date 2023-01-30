import { useState } from "react";
import "./App.css";
import PostsList from "./pages/PostsList.jsx";

function App() {
  const [count, setCount] = useState(0);

  return <PostsList />;
}

export default App;
