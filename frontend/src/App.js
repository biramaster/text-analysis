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

  function status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function json(response) {
    return response.json();
  }

  const performSearch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5050/question?query=${question}`, {
      mode: "no-cors",
    })
      .then(status)
      .then(json) 
      .then((data) => {   
        updateSearchRes("I don't know.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const changeContent = (res, id) => {
    console.log(res);
    var respons = res.data.choices[0]["text"];
    documents.map((document, i) =>
      document._id === id
        ? (document.content = document.content + " " + respons)
        : ""
    );
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    if (textTitle !== "") {
      fetch(`http://127.0.0.1:5050/article?query=${textTitle}`)
        .then((res) => res.json())
        .then((data) => {
          setDocuments([{ data }]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      fetch(`http://127.0.0.1:5050/articles?query=${textTitle}`)
        .then((res) => res.json())
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
  };

  const handleAnalyseDocAPI = (id) => {
    fetch(`http://localhost:5050/analyse?query=${id}`, {
      mode: "no-cors",
    })
      .then(status)
      .then(json)
      .then((data) => {
        console.log(data);
        changeContent(data, id);
        setDocuments(documents.filter((documents) => documents._id === id));
      })
      .catch((err) => {
        console.log(err);
      });
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
                    doc={document}
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
