import './ForgotPassword.css'
import { useState } from 'react';
import { verifyEmail } from '../../User/UserManagement'

const VerifyEmail = props => {
    const [emailC, setEmailC] = useState('');

    const handleSubmit = () => {
      verifyEmail(emailC)
      .then(() => {
        window.location = "/new_password";
      }).catch(error => {
        console.log(error);
      })
    }

  return (
    <div class="background-page">
      <div class="wrapper-forgotpassword"> 
        <div></div>
        <div class="bloc-login">
          <p class="title-register">Verify your email</p>
          <input class="input-auth" type="text" id="email" name="email" placeholder="Confirm your email" onChange={event => setEmailC(event.target.value)}/><br/>       
          <button class="input-confirm" type="button" onClick={handleSubmit}>Confirm</button><br/>
        </div>
        <div></div>
      </div>    
    </div>
  );
};
 
export default VerifyEmail;