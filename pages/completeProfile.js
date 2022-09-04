import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

function CompleteProfile() {
  /*--------------State Variables-------------------------*/
  const [input, setInput] = useState({
    name: "",
  });
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorSubmit, setErrorSubmit] = useState(false);
  /*--------------State Variables-------------------------*/

  /* Function to handle change in any of the form inputs */
  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }
  /* Function to handle change in any of the form inputs */

  /* Function to be executed when Submit button is clicked */
  async function handleClick(event) {
    event.preventDefault();
    setSubmitAttempt(true);
    if (input.name) {
      console.log(input);
    }
  }
  /* Function to be executed when Submit button is clicked */
  return (
    <>
      <Container>
        <Form>
          <Alert
            show={submitted}
            variant="success"
            onClose={() => setSubmitted(false)}
            dismissible
          >
            <Alert.Heading>Success!</Alert.Heading>
            <p>Author successfully added</p>
          </Alert>
          <Alert
            show={errorSubmit}
            variant="danger"
            onClose={() => setErrorSubmit(false)}
            dismissible
          >
            <Alert.Heading>OOPS!!</Alert.Heading>
            <p>Something went wrong.</p>
          </Alert>
          <Form.Group>
            <Form.Label>NAME</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter the name of author"
              value={input.name}
              onChange={handleChange}
              required
              isInvalid={submitAttempt && !input.name}
            />
            <Form.Control.Feedback type="invalid">
              Your name cannot be left blank.
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" onClick={handleClick}>
            Submit form
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default CompleteProfile;
