const nodefetch = require('node-fetch');

async function login(email, password) {
      const response = await nodefetch.fetch("https://wam.doggo-saloon.net:3030/auth/login", {
                  method: "POST",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email: email, password: password})
                  });
      if (!response.ok) {
        alert("Login failed: " + JSON.stringify(response.status));
        throw new Error("Login Request Failed");
      }
      const data = await response.json();
      return "OK";
}

async function register(email, username, password) {
      const response = await nodefetch.fetch("https://wam.doggo-saloon.net:3030/auth/register", {
                  method: "POST",
                  headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({email: email, username: username, password: password})
              });
      if (!response.ok) {
        alert("Register failed: " + JSON.stringify(response.status));
        throw new Error("Register Request Failed");
      }
      const data = await response.json();
      return data;
}

module.exports = { login, register };