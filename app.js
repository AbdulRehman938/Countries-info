const root = document.querySelector(":root"),
  body = document.querySelector("body"),
  home = document.getElementById("home"),
  main = document.getElementById("main"),
  theme = document.getElementById("theme"),
  searchBar = document.getElementById("search-bar"),
  countryName = document.getElementsByClassName("country-name"),
  moon = document.getElementById("moon"),
  menu = document.getElementById("menu"),
  searchIcon = document.getElementById("search-icon"),
  search = document.getElementById("search"),
  filter = document.getElementById("filter"),
  countryContainer = document.getElementsByClassName("country"),
  options = document.querySelector(".options"),
  regions = document.getElementsByClassName("region"),
  backBtn = document.getElementById("back-btn"),
  arrow = document.getElementById("arrow"),
  loading = document.querySelector(".loading");

const countryPage = document.getElementById("country-page"),
  bigFlag = document.getElementById("big-flag"),
  cn = document.getElementById("cn"),
  col1Span = document.getElementsByClassName("col-1-span"),
  col2Span = document.getElementsByClassName("col-2-span"),
  borderCountries = document.getElementById("border-countries"),
  borders = document.getElementsByClassName("border");

let countries = [];

fetch("https://restcountries.com/v2/all?fields=name,flag,population,region,capital,alpha3Code")
  .then((res) => res.json())
  .then((data) => {
    countries = data;
    loading.innerHTML = "";
    countries.forEach((country) => {
      main.innerHTML += `
  <div class="country">
    <div class="flag-container">
      <img class="flag" src="${country.flag}" />
    </div>
    <div class="country-details">
      <h2 class="country-name">${country.name}</h2>
      <span><strong>Population: </strong>${country.population.toLocaleString()}</span><br>
      <span><strong>Region: </strong>${country.region}</span><br>
      <span><strong>Capital: </strong>${country.capital || "N/A"}</span>
    </div>
  </div>`;
    });
    for (let i = 0; i < data.length; i++) {
      let item = countryContainer[i];
      let country = data[i];

      item.addEventListener("click", () => {
        displayCountry(country);
      });

      function displayCountry(country) {
        home.style.overflowY = "hidden";
        home.style.display = "none";
        countryPage.style.transform = "translateX(0)";
        countryPage.scrollTop = 0;

        bigFlag.src = country.flag || "";
        cn.innerText = country.name;

        const nativeName = country.name;
        const population = country.population.toLocaleString();
        const capital = country.capital || "N/A";
        const tld = "N/A";
        const currencyString = "N/A";
        const languageString = "N/A";

        col1Span[0].innerHTML = `<strong>Native Name: </strong>${nativeName}`;
        col1Span[1].innerHTML = `<strong>Population: </strong>${population}`;
        col1Span[2].innerHTML = `<strong>Region: </strong>${country.region}`;
        col1Span[3].innerHTML = `<strong>Sub Region: </strong>N/A`;
        col1Span[4].innerHTML = `<strong>Capital: </strong>${capital}`;

        col2Span[0].innerHTML = `<strong>Top Level Domain: </strong>${tld}`;
        col2Span[1].innerHTML = `<strong>Currencies: </strong>${currencyString}`;
        col2Span[2].innerHTML = `<strong>Languages: </strong>${languageString}`;

        borderCountries.innerHTML = "<span>No bordering countries</span>";
      }
    }

    search.addEventListener("input", () => {
      countries.forEach((country, j) => {
        if (!country.name.toLowerCase().includes(search.value.toLowerCase())) {
          countryContainer[j].style.display = "none";
        } else {
          countryContainer[j].style.display = "unset";
        }
      });
    });
    for (let i = 0; i < regions.length; i++) {
      const reg = regions[i];
      reg.addEventListener("click", () => {
        countries.forEach((country, j) => {
          if (reg.getAttribute("data-value").toLowerCase() === "all") {
            countries.forEach((country, j) => {
              countryContainer[j].style.display = "unset";
            });
          } else if (
            country.region.toLowerCase() !==
            reg.getAttribute("data-value").toLowerCase()
          ) {
            countryContainer[j].style.display = "none";
          } else {
            countryContainer[j].style.display = "unset";
          }
        });
      });
    }
  });

let mode = localStorage.getItem("mode");

theme.addEventListener("click", () => {
  if (mode === "dark") {
    localStorage.setItem("mode", "light");
  } else {
    localStorage.setItem("mode", "dark");
  }
  mode = localStorage.getItem("mode");
  changeTheme();
});

function changeTheme() {
  if (mode === "dark") {
    root.style.setProperty("--bg", "#202c37");
    root.style.setProperty("--text", "#ffffff");
    root.style.setProperty("--lbg", "#2b3945");
    moon.src = "icons/moon-regular.svg";
    searchIcon.src = "icons/search-regular.svg";
    arrow.src = "icons/arrow-left-regular.svg";
  } else {
    root.style.setProperty("--bg", "#fafafa");
    root.style.setProperty("--text", "#111517");
    root.style.setProperty("--lbg", "#ffffff");
    moon.src = "icons/moon-solid.svg";
    searchIcon.src = "icons/search-solid.svg";
    arrow.src = "icons/arrow-left-solid.svg";
  }
}

filter.addEventListener("click", () => {
  options.classList.toggle("options-opened");
});

let scroll = document.documentElement.scrollTop;
home.style.overflowY = "visible";
document.addEventListener("scroll", () => {
  if (home.style.overflowY === "visible") {
    scroll = document.documentElement.scrollTop;
  }
});

backBtn.addEventListener("click", () => {
  home.style.display = "block";
  home.style.overflowY = "visible";
  document.documentElement.scrollTop = scroll;
  countryPage.style.transform = "translateX(100%)";
});

changeTheme();

document.addEventListener(
  "mousedown",
  (e) => {
    if (e.detail > 1) {
      e.preventDefault();
    }
  },
  false
);

theme.addEventListener(
  "mousedown",
  (e) => {
    e.preventDefault();
  },
  false
);

filter.addEventListener(
  "mousedown",
  (e) => {
    e.preventDefault();
  },
  false
);
