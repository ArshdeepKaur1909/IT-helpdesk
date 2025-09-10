/***********************
 * USER LOGIN VARIABLES
 ***********************/
(function () {
  const fallback = { name: "Logan Ringland", logoUrl: "" };
  const user = window.USER || JSON.parse(localStorage.getItem("USER")) || fallback;

  const nameEl = document.getElementById("userName");
  const logoImg = document.getElementById("userLogoImg");
  const avatar = document.getElementById("userAvatar");
  const companyLogo = document.getElementById("companyLogo");

  // Company logo (server can provide COMPANY_LOGO)
  if (window.COMPANY_LOGO) {
    companyLogo.src = window.COMPANY_LOGO;
  } else {
    companyLogo.src = "../images/logo2.png"; // default logo
  }

  // User name
  nameEl.textContent = user.name || "";

  // Show logo or initials
  if (user.logoUrl) {
    logoImg.src = user.logoUrl;
    logoImg.classList.remove("d-none");
    avatar.classList.add("d-none");
  } else {
    const initials = (user.name || "")
      .split(" ")
      .map((s) => s[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    avatar.textContent = initials || "U";
    avatar.classList.remove("d-none");
    logoImg.classList.add("d-none");
  }
})();

/***********************
 * TAB HANDLING
 ***********************/

// Highlight active top-tabs
document.querySelectorAll(".top-tabs .nav-link").forEach((tab) => {
  tab.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".top-tabs .nav-link").forEach((t) =>
      t.classList.remove("active")
    );
    tab.classList.add("active");
  });
});

// Highlight active lower-pills
document.querySelectorAll(".lower-pills .nav-link").forEach((pill) => {
  pill.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".lower-pills .nav-link").forEach((p) =>
      p.classList.remove("active")
    );
    pill.classList.add("active");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const listView = document.getElementById("listView");
  const gridView = document.getElementById("gridView");

  listView.addEventListener("change", () => {
    if (listView.checked) {
      console.log("List view active");
      // apply list layout
    }
  });

  gridView.addEventListener("change", () => {
    if (gridView.checked) {
      console.log("Grid view active");
      // apply grid layout
    }
  });
});



/***********************
 * ACTION BUTTONS
 ***********************/
document.getElementById("inviteBtn").addEventListener("click", () => {
  alert("Invite all clicked");
});
document.getElementById("sortBtn").addEventListener("click", () => {
  alert("Sort clicked");
});
document.getElementById("filtersBtn").addEventListener("click", () => {
  alert("Filters clicked");
});
