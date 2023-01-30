import { useState } from "react";
import "./App.css";
import PostsList from "./pages/PostsList";

function App() {
  const [count, setCount] = useState(0);

  return <PostsList />;
}

export default App;
