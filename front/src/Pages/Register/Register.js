import './Register.css'
import { register } from '../../User/UserManagement';
import { useState } from 'react';

const Register = props => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordC, setPasswordC] = useState('');

  function checkDigit(str) {
    let num = "0123456789";

    for (let i = 0; i < str.length; i++) {
      for (let j = 0; j < num.length; j++) {
        if (num[j] === str[i]) {
          return true;
        }
      }
    }
    return false;
  }

  function checkErrors() {
    let error = "";
    if (email === "") {
      error = error + "Please fill in a email\n"
    }
    if (username.includes(" ") === true) {
      error = error + "The username must not contain spaces\n"
    }
    if (username === "") {
      error = error + "Please fill in a username\n"
    }
    if (password === "" || password.length < 8) {
      error = error + "Password too short \n"
    } else if (checkDigit(password) === false) {
      error = error + "Need digit in the password\n"
    }
    if (password !== passwordC) {
      error = error + "The password are not the same\n";
    }
    if (error !== "") {
      alert(error);
      return true
    }
    return false
  }

  const handleSubmit = () => {
    if (checkErrors() === true) {
      return;
    }
    register(email, username, password)
    .then(() => {
      window.location = "/login"
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div class="background-page">
        <div class="wrapper-register">
          <div></div>
          <div class="bloc-register">
            <p class="title-register">REGISTER</p>
            <input class="input-auth" type="text" id="email" name="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/><br/>
            <input class="input-auth" type="text" id="username" name="username" placeholder="Username (15 caractères maximun)" maxLength="15" onChange={event => setUsername(event.target.value)}/><br/>
            <input class="input-auth" type="password" id="password" name="password" placeholder="Password (8 caractères minimum)" minLength="8" onChange={event => setPassword(event.target.value)}/><br/>
            <input class="input-auth" type="password" id="passwordC" name="passwordC" placeholder="Confirmation password" onChange={event => setPasswordC(event.target.value)}/><br/>
            <button class="input-confirm" type="button" onClick={handleSubmit}>Confirm</button><br/>
            <div id="link"><a href="/login">Déjà enregistré</a></div>
          </div>
          <div></div>
        </div>
    </div>
  );
};
 
export default Register;