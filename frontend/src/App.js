import Header from "./Components/Header";
import Search from "./Components/Search";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

const handleSearchSubmit = (e) => {
  //e.preventDefault();
  console.log(e.target[0].value);
};

function App() {
  return (
    <div className="App">
      <Header title="Text Analysis" />
      <Search handleSubmit={ handleSearchSubmit } />
    </div>
  );
}

export default App;
