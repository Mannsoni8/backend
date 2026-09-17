import { useState } from "react";
import "./App.css";

const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  return (
    <div>
      <h1>App</h1>
    </div>
  );
};

export default App;
