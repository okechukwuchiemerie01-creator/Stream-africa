function login(){
  window.location.href = "login.html";
}

function togglePass(){
  const p = document.getElementById("pass");
  p.type = p.type === "password" ? "text" : "password";
}
