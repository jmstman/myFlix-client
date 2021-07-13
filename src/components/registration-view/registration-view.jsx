import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';


export function RegistrationView (props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const validated = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://paradiseflix.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        // '_self' will open in the current tab
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user');
        alert('Please try again');
      });
  };

  return (
    <Row className="d-flex justify-content-center">
      <Card className="align-self-center p-3 m-1">
        <Col>
          <Form noValidate validated={validated}>
            <h3>Register for Paradise Flix</h3>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" 
              placeholder="Enter username" 
              value={username}
              autoComplete="username"
              onChange={e => setUsername(e.target.value)} 
              pattern='[a-zA-Z0-9]{5,}'
              minLength="5" required />
              <Form.Control.Feedback type='invalid'>Enter a Username with at least 5 alphanumeric characters</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" 
              placeholder="Enter password" 
              value={password}
              autoComplete="password"
              onChange={e => setPassword(e.target.value)} 
              minLength="5" required />
              <Form.Control.Feedback type='invalid'>Enter a password with at least 5 characters</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="FormEmail">
              <Form.Label>Email:</Form.Label>
              <Form.Control type="email" 
              placeholder="Enter email" 
              value={email}
              autoComplete="email"
              onChange={e => setEmail(e.target.value)} required />
              <Form.Control.Feedback type='invalid'>Please enter a valid email address.</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday:</Form.Label>
              <Form.Control type="date" 
              value={birthday} 
              onChange={e => setBirthday(e.target.value)} />
              <Form.Control.Feedback type='invalid'>Please enter a valid birthday.</Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>Register</Button>
            <hr />
            <p>Already have an account?</p>
            <Link to="/">
                <Button variant="info" type="button">Login</Button>
            </Link><br />
          </Form>
        </Col>
      </Card>
    </Row>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.number
  })
};