import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Components/Header";
import Search from "./Components/Search";
import Welcome from "./Components/Welcome";
import DocumentCard from "./Components/DocumentCard";
import SearchCard from "./Components/SearchCard";

function App() {
  const [textTitle, setTextTitle] = useState("");
  const [documents, setDocuments] = useState([]);
  const [question, setQuestion] = useState("");
  const [searchRes, updateSearchRes] = useState([]);

  const performSearch = (e, id) => {
    e.preventDefault();
    console.log(id);
    

    fetch(`http://localhost:5050/question?query=${question}`)
      .then((response) => response.json(), err => alert(err)) 
      .then((data) => changeContent(data, id))
      .catch((err) => {
        console.log(err);
      });
  };

  const changeContent = (res, id) => {
    const response = res.choices[0].text;
    console.log(id);
    documents.map((document, i) =>
      document._id === id
        ? (document.content = document.content + " " + response)
        : ""
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (textTitle !== "") {
      fetch(`http://127.0.0.1:5050/article?query=${textTitle}`)
        .then((response) => response.json(), err => alert(err))
        .then((data) => {
          setDocuments([{ data }]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`http://127.0.0.1:5050/articles?query=${textTitle}`)
        .then((response) => response.json(), err => alert(err))
        .then((data) => {
          setDocuments(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteDoc = (id) => {
    setDocuments(documents.filter((documents) => documents._id !== id));
    fetch(`http://127.0.0.1:5050/article?query=${id}`, {
      method: "DELETE",
    })
  };

  const handleAnalyseDocAPI = (id) => {
    fetch(`http://localhost:5050/analyse?query=${id}`)
      .then((response) => response.json(), err => alert(err))
      .then((data) => changeContent(data, id))
      .catch(err => {
        console.error(`${err}`);
      })
  };

  return (
    <div className="App">
      <Header title="Text Analysis" />
      <Search
        textTitle={textTitle}
        setTextTitle={setTextTitle}
        handleSubmit={handleSearchSubmit}
      />
      <Container className="mt-4">
        {documents.length ? (
          <Row xs={1} md={2} lg={3}>
            {documents.map((document, i) => (
              <Col key={i} className="pb-3">
                <Row>
                  <DocumentCard
                    doc={document}
                    deleteDoc={handleDeleteDoc}
                    analyseDoc={handleAnalyseDocAPI}
                  />
                </Row>

                <Row>
                  <SearchCard
                    className="pb-3"
                    id={document._id}
                    question={question}
                    setQuestion={setQuestion}
                    searchRes={searchRes}
                    updateSearchRes={updateSearchRes}
                    handleSubmit={performSearch}
                  />
                </Row>
              </Col>
            ))}
          </Row>
        ) : (
          <Welcome />
        )}
      </Container>
    </div>
  );
}

export default App;
