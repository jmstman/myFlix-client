import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Navbar } from 'react-bootstrap'
import Col from 'react-bootstrap/Col';
import axios from 'axios';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthdate);
    props.onRegister(username);
  }

  return (
    <form className="reg-form">
      <label className="reginput">
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label className="reginput">
        Password:
      <input type="text" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label className="reginput">
        Email:
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label className="reginput">
        Birthday:
      <input type="text" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <span>
        <button type='button' onClick={handleSubmit}>Submit</button>
        <button onClick={() => { onBackClick(null); }}>Back</button>
      </span>
    </form>
  )
}

RegistrationView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onRegisterIn: PropTypes.func.isRequired,
};