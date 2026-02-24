// Balance Visibility Toggle
const toggleEye = document.getElementById('toggleEye');
const balances = document.querySelectorAll('.balance-text');
let isHidden = false;
toggleEye.addEventListener('click', function() {
  isHidden = !isHidden;
  balances.forEach(el => { el.innerText = isHidden ? '****' : el.getAttribute('data-value'); });
  toggleEye.classList.toggle('fa-eye');
  toggleEye.classList.toggle('fa-eye-slash');
});
function openModal() { document.getElementById("activationModal").style.display = "flex"; }
function closeModal() { document.getElementById("activationModal").style.display = "none"; }
function openHistory() { document.getElementById("historyModal").style.display = "flex"; }
function closeHistory() { document.getElementById("historyModal").style.display = "none"; }
function openSupportChat() { window.location.href = "https://wa.me/+2347061985081?text=Hi%20STREAM_AFRICA"; }

function updateGreeting() {
  const hour = new Date().getHours();
  const greetEl = document.getElementById("greeting");
  const name = localStorage.getItem("userFullName") || "Rapheal";
  document.getElementById("user-display-name").innerText = name;
  if (hour < 12) greetEl.innerText = "Good Morning";
  else if (hour < 18) greetEl.innerText = "Good Afternoon";
  else greetEl.innerText = "Good Evening";
}
updateGreeting();

const name = localStorage.getItem("userFullName") || "Streamer";
document.getElementById("user-display-name").innerText = name;

const influencers = [
  { name: "Peller", img: "images/peller.jpg", phrases: ["Join Peller live on Kick earn ₦15,000", "Peller is live now! Join him and earn big", "Don't miss Peller on Kick - ₦15,000 waiting", "Watch Peller now and claim your stream reward", "Peller is breaking records!", "Earn ₦15,000 instantly watching Peller live"] },
  { name: "Carter Efe", img: "images/Carter Efe.jpg", phrases: ["Join Carter Efe on Twitch and earn also!!", "Carter Efe is live now! Join him", "Watch Carter Efe live and boost your earnings", "Carter Efe collaboration is active!", "Join the Machala king on Twitch right now"] }
];
let curIdx = 0;
function showNextNotification() {
  const notifEl = document.getElementById("dynamicNotif");
  const person = influencers[curIdx];
  const phrase = person.phrases[Math.floor(Math.random() * person.phrases.length)];
  document.getElementById("notifName").innerText = person.name;
  document.getElementById("notifText").innerText = phrase;
  document.getElementById("notifMedia").innerHTML = `<img src="${person.img}" style="width:100%; height:100%; object-fit:cover;">`;
  notifEl.classList.add("show");
  setTimeout(() => { notifEl.classList.remove("show"); curIdx = (curIdx + 1) % influencers.length; }, 6000);
}
setTimeout(showNextNotification, 2000);
setInterval(showNextNotification, 14000);
