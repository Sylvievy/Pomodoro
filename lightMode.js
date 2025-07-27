let lightMode = localStorage.getItem('lightMode');
const themeToggle = document.getElementById('themeSwitch');

const enableLightMode = () => {
    document.body.classList.add('lightMode');
    localStorage.setItem('lightMode', 'active');
    console.log("Light mode enabled.");
}

const disableLightMode = () => {
    document.body.classList.remove('lightMode');
    localStorage.setItem('lightMode', null);
    console.log("Light mode disabled.");
}

if (lightMode === "active") enableLightMode();

themeSwitch.addEventListener('click', () => {
    lightMode = localStorage.getItem('lightMode');
    lightMode !== "active" ? enableLightMode() : disableLightMode();

});