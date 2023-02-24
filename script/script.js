import {
  GET,
  GET_FILM,
  AGES,
  cE,
  qS,
  qSA,
  BASE_IMG_URL,
  bodyEl,
  myGenres,
  GET_GENRES,
} from "./utils.js";

const mainEl = qS("main");
const cardContainerEl = qSA(".card-container");
const overlayEl = qS(".overlay");
const overlayDetailsEl = qS(".overlay-details");
const myListOverlayEl = qS(".my-list-overlay");
const signInBtnEl = qS(".signin-button");
const loginEl = qS("#login");
const logInBtnEl = qS(".login-button");
const favBoxEl = qS(".fav-box img");
const profileImgEl = qS(".profile-img");
const logoutContainerEl = cE("div");
const chooseCatEl = qS(".choose-cat");
const chooseContainerEl = qS(".choose-container");
let PROFILE = {
  username,
  password,
  isLogged: false,
  myList: [],
};

/* Che gran peccato...
// Function for DATE PARSED
const GET_DATE = (arrayOfFilms) => {
  arrayOfFilms.forEach((film) => {
    const { release_date: age } = film;
    const dateconv = age.split("-");
    const dateParsed = dateconv.map((string) => parseInt(string, 10));
    film.release_date = dateParsed;
    return film.release_date;
  });
};

GET().then((data) => {
  const { results: myMovies } = data;
  GET_DATE(myMovies);
  console.log(myMovies);
  const movies60 = myMovies.filter(
    (film) => film.release_date[0] >= 1960 && film.release_date[0] <= 1969
  );
  console.log(movies60);
});

 */
try {
  Promise.all([
    GET(AGES[0]),
    GET(AGES[1]),
    GET(AGES[2]),
    GET(AGES[3]),
    GET_GENRES(myGenres.action),
    GET_GENRES(myGenres.adventure),
    GET_GENRES(myGenres.animation),
    GET_GENRES(myGenres.science_f),
    GET_GENRES(myGenres.thriller),
  ])
    .then((data) => {
      data[0].results.map((movie) =>
        cardContainerEl[0].append(CARD_GEN(movie))
      );
      data[1].results.map((movie) =>
        cardContainerEl[1].append(CARD_GEN(movie))
      );
      data[2].results.map((movie) =>
        cardContainerEl[2].append(CARD_GEN(movie))
      );
      data[3].results.map((movie) =>
        cardContainerEl[3].append(CARD_GEN(movie))
      );
      data[4].results.map((movie) =>
        cardContainerEl[4].append(CARD_GEN(movie))
      );
      data[5].results.map((movie) =>
        cardContainerEl[5].append(CARD_GEN(movie))
      );
      data[6].results.map((movie) =>
        cardContainerEl[6].append(CARD_GEN(movie))
      );
      data[7].results.map((movie) =>
        cardContainerEl[7].append(CARD_GEN(movie))
      );
      data[8].results.map((movie) =>
        cardContainerEl[8].append(CARD_GEN(movie))
      );

      //Manca solo da creare in html le sezione e poi concatenare i data etc. come qui sopra
    })
    .then(() => {
      const movies = qSA(".card");
      const myMovies = qSA(".my-list-card");
      INFO_MOVIE_GEN(movies);

      signInBtnEl.addEventListener("click", () => {
        console.log(PROFILE);
        overlayEl.style.zIndex = "5";
        overlayEl.style.opacity = "1";
      });

      loginEl.addEventListener("submit", (e) => {
        e.preventDefault();
        let { value: name } = e.target[0];
        let { value: password } = e.target[1];
        LOGIN_METHOD(name, password, PROFILE);
      });

      SHOW_INFO_PROFILE(PROFILE);

      SEE_MY_LIST();
    });
} catch (error) {
  alert(
    `Mi dispiace... la richiesta non è andata a buon fine a causa del seguente errore: ${error}`
  );
}

const CARD_GEN = (data) => {
  const cardEl = cE("div");
  const imgMovie = cE("img");
  imgMovie.src = BASE_IMG_URL + data.poster_path;
  imgMovie.setAttribute("alt", data.title);
  imgMovie.setAttribute("id", data.id);

  cardEl.className = "card";

  cardEl.appendChild(imgMovie);
  return cardEl;
};

const INFO_MOVIE_GEN = (movies) => {
  movies.forEach((movie) => {
    movie.addEventListener("click", () => {
      GET_FILM(movie.childNodes[0].id).then((data) => {
        const filmContainerEl = cE("div");
        const imgSectionEl = cE("div");
        const imgEl = cE("img");
        const titleEl = cE("h1");
        const starsEl = cE("div");
        const addToFavbtn = cE("button");
        const infoSectionEl = cE("div");
        const descriptionEl = cE("p");
        const otherInfoEl = cE("p");
        const closeBtn = cE("div");

        filmContainerEl.className = "film-container";
        imgSectionEl.className = "img-section";
        imgEl.className = "img";
        titleEl.className = "movie-title";
        starsEl.className = "stars";
        addToFavbtn.className = "add-to-fav";
        infoSectionEl.className = "info-section";
        descriptionEl.className = "description";
        otherInfoEl.className = "other-info";
        closeBtn.className = "close-btn";

        FAV_MECHANICS(addToFavbtn, data);

        overlayDetailsEl.style.zIndex = "10";
        overlayDetailsEl.style.opacity = "1";
        imgEl.src = BASE_IMG_URL + data.poster_path;
        titleEl.textContent = data.title;
        starsEl.style = `--rating: ${data.vote_average};`;

        let index = PROFILE.myList.findIndex(
          (element) => element.id === data.id
        );

        if (index !== -1) {
          addToFavbtn.textContent = "✅";
        } else {
          addToFavbtn.textContent = "➕";
        }
        descriptionEl.textContent = data.overview;
        if (data.overview.length > 600) {
          descriptionEl.style.overflowY = "scroll";
        }

        if (data.genres.length === 1) {
          otherInfoEl.textContent = data.genres[0].name;
        } else if (data.genres.length === 2) {
          otherInfoEl.textContent = `${data.genres[0].name}, ${data.genres[1].name}`;
        } else if (data.genres.length >= 3) {
          otherInfoEl.textContent = `${data.genres[0].name}, ${data.genres[1].name} e ${data.genres[2].name}`;
        }

        console.log(data.genres);

        imgSectionEl.append(imgEl, titleEl, starsEl, addToFavbtn);
        infoSectionEl.append(descriptionEl, otherInfoEl);
        filmContainerEl.append(imgSectionEl, infoSectionEl, closeBtn);
        overlayDetailsEl.appendChild(filmContainerEl);

        closeBtn.addEventListener("click", () => {
          overlayDetailsEl.removeChild(filmContainerEl);
          overlayDetailsEl.style.opacity = "0";
          overlayDetailsEl.style.zIndex = "-1";
        });
      });
    });
  });
};

const LOGIN_METHOD = (name, password, PROFILE) => {
  let isLogged;
  if (name && password) {
    alert(`Benvenuto, ${name}!`);
    isLogged = true;

    favBoxEl.style.display = "block";
    signInBtnEl.style.display = "none";
    profileImgEl.style.display = "block";
    PROFILE.name = name;
    PROFILE.password = password;
  } else {
    alert("Devi inserire almeno un campo!");
    isLogged = false;
  }
  overlayEl.style.zIndex = "-5";
  overlayEl.style.opacity = "0";
  PROFILE.isLogged = isLogged;
  return PROFILE;
};

const FAV_MECHANICS = (button, data) => {
  if (!PROFILE.isLogged) {
    button.addEventListener("mouseover", () => {
      button.classList.add("not-auth");
    });
  }
  button.addEventListener("click", () => {
    if (PROFILE.isLogged == false) {
      alert("Fai il login per aggiungere il film ai preferiti :)");
    } else {
      let index = PROFILE.myList.findIndex((element) => element.id === data.id);
      if (index !== -1) {
        PROFILE.myList.splice(index, 1);
        alert(`Hai rimosso --- ${data.title} --- dalla lista dei preferiti!`);
        button.textContent = "➕";
      } else {
        PROFILE.myList.push(data);
        alert(`Hai aggiunto ${data.title} alla lista dei preferiti!`);
        button.textContent = "✅";
      }
      console.log(PROFILE.myList);
    }
  });
};

const SEE_MY_LIST = () => {
  favBoxEl.addEventListener("click", () => {
    myListOverlayEl.textContent = "";
    myListOverlayEl.style.zIndex = "10";
    myListOverlayEl.style.opacity = "1";

    const myListContainerEl = cE("div");
    const myListBtnEl = cE("div");
    const rmMyListEl = cE("div");

    myListContainerEl.className = "my-list-container";
    myListBtnEl.className = "my-list-btn";
    rmMyListEl.className = "rm-my-list";

    PROFILE.myList.forEach((film) => {
      const myListCardEl = cE("div");
      const myListImg = cE("img");

      myListCardEl.className = "my-list-card";
      myListImg.className = "my-list-img";

      myListImg.src = BASE_IMG_URL + film.poster_path;
      myListCardEl.appendChild(myListImg);
      myListContainerEl.appendChild(myListCardEl);
      myListCardEl.addEventListener("click", () => {
        GET_FILM(film.id).then((data) => {
          const filmContainerEl = cE("div");
          const imgSectionEl = cE("div");
          const imgEl = cE("img");
          const titleEl = cE("h1");
          const starsEl = cE("div");
          const addToFavbtn = cE("button");
          const infoSectionEl = cE("div");
          const descriptionEl = cE("p");
          const otherInfoEl = cE("p");
          const closeBtn = cE("div");

          filmContainerEl.className = "film-container";
          imgSectionEl.className = "img-section";
          imgEl.className = "img";
          titleEl.className = "movie-title";
          starsEl.className = "stars";
          addToFavbtn.className = "add-to-fav";
          infoSectionEl.className = "info-section";
          descriptionEl.className = "description";
          otherInfoEl.className = "other-info";
          closeBtn.className = "close-btn";

          FAV_MECHANICS(addToFavbtn, data);

          overlayDetailsEl.style.zIndex = "10";
          overlayDetailsEl.style.opacity = "1";
          imgEl.src = BASE_IMG_URL + data.poster_path;
          titleEl.textContent = data.title;
          starsEl.style = `--rating: ${data.vote_average};`;

          let index = PROFILE.myList.findIndex(
            (element) => element.id === data.id
          );

          if (index !== -1) {
            addToFavbtn.textContent = "✅";
          } else {
            addToFavbtn.textContent = "➕";
          }
          descriptionEl.textContent = data.overview;
          if (data.overview.length > 600) {
            descriptionEl.style.overflowY = "scroll";
          }

          if (data.genres.length === 1) {
            otherInfoEl.textContent = data.genres[0].name;
          } else if (data.genres.length === 2) {
            otherInfoEl.textContent = `${data.genres[0].name}, ${data.genres[1].name}`;
          } else if (data.genres.length >= 3) {
            otherInfoEl.textContent = `${data.genres[0].name}, ${data.genres[1].name} e ${data.genres[2].name}`;
          }

          console.log(data.genres);

          imgSectionEl.append(imgEl, titleEl, starsEl, addToFavbtn);
          infoSectionEl.append(descriptionEl, otherInfoEl);
          filmContainerEl.append(imgSectionEl, infoSectionEl, closeBtn);
          overlayDetailsEl.appendChild(filmContainerEl);

          closeBtn.addEventListener("click", () => {
            overlayDetailsEl.removeChild(filmContainerEl);
            overlayDetailsEl.style.opacity = "0";
            overlayDetailsEl.style.zIndex = "-1";
          });
        });
        myListOverlayEl.style.zIndex = "-10";
        myListOverlayEl.style.opacity = "0";
      });
    });

    myListBtnEl.textContent = "✕";
    rmMyListEl.textContent = "⩐";

    myListBtnEl.addEventListener("click", () => {
      myListOverlayEl.style.zIndex = "-10";
      myListOverlayEl.style.opacity = "0";
    });

    rmMyListEl.addEventListener("click", () => {
      if (PROFILE.myList.length > 0) {
        alert("La tua lista preferiti verrà svuotata");
        PROFILE.myList = [];
        myListOverlayEl.style.zIndex = "-10";
        myListOverlayEl.style.opacity = "0";
      } else {
        alert("La tua lista è già vuota");
      }
    });

    myListContainerEl.append(myListBtnEl, rmMyListEl);
    myListOverlayEl.appendChild(myListContainerEl);
  });
};
let countClick = 0;
const SHOW_INFO_PROFILE = (PROFILE) => {
  profileImgEl.addEventListener("click", () => {
    countClick++;
    if (countClick < 2) {
      logoutContainerEl.textContent = "";
      const welcProfileEl = cE("p");
      const logoutEl = cE("p");

      welcProfileEl.textContent = `Ciao,  ${PROFILE.name}!`;
      logoutEl.setAttribute("id", "logout");
      logoutEl.textContent = "Logout";
      logoutEl.style.cursor = "pointer";
      LOGOUT(logoutEl, PROFILE);
      logoutContainerEl.className = "logout-container";

      logoutContainerEl.append(welcProfileEl, logoutEl);
      bodyEl.appendChild(logoutContainerEl);
      console.log(PROFILE.name);
    } else {
      bodyEl.removeChild(logoutContainerEl);
      countClick = 0;
    }
  });
};

const LOGOUT = (button, PROFILE) => {
  button.addEventListener("click", () => {
    /* 
    profileImgEl.style.display = "none";
    signInBtnEl.style.display = "block";
    logoutContainerEl.textContent = "";
    bodyEl.removeChild(logoutContainerEl);
    countClick = 0;
    RESET_PROFILE(PROFILE);
    Bastava un semplice location.reload()
 */
    location.reload();
  });
};

const RESET_PROFILE = (PROFILE) => {
  PROFILE = { username, password, isLogged: false, myList: [] };
};

chooseCatEl.addEventListener("click", () => {
  chooseContainerEl.classList.toggle("show-block");
  chooseContainerEl.classList.toggle("hide");
});
