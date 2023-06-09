const main_url = "https://api.themoviedb.org/3";
const api_key = "api_key=36d82ad03d63de894682d8510d844053";
const img_url = "https://image.tmdb.org/t/p/w200";

const trendMovieUrl = main_url + "/trending/all/day?" + api_key;
const trendMovieUrlWeek = main_url + "/trending/all/week?" + api_key;
const latestMovieUrl = main_url + "/movie/latest?" + api_key;
const popularMovieUrl = main_url + "/movie/popular?" + api_key;
const searchApi = main_url + "/search/movie?" + api_key;

const trendMovieWrapper = document.getElementsByClassName("movie-card-wrapper");
const latestWrapper = document.getElementById("latest-card-wrapper");

const trendToday = document.getElementById('trend-today')
const trendWeek = document.getElementById('trend-week')

const trendTodayWrapper = document.getElementById('trend-today-wrapper')
const trendWeekWrapper = document.getElementById('trend-week-wrapper')

const onTv = document.getElementById('on_tv')
const inTheaters = document.getElementById('in_theaters')

const onTvWrapper = document.getElementById('on_tv_wrapper')
const inTheatersWrapper = document.getElementById('in_theaters_wrapper')

trendToday.addEventListener('click', (event) => {
  event.preventDefault()
  trendingMovie(trendMovieUrl)
  console.log('true');
  trendTodayWrapper.classList.add('anchor-selected')
  trendWeekWrapper.classList.remove('anchor-selected')
  trendWeekWrapper.classList.add('anchor')
  trendTodayWrapper.classList.remove('anchor')
})

trendWeek.addEventListener('click', (event) => {
  event.preventDefault()
  trendingMovie(trendMovieUrlWeek)
  console.log('true');
  trendWeekWrapper.classList.add('anchor-selected')
  trendTodayWrapper.classList.remove('anchor-selected')
  trendTodayWrapper.classList.add('anchor')
  trendWeekWrapper.classList.remove('anchor')
})

onTv.addEventListener('click', (event) => {
  event.preventDefault()
  popularMovie()
  console.log('true');
  onTvWrapper.classList.add('anchor-selected')
  inTheatersWrapper.classList.remove('anchor-selected')
  inTheatersWrapper.classList.add('anchor')
  onTvWrapper.classList.remove('anchor')
})

inTheaters.addEventListener('click', (event) => {
  event.preventDefault()
  popularMovie()
  console.log('true');
  inTheatersWrapper.classList.add('anchor-selected')
  onTvWrapper.classList.remove('anchor-selected')
  onTvWrapper.classList.add('anchor')
  inTheatersWrapper.classList.remove('anchor')
})

function trendingMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      trendingMovieShow(data.results);
    });
}

function trendingMovieShow(data) {
  console.log(data);
  trendMovieWrapper[0].innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const { title, vote_average, poster_path, release_date, name,first_air_date } = data[i];
    trendMovieWrapper[0].innerHTML += `
      <div class="card">
          <div class="image-wrapper">
              <a href="#">
                  <img src="${img_url + poster_path}" alt="${title}">
              </a>
              <div class="option">
                  <i class="fa-solid fa-ellipsis"></i>
              </div>
          </div>
          <div class="card-content">
              <svg viewBox="0 0 36 36" class="circular-chart">
                  <path class="circle"
                      stroke-dasharray="60, 100"
                      d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="5" y="20" class="percentage">${vote_average}</text>
              </svg>
              <h2>
                  <a href="">${title ?? name}</a>
              </h2>
              <p>${release_date ?? first_air_date}</p>
          </div>
      </div>
      `;
  }
}

trendingMovie(trendMovieUrl);



// function latestMovie(url) {
//   fetch(url)
//     .then((res) => res.json())
//     .then((latestData) => {
//       latestMovieShow(latestData);
//     });
// }

// function latestMovieShow(data) {
//   console.log(data);
//   latestWrapper.innerHTML = "";
//   const {title, poster_path} = data;
//   latestWrapper.innerHTML += `
//   <div class="movie-video">
//       <div class="image-wrapper">
//           <div class="option">
//               <i class="fa-solid fa-ellipsis"></i>
//           </div>
//           <i class="fa-solid fa-play"></i>
//           <img src="${img_url + poster_path}" alt="${title}">
//       </div>
//       <h2>${title}</h2>
//   </div>
//   `;
// }

// latestMovie(latestMovieUrl)



function popularMovie(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      popularMovieShow(data.results);
    });
}

function popularMovieShow(data) {
  console.log(data);
  trendMovieWrapper[1].innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    const { title, vote_average, poster_path, release_date,name } = data[i];
    trendMovieWrapper[1].innerHTML += `
      <div class="card">
          <div class="image-wrapper">
              <a href="#">
                  <img src="${img_url + poster_path}" alt="${title ??name}">
              </a>
              <div class="option">
                  <i class="fa-solid fa-ellipsis"></i>
              </div>
          </div>
          <div class="card-content">
              <div class="user_score_chart">
                  <p>${vote_average}</p>
                  <span>%</span>
              </div>
              <h2>
                  <a href="">${title}</a>
              </h2>
              <p>${release_date}</p>
          </div>
      </div>
      `;
  }
}

popularMovie(popularMovieUrl);