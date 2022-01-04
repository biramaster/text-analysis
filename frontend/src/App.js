import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Components/Header";
import Search from "./Components/Search";

function App() {
  const [textTitle, setTextTitle] = useState("");
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(textTitle);
  };
  console.log(textTitle);
  return (
    <div className="App">
      <Header title="Text Analysis" />
      <Search
        textTitle={textTitle}
        setTextTitle={setTextTitle}
        handleSubmit={handleSearchSubmit}
      />
    </div>
  );
}

export default App;
