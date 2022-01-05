import React from 'react';
import { Button } from 'react-bootstrap';

const Welcome = () => (
  <div>
    <h1>Text Analysis</h1>
    <p>That is a simple application that retrives documents using Flask API.
        In order to start enter any search term in the input field.
    </p>
    <p>
        <Button variant="primary" href="https://google.se" target="_blank">Learn more</Button>
    </p>
  </div>
);

export default Welcome;
