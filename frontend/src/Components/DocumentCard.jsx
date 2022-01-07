import React from "react";
import { Card, Button } from "react-bootstrap";

const DocumentCard = ({ doc, deleteDoc, analyseDoc }) => {
  let title = "";
  let content = "";
  let id = "";

  try {
    title = doc.data.title;
    content = doc.data.content;
    id = doc.data._id;
  } catch {
    try {
      title = doc.title;
      content = doc.content;
      id = doc._id;
    } catch {
      title = "not found";
      content = "not found";
    }
  }

  return (
    <Card className="justify-content-center" style={{ width: "18rem" }}>
      <Card.Img className="justify-content-center" style={{ width: "5rem" }} variant="top" src="android-chrome-192x192.png" />
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text> {content}</Card.Text>
        <Button variant="primary" onClick={() => deleteDoc(id)}>
          Delete
        </Button>{" "}
        <Button variant="secondary" onClick={() => analyseDoc(id)}>Analyse</Button>
      </Card.Body>
    </Card>
  );
};
export default DocumentCard;
