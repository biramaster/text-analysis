import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./Components/Header";
import Search from "./Components/Search";
import Welcome from "./Components/Welcome";
import DocumentCard from "./Components/DocumentCard";

function App() {
  const [textTitle, setTextTitle] = useState("");
  const [documents, setDocuments] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (textTitle !== "") {
      fetch(`http://127.0.0.1:5050/article?query=${textTitle}`)
        .then((res) => res.json())
        .then((data) => {
          setDocuments([{data}]);
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
                <DocumentCard doc={document} deleteDoc={handleDeleteDoc} />
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
