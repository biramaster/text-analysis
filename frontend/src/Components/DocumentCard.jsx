import React from "react";
import { Card, Button } from "react-bootstrap";

const DocumentCard = ({ doc, deleteDoc }) => {
  console.log(doc);
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="android-chrome-192x192.png" />
      <Card.Body>
        <Card.Title>{doc.data.title}</Card.Title>
        <Card.Text>{doc.data.content}</Card.Text>
        <Button variant="primary" onClick={() => deleteDoc(doc.id)}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};
export default DocumentCard;
