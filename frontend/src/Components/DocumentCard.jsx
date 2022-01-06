import React from "react";
import { Card, Button } from "react-bootstrap";

const DocumentCard = ({ doc, deleteDoc }) => {
  console.log(doc);
  let title = "";
  let content = "";
  let id = "";
  try {
    title = doc.data.title.toUpperCase();
    content = doc.data.content;
    id = doc.data.id;
  } catch {
    title = doc.title.toUpperCase();
    content = doc.content;
    id=doc.id;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="android-chrome-192x192.png" />
      <Card.Body>
        <Card.Title> {title} </Card.Title>
        <Card.Text> {content}</Card.Text>
        <Button variant="primary" onClick={() => deleteDoc(id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
export default DocumentCard;
