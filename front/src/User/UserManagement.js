const dev = "https://wam.doggo-saloon.net:3030";
const prod = "https://wam.doggo-saloon.net:3030";

export async function login(email, password) {
  console.log("LOGIN");
  const response = await fetch(prod + "/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  });
  if (!response.ok) {
    alert("Login failed: " + JSON.stringify(response.status));
    throw new Error("Login Request Failed");
  }
  const data = await response.json();
  console.log(data);
  localStorage.setItem("sessionToken", data.token);
  localStorage.setItem("username", data.username);
  localStorage.setItem("id", data.id);
  localStorage.setItem("model", "yzakuza");
}

export async function register(email, username, password) {
  const response = await fetch(prod + "/api/auth/register", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      username: username,
      password: password,
    }),
  });
  if (!response.ok) {
    alert("Register failed: " + JSON.stringify(response.status));
    throw new Error("Register Request Failed");
  }
  const data = await response.json();
  return data;
}

export async function saveProfile(email, username, password, avatar) {
  const response = await fetch(prod + "/jobboard/profile", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Email: email,
      Username: username,
      Password: password,
      Avatar: avatar,
    }),
  });
  if (!response.ok) {
    alert("save Profile failed: " + JSON.stringify(response.status));
    throw new Error("Save Profile Request Failed");
  }
  const data = await response.json();
  return data;
}

export async function verifyEmail(email) {
  const response = await fetch(prod + "/api/xxxxx", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email }),
  });
  if (!response.ok) {
    alert("VerifyEmail failed: " + JSON.stringify(response.status));
    throw new Error("VerifyEmail request Failed");
  }
  const data = await response.json();
  return data;
}

export async function saveNewPassword(password) {
  const response = await fetch(prod + "/api/xxxxx", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password }),
  });
  if (!response.ok) {
    alert("SaveNewPassword failed: " + JSON.stringify(response.status));
    throw new Error("SaveNewPassword request Failed");
  }
  const data = await response.json();
  return data;
}

export async function getProfile() {
  const response = await fetch(prod + "/jobboard/advertisements", {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin": "https://wam.doggo-saloon.net:3000/",
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    alert("Recup_ads failed: " + JSON.stringify(response.status));
    throw new Error("Recup_ads request Failed");
  }
  const data = await response.json();
  return data;
}
