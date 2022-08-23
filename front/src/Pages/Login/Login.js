import './Login.css'
import { login } from '../../User/UserManagement';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Login = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
     

    const handleSubmit = () => {
      login(email, password)
      .then(() => {
        navigate('/dashboard');
      }).catch(error => {
        console.log(error);
      })
    }

  return (
    <div class="background-page">
      <div class="wrapper-login"> 
        <div></div>
        <div class="bloc-login">
          <p class="title-register">LOGIN</p>
          <input class="input-auth" type="text" id="email" name="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/><br/>
          <input class="input-auth" type="password" id="password" name="password" placeholder="Password" onChange={event => setPassword(event.target.value)}/><br/>
          <button class="input-confirm" type="button" onClick={handleSubmit}>Confirm</button><br/>
          <div id="link"><a href="/register">S'enregistrer</a></div>
          <div id="link">
            <Link to="/verify_email">
              <button class="href-button" type="button"><u>Forgot password</u></button>
            </Link>
          </div>
        </div>
        <div></div>
      </div>    
    </div>
  );
};
 
export default Login;