const setPlayerConnectDiv = () => {
    const playerConnectDiv = document.getElementById('playerConnect')!;
    playerConnectDiv.style.position = "absolute";
    playerConnectDiv.style.left = "50%"
    playerConnectDiv.style.top = "5%";
    playerConnectDiv.style.transform = "translate(-50%, -5%)";
}

const setConsole = () => {
    const consoleDiv = document.getElementById('consoleDiv')!;
    consoleDiv.style.position = "absolute";
    consoleDiv.style.left = "3%";
    consoleDiv.style.bottom = "3%";
    consoleDiv.style.transform = "translate(-3%, 3%)";
    consoleDiv.style.backgroundColor = "black";
    consoleDiv.style.opacity = "0.2";
    consoleDiv.style.width = "25%";
    consoleDiv.style.height = "20%";
    console.log('Created console');
}

const setHtmlElements = () => {
    setConsole();
    setPlayerConnectDiv();
}

export default setHtmlElements;