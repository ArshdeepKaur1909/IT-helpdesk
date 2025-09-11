function changeTab(selectedTab) {
    document.querySelectorAll('.tab-link').forEach(tab => tab.classList.remove('active'));
    selectedTab.classList.add('active');
}


document.addEventListener('click', function (event) {
    const dropdownToggle = event.target.closest('.dropdown-toggle');

    if (!dropdownToggle) {
        document.querySelectorAll('.dropdown-wrapper.open').forEach(dropdown => {
            dropdown.classList.remove('open');
        });
        return;
    }

    const currentWrapper = dropdownToggle.closest('.dropdown-wrapper');
    const isOpen = currentWrapper.classList.contains('open');

    document.querySelectorAll('.dropdown-wrapper.open').forEach(dropdown => {
        dropdown.classList.remove('open');
    });

    if (!isOpen) {
        currentWrapper.classList.add('open');
    }
});


const timezoneMenu = document.getElementById('timezone-menu');
const timezoneValue = document.getElementById('timezone-value');

timezoneMenu.addEventListener('click', function (event) {
    if (event.target.tagName === 'LI') {
        timezoneValue.textContent = event.target.textContent;


    }
});