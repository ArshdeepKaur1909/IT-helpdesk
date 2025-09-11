const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('active');
});

const toggles = document.querySelectorAll('.dropdown-toggle');

toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const dropdown = toggle.nextElementSibling;
        const arrow = toggle.querySelector('.arrow');

        if (dropdown.style.display === "block" || dropdown.style.display === "") {
          dropdown.style.display = "none";
          toggle.classList.remove("rotate");
        } else {
          dropdown.style.display = "block";
          toggle.classList.add("rotate");
        }
    });
});