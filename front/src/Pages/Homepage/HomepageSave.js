import './Homepage.css'
import { Link } from "react-router-dom";

function Homepage() {
  return (
    <div>
      <div id="homepage-b1">
        <div>
          <p id="title-homepage">WAM</p>
        </div>
        <Link to="/register">
          <button id="register-home"type="button">S'enregistrer</button>
        </Link>
      </div>
      <div id="homepage-b2">
        <p id="description">Une expérience en 3D sur navigateur !</p>
        <p id="description">Amusez vous entre amis ou rencontrez d'autres personnes !</p>
        <p id="description">Discutez de ce que vous voulez !</p>
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