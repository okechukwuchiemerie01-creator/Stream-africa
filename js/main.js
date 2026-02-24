// main.js
// Contains initialization logic for animations, navbar behaviour, sticky button
// and popup notifications.

$(document).ready(function() {
    // Initialize AOS Animation
    AOS.init({
        once: true,
        offset: 50,
        duration: 1000
    });

    // Navbar & Sticky Button Scroll Logic
    $(window).scroll(function() {
        var scrollTop = $(this).scrollTop();
        var windowHeight = $(window).height();
        var heroHeight = $('#hero-section').outerHeight();
        var footerOffset = $('footer').offset().top;

        // 1. Header Glassmorphism
        if (scrollTop > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
        
        // 2. Mobile Sticky Signup Button Visibility
        var $btn = $('#mobile-sticky-signup');
        
        if (scrollTop > heroHeight - 100) { 
            $btn.addClass('show-sticky');
        } else {
            $btn.removeClass('show-sticky');
        }

        if (scrollTop + windowHeight > footerOffset) {
            var overlap = (scrollTop + windowHeight) - footerOffset;
            $btn.css('bottom', (30 + overlap) + 'px');
        } else {
            $btn.css('bottom', '30px');
        }
    });
});

const popup = document.getElementById('popup-container');

// --- Multi-user frontend session management ---
function generateUUID() {
  // Simple UUID generator for session
  return 'xxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getCurrentUser() {
  let userId = localStorage.getItem('streamUserId');
  if (!userId) {
    userId = generateUUID();
    localStorage.setItem('streamUserId', userId);
    // Optionally, ask for user info or randomize
    const defaultUser = {
      id: userId,
      name: 'User_' + userId.slice(0, 5),
      city: 'Unknown',
      flag: '🌍',
      currency: '₦',
      created: Date.now()
    };
    localStorage.setItem('streamUserData_' + userId, JSON.stringify(defaultUser));
    return defaultUser;
  }
  const userData = localStorage.getItem('streamUserData_' + userId);
  return userData ? JSON.parse(userData) : null;
}

function setCurrentUserData(data) {
  const userId = localStorage.getItem('streamUserId');
  if (userId) {
    localStorage.setItem('streamUserData_' + userId, JSON.stringify(data));
  }
}

// Example: allow user to update their info
window.updateStreamUser = function(name, city, flag, currency) {
  const user = getCurrentUser();
  user.name = name || user.name;
  user.city = city || user.city;
  user.flag = flag || user.flag;
  user.currency = currency || user.currency;
  setCurrentUserData(user);
}

// --- Popup logic now uses session user ---
function showPopup() {
  const user = getCurrentUser();

  const activities = [
    { text: "just withdrew", detail: `EARNINGS — ${user.currency}${Math.floor(Math.random() * 5000) + 1000}` },
    { text: "activated plan:", detail: "STREAM PREMIUM GOLD" },
    { text: "just subscribed to", detail: `STREAM AFRICA — ${user.currency}${Math.floor(Math.random() * 2000) + 500}` }
  ];

  const act = activities[Math.floor(Math.random() * activities.length)];

  document.getElementById('user-flag').innerText = user.flag;
  document.getElementById('user-name').innerText = user.name;
  document.getElementById('user-location').innerText = user.city;
  document.getElementById('user-action').innerText = act.text;
  document.getElementById('activity-detail').innerText = act.detail;
  document.getElementById('time-ago').innerText =
    `${Math.floor(Math.random() * 45) + 1} mins ago`;

  popup.classList.remove('popup-hidden');
  popup.classList.add('popup-visible');

  setTimeout(() => {
    popup.classList.remove('popup-visible');
    popup.classList.add('popup-hidden');
  }, 5000);
}

setInterval(showPopup, 10000);
setTimeout(showPopup, 2000);
