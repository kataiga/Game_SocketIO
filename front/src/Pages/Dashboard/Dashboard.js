import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Dashboard() {
  const navigate = useNavigate()

  const files = [
    "avatars/avatar-m1.png",
    "avatars/avatar-m2.png",
    "avatars/avatar-m3.png",
    "avatars/avatar-w1.png",
    "avatars/avatar-w2.png",
    "avatars/avatar-w3.png",
  ];
  const [posChar, setPosChar] = useState(0);

  if (!localStorage.getItem("sessionToken")) {
    window.location = "/login";
  }

  const changeLanguage = (val) => {
    if (val === "") {
      return;
    }
    const jsonData = require("../../languages.json");
    console.log(jsonData);
  };

  const changeCharacter = (val) => {
    if (val === "") {
      return;
    }
    localStorage.setItem("model", val);
  };

  const choseCharacter = (pos) => {
    let charButtonBack = document.getElementById("character-" + posChar);
    charButtonBack.style.borderStyle = "unset";
    let charButtonNext = document.getElementById("character-" + pos);
    charButtonNext.style.borderStyle = "inset";
    setPosChar(pos);
  };

  const disconnect = () => {
    localStorage.removeItem("sessionToken");
    navigate('/login');
  };

  const startGame = () => {
    navigate('/game');
  };
  return (
    <div class="background-page">
      <div class="wrapper-header-dashboard">
        <div>
          <Link to="/profile">
            <img src="icon-profil.png" alt="Profile icon" width="50" />
          </Link>
        </div>
        <div>
          <select
            id="select-language"
            onChange={(event) => changeLanguage(event.target.value)}
          >
            <option value="en">En</option>
            <option value="fr">Fr</option>
          </select>
        </div>
        <div>
          <p class="Title-Dashboard">Dashboard</p>
        </div>
        <div>
          <button class="ls-2" onClick={startGame}>
            START
          </button>
        </div>
        <div>
          <button class="button-logout" type="button" onClick={disconnect}>
            Log out
          </button>
        </div>
      </div>
      <div class="wrapper-body-dashboard">
        <div></div>
        <div id="cac-bloc">
          <h2>Choose a character</h2>
          {/* <div>
                {files.map((name, pos) =>
                  <button autofocus class="charSelect" id={'character-'+pos} onClick={event => choseCharacter(pos)}><img src={name} alt="avatar" width="150"/></button>
                )}
              </div> */}
          <select
            id="select-character"
            onChange={(event) => changeCharacter(event.target.value)}
            defaultValue={localStorage.getItem('model') || 'futaba'}
          >
            <option value="futaba">Futaba</option>
            <option value="kakashi">Kakashi</option>
            <option value="lara">Lara Croft</option>
            <option value="vegas">Vegas</option>
            <option value="yakuza">Yakuza</option>
          </select>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default Dashboard;
