import './Homepage.css'
import { Link, useNavigate } from "react-router-dom";

function Homepage() {
  const navigation = useNavigate();
  console.log('gome');
  const redirectStart = () => {
    if (localStorage.getItem("sessionToken")) {
      navigation('/dashboard');
    } else {
      navigation('/register');
    }
  }

  return (
    <div id="homepage-b1">
      <div class="homepage-navbar">
        <div class="img-wam">
            <img src="Logo-Wam.png" alt="logo-wam" width="125" />
        </div>
        <div class="container-navbar">
          <Link to="/login">
            <button class="lr" id="lr-login">LOGIN</button>
          </Link>
          <button onClick={redirectStart} class="ls">START</button>
          <Link to="/register">
            <button class="lr" id="lr-register">REGISTER</button>
          </Link>
        </div>
        <div></div>
      </div>
      <div class="homepage-bloc-1">
        <div class="container-description-bloc-1">
          <div class="description-1">
            <p id="description-text">A new experience <br/> in 3D on navigator</p>
          </div>
          <div></div>
          <div class="description-2">
            <p id="description-text">Have fun between people <br/> and talk about what you want</p>
          </div>
        </div>
      </div>
      <div id="homepage-b1">
        <div class="wrapper-profil">
          <div id="profil">
            <img src="cyril.douchet.jpg" alt="Cyril Douchet"/>
            <p>Cyril Douchet, développeur</p>
          </div>
          <div id="profil">
            <img src="alexandre.schone.jpg" alt="Alexandre Schone"/>
            <p>Alexandre Schone, développeur</p>
          </div>
          <div id="profil">
            <img src="florent.belle.jpg" alt="Florent Belle"/>
            <p>Florent Belle, développeur</p>
          </div>
          <div id="profil">
            <img src="meir.belaich.jpg" alt="Meir Belaich"/>
            <p>Meir Belaich, développeur</p>
          </div>
          <div id="profil">
            <img src="johan.gaudisson.jpg" alt="Johan Gaudisson"/>
            <p>Johan Gaudisson, développeur</p>
          </div>
        </div>
        <img class="logo-epitech" src="logo-epitech.png" alt="Logo-Epitech" width="250"/>
      </div>
    </div>
  );
}

export default Homepage;