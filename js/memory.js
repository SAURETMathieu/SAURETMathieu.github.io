const app = {
  cardSound: new Audio("./son/carte.mp3"),
  cardMixSound: new Audio("./son/melangercarte.mp3"),
  successSound: new Audio("./son/succes.mp3"),
  winSound: new Audio("./son/applause.mp3"),
  rectos: [],
  number: 30,
  nbCardReturn: 0,
  randomNb: 0,
  try: 0,
  nbFind: 10,
  fruits: [
    "../image/memory/ananas.jpeg",
    "../image/memory/banane.jpeg",
    "../image/memory/carambole.jpeg",
    "../image/memory/cerise.jpeg",
    "../image/memory/citron.jpeg",
    "../image/memory/coco.jpeg",
    "../image/memory/dragon.jpeg",
    "../image/memory/figue.jpeg",
    "../image/memory/fraise.jpeg",
    "../image/memory/framboise.jpeg",
    "../image/memory/grenade.jpeg",
    "../image/memory/groseille.jpeg",
    "../image/memory/kiwi.jpeg",
    "../image/memory/kumquat.jpeg",
    "../image/memory/litchi.jpeg",
    "../image/memory/mangue.jpeg",
    "../image/memory/melon.jpeg",
    "../image/memory/mirabelle.jpeg",
    "../image/memory/mure.jpeg",
    "../image/memory/myrtille.jpeg",
    "../image/memory/noisette.jpeg",
    "../image/memory/noix.jpeg",
    "../image/memory/orange.jpeg",
    "../image/memory/passion.jpeg",
    "../image/memory/pasteque.jpeg",
    "../image/memory/poire.jpeg",
    "../image/memory/pomme.jpeg",
    "../image/memory/raisin.jpeg",
    "../image/memory/raisin2.jpeg",
    "../image/memory/raisin3.jpeg",
  ],
  randomize(tab) {
    let i, j, tmp;
    for (i = tab.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      tmp = tab[i];
      tab[i] = tab[j];
      tab[j] = tmp;
    }
    return tab;
  },
  generateRectos() {
    for (let index = 0; index < app.number / 2; index++) {
      app.rectos.push(index);
      app.rectos.push(index);
    }
    app.fruits = app.randomize(app.fruits);
    app.rectos = app.randomize(app.rectos);
    app.rectos = app.randomize(app.rectos);
  },
  generateVerso(number) {
    const sectionElement = document.querySelector(".container__card");

    for (let index = 0; index < number; index++) {
      const card = document.createElement("div");
      card.classList.add("memory__card");
      card.classList.add("verso");
      sectionElement.appendChild(card);
      const img = document.createElement("img");
      img.src = "../image/memory/verso.png";
      img.style.width = "100%";
      img.style.height = "100%";
      card.appendChild(img);
    }
  },
  clic() {
    const card = document.querySelectorAll(".memory__card");
    const img = document.querySelectorAll(".memory__card img");
    for (let index = 0; index < card.length; index++) {
      card[index].addEventListener("click", () => {
        if (
          !card[index].classList.contains("selected") &&
          !card[index].classList.contains("find") &&
          app.nbCardReturn < 3
        ) {
          app.cardSound.playbackRate = 7;
          app.cardSound.play();
          if (app.nbCardReturn === 2) app.nbCardReturn = 0;
          card[index].classList.toggle("recto");
          card[index].classList.toggle("verso");
          if (app.nbCardReturn < 2) card[index].classList.add("selected");
          if (card[index].classList.contains("verso")) {
            setTimeout(() => {
              img[index].src = "../image/memory/verso.png";
            }, 200);
          } else {
            setTimeout(() => {
              img[index].src = app.fruits[app.rectos[index]];
            }, 200);
          }
          if (app.nbCardReturn < 2) app.nbCardReturn++;
          if (app.nbCardReturn === 2) {
            app.try++;
            const tryButton = document.querySelector(".try");
            tryButton.value = `Tentatives : ${app.try}`;
            card.forEach((element) => {
              element.classList.add("avoid-clicks");
            });
            const returnedCard = document.querySelectorAll(".selected");
            setTimeout(() => {
              if (app.verifyPair()) {
                app.successSound.playbackRate = 2;
                app.successSound.play();
                returnedCard[0].classList.remove("verso");
                returnedCard[1].classList.remove("verso");
                returnedCard[0].classList.remove("recto");
                returnedCard[1].classList.remove("recto");
                returnedCard[0].classList.remove("selected");
                returnedCard[1].classList.remove("selected");
                returnedCard[0].classList.add("find");
                returnedCard[1].classList.add("find");
                app.nbFind++;
              } else {
                setTimeout(() => {
                  const imgSelected = document.querySelectorAll(".recto > img");
                  returnedCard[0].classList.remove("recto");
                  returnedCard[1].classList.remove("recto");
                  returnedCard[0].classList.add("verso");
                  returnedCard[1].classList.add("verso");
                  returnedCard[0].classList.remove("selected");
                  returnedCard[1].classList.remove("selected");
                  setTimeout(() => {
                    imgSelected[0].src = "../image/memory/verso.png";
                    imgSelected[1].src = "../image/memory/verso.png";
                  }, 200);
                  app.cardSound.playbackRate = 7;
                  app.cardSound.play();
                }, 200);
              }
            }, 800);
          }
        }
        setTimeout(() => {
          app.verifyWin();
          card.forEach((element) => {
            element.classList.remove("avoid-clicks");
          });
        }, 2000);
      });
    }
  },
  verifyPair() {
    const returnedCard = document.querySelectorAll(".recto > img");
    if (returnedCard[0].src === returnedCard[1].src) {
      return true;
    } else {
      return false;
    }
  },
  calculSize() {
    const sectionElement = document.querySelector(".container__card");
    const width = sectionElement.clientWidth;
    const card = document.querySelectorAll(".memory__card");
    card.forEach((element) => {
      if (app.number < 11) {
        element.style.width = `${width / 7}px`;
        element.style.height = `${(width / 7) * 1.5}px`;
      } else if (app.number < 21 && app.number > 10) {
        element.style.width = `${width / 8}px`;
        element.style.height = `${(width / 8) * 1.5}px`;
      } else if (app.number < 31 && app.number > 20) {
        element.style.width = `${width / 9}px`;
        element.style.height = `${(width / 9) * 1.5}px`;
      } else if (app.number < 41 && app.number > 30) {
        element.style.width = `${width / 10}px`;
        element.style.height = `${(width / 10) * 1.5}px`;
      } else if (app.number < 51 && app.number > 40) {
        element.style.width = `${width / 11}px`;
        element.style.height = `${(width / 11) * 1.5}px`;
      } else if (app.number < 61 && app.number > 50) {
        element.style.width = `${width / 13}px`;
        element.style.height = `${(width / 13) * 1.5}px`;
      } else {
        element.style.width = "0px";
        element.style.height = "0px";
      }
    });
  },
  runElement() {
    const runButton = document.querySelector(".run");
    runButton.addEventListener("click", () => {
      const nbButton = document.querySelector(".parameters__nb-pairs-input");
      runButton.value = "Re-run";
      app.number = nbButton.value * 2;
      if (app.number < 0) app.number = 0;
      if (app.number > 60) app.number = 60;
      app.cardMixSound.play();
      app.deleteAllElement();
      app.init();
    });
  },
  deleteAllElement() {
    const allCard = document.querySelector(".container__card");
    allCard.innerHTML = `<div class="panel-winning hidden">
      <p class="winning-texte">Bravo vous avez gagné</p>
      <p class="winning-texte t2">Vous avez mi ${app.try} tentatives</p>
      <input class="rerun" type="submit" name="rerun" value="Rejouer" />
      </div>`;
    app.rectos = [];
    app.nbCardReturn = 0;
    app.try = 0;
    app.nbFind = 0;
    const tryButton = document.querySelector(".try");
    tryButton.value = `Tentatives : ${app.try}`;
  },
  verifyWin() {
    if (app.nbFind === app.number / 2) {
      console.log("Gagné");
      const winPanel = document.querySelector(".panel-winning");
      winPanel.classList.remove("hidden");
      const nbTry = document.querySelector(".t2");
      app.winSound.play();
      setTimeout(() => {
        app.winSound.pause();
        app.winSound.currentTime = 0;
      }, 5000);
      nbTry.innerHTML = `<p class="winning-texte t2">Vous avez mi ${app.try} tentatives</p>`;
    }
  },
  reRun() {
    const winButton = document.querySelector(".rerun");
    winButton.addEventListener("click", () => {
      const winPanel = document.querySelector(".panel-winning");
      winPanel.classList.add("hidden");
      const nbButton = document.querySelector(".parameters__nb-pairs-input");
      app.number = nbButton.value * 2;
      if (app.number < 0) app.number = 0;
      if (app.number > 60) app.number = 60;
      app.deleteAllElement();
      app.init();
    });
  },
  init() {
    app.runElement();
    app.generateVerso(app.number);
    app.calculSize();
    app.generateRectos();
    app.clic();
    app.reRun();
  },
};

app.runElement();
