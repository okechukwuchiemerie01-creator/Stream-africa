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

// Realistic names and cities for popup users
const randomNames = [
"Chinedu","Emeka","Ifeanyi","Uche","Chukwuemeka","Obinna","Ikenna","Somto","Chibuzo","Chijioke",
"Oluwaseun","Oluwafemi","Oluwatobi","Oluwaseyi","Oluwadamilola","Oluwatosin","Oluwajomiloju","Oluwafunmilayo","Oluwaseyi","Oluwatoyin",
"Abdullahi","Sadiq","Musa","Ibrahim","Usman","Yusuf","Suleiman","Kabiru","Aminu","Bashir",
"Tunde","Kunle","Sola","Femi","Dele","Bayo","Segun","Yemi","Ayo","Bamidele",
"Chiamaka","Ngozi","Chioma","Nkechi","Adaeze","Amaka","Ifunanya","Chidinma","Somtochukwu","Uchechi",
"Temitope","Tosin","Kehinde","Taiwo","Yetunde","Funmi","Bolanle","Bukola","Ronke","Sade",
"Aisha","Zainab","Fatima","Maryam","Hauwa","Khadija","Rukayya","Amina","Safiya","Habiba",
"Blessing","Precious","Joy","Peace","Favour","Divine","Grace","Miracle","Mercy","Faith",
"Emmanuel","Samuel","David","Daniel","Michael","Joshua","Paul","Peter","Victor","Kingsley"
];
const randomCities = [
"Lagos","Abuja","Ibadan","Port Harcourt","Benin City","Owerri","Aba","Enugu","Onitsha","Awka",
"Uyo","Calabar","Warri","Asaba","Yenagoa","Makurdi","Jos","Kaduna","Kano","Zaria",
"Sokoto","Katsina","Gusau","Birnin Kebbi","Minna","Ilorin","Lokoja","Akure","Ado Ekiti","Osogbo",
"Abeokuta","Ijebu Ode","Ogbomoso","Sapele","Ughelli","Okene","Nsukka","Abakaliki","Eket","Ikot Ekpene",
"Badagry","Epe","Ikorodu","Surulere","Yaba","Festac","Lekki","Ajah","Maryland","Ikeja",
"Maiduguri","Damaturu","Gombe","Bauchi","Yola","Jalingo","Lafia","Keffi","Gboko","Otukpo"
];

// --- Multi-user frontend session management (kept for potential profile use) ---
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
    // Create a new user with random name and city
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const city = randomCities[Math.floor(Math.random() * randomCities.length)];
    const defaultUser = {
      id: userId,
      name: name,
      city: city,
      flag: "🌍",
      currency: "₦",
      created: Date.now()
    };
    localStorage.setItem('streamUserData_' + userId, JSON.stringify(defaultUser));
    return defaultUser;
  }
  
  const userData = localStorage.getItem('streamUserData_' + userId);
  let user = userData ? JSON.parse(userData) : null;
  
  // If no user data exists (shouldn't happen), create new
  if (!user) {
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const city = randomCities[Math.floor(Math.random() * randomCities.length)];
    user = {
      id: userId,
      name: name,
      city: city,
      flag: "🌍",
      currency: "₦",
      created: Date.now()
    };
    localStorage.setItem('streamUserData_' + userId, JSON.stringify(user));
    return user;
  }
  
  // If user data is from the old format (User_xxxx or Unknown), upgrade it
  if (user.name.startsWith('User_') || user.city === 'Unknown') {
    const name = randomNames[Math.floor(Math.random() * randomNames.length)];
    const city = randomCities[Math.floor(Math.random() * randomCities.length)];
    user.name = name;
    user.city = city;
    // Ensure flag and currency are set (they might be missing in very old data)
    user.flag = user.flag || "🌍";
    user.currency = user.currency || "₦";
    // Save upgraded user back to localStorage
    localStorage.setItem('streamUserData_' + userId, JSON.stringify(user));
  }
  
  return user;
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

// --- Popup logic now uses a random user each time ---
function showPopup() {
  // Generate a random user for this popup (ignores stored session user)
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
  const randomCity = randomCities[Math.floor(Math.random() * randomCities.length)];
  const user = {
    flag: "🌍",
    currency: "₦",
    name: randomName,
    city: randomCity
  };

  // Generate realistic withdrawal amount between ₦20,000 and ₦200,000
  const withdrawalAmount = Math.floor(Math.random() * (200000 - 20000 + 1)) + 20000;

  const activities = [
    { text: "just withdrew", detail: `EARNINGS — ${user.currency}${withdrawalAmount.toLocaleString()}` },
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