import { Card, Form, Button, Row, Col } from "react-bootstrap";


const SearchCard = ({
  id,
  searchRes,
  updateSearchRes,
  question,
  setQuestion,
  handleSubmit
}) => {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <p>Answer: {searchRes}</p>
        <Form className="pb-3" onSubmit={(e) => handleSubmit(e, id)}>
          <Row>
            <Col>
              <Form.Control 
              type="text" 
              placeholder="Enter a question..." 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
                
              />
            </Col>
            <Col>
              <Button variante="secondary" type="Submit">
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchCard;
