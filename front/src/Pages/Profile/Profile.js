import './Profile.css';
import { useState } from 'react';
import ModifyAvatar from '../../Components/Popup/ModifyAvatar'
import { saveProfile } from '../../User/UserManagement';
import { Link } from "react-router-dom";

function Profile() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModifyAvatar, setIsModifyAvatar] = useState(false);
  const [nameFile, setNameFile ] = useState("icon-profil.png")

  const toggleModifyAvatarPopup = () => {
    setIsModifyAvatar(!isModifyAvatar);
  }
  
  const handleSubmit = () => {
    saveProfile(email, username, password, nameFile)
    .then(() => {
      window.location = "/dashboard"
    }).catch(error => {
      console.log(error);
    })
  }

  return (
    <div class="background-page">
      <Link to="/dashboard">
        <button class="back">Back</button><br/>
      </Link>
      <div class="wrapper-profile">
        <div></div>
        <div class="bloc-profile">
          <p class="title-register">Profile</p>
          <div class="wrapper-in-profile">
              <div>
                <img src={nameFile} alt="icon-profil" width="200"/>
                <button class="button-logout" onClick={toggleModifyAvatarPopup}>Modify</button><br/>
                {isModifyAvatar && <ModifyAvatar
                  content={<>
                  </>}
                  handleCloseAvatars={toggleModifyAvatarPopup}
                  setNameFile={setNameFile}
                />}
              </div>
              <div class="bloc-input-profile">
                <input class="input-profile" type="text" id="email" name="email" placeholder="Email" onChange={event => setEmail(event.target.value)}/><br/>
                <input class="input-profile" type="text" id="username" name="username" placeholder="Username (15 caractères maximun)" maxLength="15" onChange={event => setUsername(event.target.value)}/><br/>
                <input class="input-profile" type="text" id="password" name="password" placeholder="Password (8 caractères minimum)" minLength="8" onChange={event => setPassword(event.target.value)}/><br/>
              </div>
          </div>
          <button class="input-confirm" type="button" onClick={handleSubmit}>Save</button><br/>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Profile;