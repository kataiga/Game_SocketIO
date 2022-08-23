import { useEffect } from "react";

function Game() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./bundle.js";
    script.async = true;
    document.body.appendChild(script);
    console.warn("built game page");
    return () => {
      // const emote = document.getElementById("emote");
      // while (emote.lastElementChild) {
      //   emote.removeChild(emote.lastElementChild);
      // }
      // const game = document.getElementById("game");
      // while (game.lastElementChild) {
      //   game.removeChild(game.lastElementChild);
      // }
      // const playerConnect = document.getElementById("playerConnect");
      // while (playerConnect.lastElementChild) {
      //   playerConnect.removeChild(playerConnect.lastElementChild);
      // }
      // const consoleDiv = document.getElementById("consoleDiv");
      // while (consoleDiv.lastElementChild) {
      //   consoleDiv.removeChild(consoleDiv.lastElementChild);
      // }
      window.location.reload();
      console.log("close game");
    };
  }, []);

  return (
    <div>
      {/* <script src="./bundle.js"></script> */}
      {/* <script async="true" src="./bundle.js"></script> */}
    </div>
  );
}

export default Game;
