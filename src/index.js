import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';
import { Notify } from 'notiflix';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

Notify.init({
  position: 'center-top',
  width: '380px',
});

searchInput.addEventListener(
  'input',
  debounce(searchCountries, DEBOUNCE_DELAY)
);

function searchCountries(evt) {
  const country = evt.target.value.trim();
  if (country !== '') {
    fetchCountries(country).then(renderAll).catch(notFound);
  } else {
    clearData();
  }
}

function renderAll(country) {
  if (country.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    clearData();
  } else if (country.length > 1) {
    renderCountries(country);
  } else if (country.length === 1) {
    renderCountry(country);
  }
}

function renderCountries(countries) {
  countryInfo.innerHTML = '';
  const markup = countries
    .map(country => {
      return `<li class = "country-item">
  <img src="${country.flags.svg}" alt="flag" width = "40"/>
  <p>${country.name.official}</p>
</li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountry(country) {
  countryList.innerHTML = '';
  const langs = Object.values(country[0].languages).join(', ');
  countryInfo.innerHTML = `<div class="title-country">
      <img src="${country[0].flags.svg}" alt="flag" width = "40"/>
      <h2>${country[0].name.official}</h2>
    </div>
    <ul class="country-info">
      <li class="country-info-item">Capital: <span>${country[0].capital}</span></li>
      <li class="country-info-item">Population: <span>${country[0].population}</span></li>
      <li class="country-info-item">Languages: <span>${langs}</span></li>
    </ul>`;
}

function clearData() {
  countryList.innerHTML = '';
  countryInfo.innerHTML = '';
}

function notFound() {
  Notify.failure('Oops, there is no country with that name');
  clearData();
}
