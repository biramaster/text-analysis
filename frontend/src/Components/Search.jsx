import React from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

const Search = ({ handleSubmit }) => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Form onSubmit={ handleSubmit }>
            <Row>
              <Col xs={9}>
                <Form.Control type="text" placeholder="Enter a title..." />
              </Col>
              <Col>
                <Button>Search</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Search;
