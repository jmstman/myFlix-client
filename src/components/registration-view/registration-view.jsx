import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegister(username);
  }

  return (
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="text" onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="formBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="text" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <Button variant="primary mr-1" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
      <Button variant="outline-primary" onClick={props.toggleRegister}>Back</Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onRegisterIn: PropTypes.func.isRequired,
};