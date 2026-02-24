document.getElementById("togglePass").onclick = function() {
  const input = document.getElementById("password");
  const icon = this.querySelector("i");
  if (input.type === "password") {
    input.type = "text";
    icon.classList.replace("fa-eye-slash","fa-eye");
  } else {
    input.type = "password";
    icon.classList.replace("fa-eye","fa-eye-slash");
  }
};
document.getElementById("registrationForm").onsubmit = function(e) {
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let user = document.getElementById("username").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let email = document.getElementById("email").value.trim();
  let pass = document.getElementById("password").value.trim();
  let valid = true;
  if (!name) { document.getElementById("errName").style.display = "block"; valid=false; }
  else document.getElementById("errName").style.display = "none";
  if (!user) { document.getElementById("errUser").style.display = "block"; valid=false; }
  else document.getElementById("errUser").style.display = "none";
  if (!phone || phone.length < 10) { document.getElementById("errPhone").style.display = "block"; valid=false; }
  else document.getElementById("errPhone").style.display = "none";
  if (!email.includes("@")) { document.getElementById("errEmail").style.display = "block"; valid=false; }
  else document.getElementById("errEmail").style.display = "none";
  if (pass.length < 6) { document.getElementById("errPass").style.display = "block"; valid=false; }
  else document.getElementById("errPass").style.display = "none";
  if (!valid) return;
  localStorage.setItem("userFullName", name);
  window.location.href = "Dashboard.html";
}
