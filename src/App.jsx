import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import RemotionRender from "./RemotionRender";
import MCQ from "../components/MCQ";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RemotionRender />
      <MCQ />
    </>
  );
}

export default App;
