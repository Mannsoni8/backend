import { useState } from "react";
import './App.css'

const App = () => {
  const [urls, setUrls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentUrl, setCurrentUrl] = useState(null);

  return <div>App</div>;
};

export default App;
