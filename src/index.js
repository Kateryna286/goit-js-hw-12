import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTpl from './templates/country.hbs';
import countriesTpl from './templates/countries.hbs';
//import {fetchCountries} from './fetchCountries';


const refs = {
    countryCard: document.querySelector('.country-info'),
    countryList: document.querySelector('.country-list'),
    input: document.querySelector('#search-box'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    const searchValue = event.target.value;
    console.log(searchValue);
    
        fetchCountries(searchValue)
            .then(countries => {

                if (countries.length === 1) {
                    renderOneCountryCardMarkup(countries);
                }
        
                else if (countries.length > 1 && countries.length < 10) {
                    renderCountryCardsMarkup(countries);
                }

                else {
                    console.log('error');
                };
    
            }).catch(error => {
                console.log('catch');
                clearMarkup();
            });
    
};

function fetchCountries(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`
    return fetch(url)
        .then(response => {
            if (!response.ok) {
                console.log('ups');
                throw new Error(response.status);
            }
            return response.json();
        });
    
};

function renderCountryCardsMarkup(countries) {
    clearMarkup();
    const markup = createCountryCardsMarkup(countries);
    createCountryCardsMarkup(countries);
    refs.countryList.innerHTML = markup;
};

function renderOneCountryCardMarkup(countries) {
    clearMarkup();
    const markup = countryCardTpl(...countries);
    refs.countryCard.innerHTML = markup;
};

function createCountryCardsMarkup(countries) {
    return countries.map(countriesTpl).join('');
};

function clearMarkup() {
    refs.countryList.innerHTML = "";
    refs.countryCard.innerHTML = "";
}




