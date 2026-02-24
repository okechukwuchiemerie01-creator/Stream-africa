let time = 600;
const display = document.getElementById('countdown');
setInterval(() => {
  let minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? '0' + seconds : seconds;
  display.innerHTML = `${minutes}:${seconds}`;
  if (time > 0) time--;
}, 1000);
function copyText(id) {
  const text = document.getElementById(id).innerText;
  navigator.clipboard.writeText(text);
  const toast = document.getElementById("toast");
  toast.className = "show";
  setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}
function closeModal() {
  document.getElementById('warningModal').style.display = 'none';
}
