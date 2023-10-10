let settingsOpen = false;

const themeArray = ["red", "green", "blue", "purple", "turquoise", "orange"];

function hiddenSettings() {
  const settingsElement = document.querySelector(".settings");
  settingsElement.classList.add("settings--hidden");
}

function popupSettings() {
  const settingsElement = document.querySelector(".settings");
  const settingsButton = document.querySelector("#settings-btn");
  settingsButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (settingsOpen) {
      settingsElement.classList.add("settings--hidden");
      settingsOpen = false;
    } else {
      settingsElement.classList.remove("settings--hidden");
      settingsOpen = true;
    }
  });
}

function closePopup() {
  const closePopupsettings = document.querySelector(".settings__close");
  closePopupsettings.addEventListener("click", (e) => {
    e.preventDefault();
    settingsOpen = false;
    const settingsElement = document.querySelector(".settings");
    settingsElement.classList.add("settings--hidden");
  });
}

function theme() {
  for (let i = 0; i < themeArray.length; i++) {
    const theme = document.querySelector(`#theme-${themeArray[i]}`);
    theme.addEventListener("click", () => {
      let root = document.documentElement;
      root.style.setProperty(
        "--color-main",
        `var(--theme-${themeArray[i]}-main)`
      );
      root.style.setProperty(
        "--color-alt",
        `var(--theme-${themeArray[i]}-alt)`
      );
    });
  }
}

function darkMode() {
  const dark = document.querySelector(`#theme-switch`);
  dark.addEventListener("click", () => {
    const root = document.documentElement;
    root.classList.toggle("theme-dark");
    const icones = document.querySelectorAll(".menu__item i");
    const svg = document.querySelectorAll(".menu__item svg");
    icones.forEach((element) => {
      element.classList.toggle("darkmode");
    });
    svg.forEach((element) => {
      element.classList.toggle("svg-white");
    });
  });
}

const root = document.documentElement;
root.classList.toggle("theme-dark");

hiddenSettings();
popupSettings();
closePopup();
theme();
darkMode();
