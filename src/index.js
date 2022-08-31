import './css/styles.css';
import debounce from 'lodash.debounce';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const searchInput = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

searchInput.addEventListener(
  'input',
  debounce(searchCountries, DEBOUNCE_DELAY)
);

function searchCountries(evt) {
  const country = evt.target.value.trim();
  if (country !== '')
    fetchCountries(country).then(country => renderCountry(country));
}

function renderCountries(countries) {
  const markup = countries
    .map(country => {
      return `<li class = "country-item">
  <img src="${country.flags.svg}" alt="flag" />
  <p>${country.name.official}</p>
</li>`;
    })
    .join('');
  countryList.innerHTML = markup;
}

function renderCountry(country) {
  const langs = Object.values(country[0].languages).join(', ');
  countryInfo.innerHTML = `<div class="title-country">
      <img src="${country[0].flags.svg}" alt="flag" />
      <h2>${country[0].name.official}</h2>
    </div>
    <ul class="country-info">
      <li class="country-info-item">Capital: ${country[0].capital}</li>
      <li class="country-info-item">Population: ${country[0].population}</li>
      <li class="country-info-item">Languages: ${langs}</li>
    </ul>`;
}
