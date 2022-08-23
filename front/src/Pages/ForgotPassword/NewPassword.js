import './ForgotPassword.css'
import { useState } from 'react';
import { saveNewPassword } from '../../User/UserManagement';

const VerifyEmail = props => {
    const [password, setPassword] = useState('');
    const [passwordC, setPasswordC] = useState('');

    const handleSubmit = () => {
        saveNewPassword(password)
        .then(() => {
          window.location = "/login"
        }).catch(error => {
          console.log(error);
        })
    }

  return (
    <div class="background-page">
      <div class="wrapper-login"> 
        <div></div>
        <div class="bloc-login">
          <p class="title-register">Write a new password</p>
          <input class="input-auth" type="text" id="email" name="email" placeholder="Set a new password" onChange={event => setPassword(event.target.value)}/><br/>
          <input class="input-auth" type="text" id="email" name="email" placeholder="Confirm your new password" onChange={event => setPasswordC(event.target.value)}/><br/>
          <button class="input-confirm" type="button" onClick={handleSubmit}>Confirm</button><br/>
        </div>
        <div></div>
      </div>    
    </div>
  );
};
 
export default VerifyEmail;