import './css/styles.css';
import debounce from 'lodash.debounce';
import countryCardTpl from './templates/country.hbs';
import countriesTpl from './templates/countries.hbs';

const refs = {
    countryCard: document.querySelector('.country-info'),
    input: document.querySelector('#search-box'),
};

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    const searchValue = event.target.value;
    fetchCountries(searchValue);
};

function fetchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
        if (!response.ok) {
            console.log('ups');
            throw new Error(response.status);
        }
        return response.json();
    })
        .then(countries => {

        if (countries.length === 1) {
            renderOneCountryCardMarkup(countries);
        }
        
        else if (countries.length > 1 || countries.length < 10) {
            renderCountryCardsMarkup(countries);
        }

        else {
            console.log('error');
        };
    
    }).catch(error => {
        console.log('catch');
    });
};

function createCountryCardsMarkup(countries) {
    return countries.map(countriesTpl).join('');
};

function renderCountryCardsMarkup(countries) {
    const markup = createCountryCardsMarkup(countries);
    createCountryCardsMarkup(countries);
    refs.countryCard.innerHTML = markup;
};

function renderOneCountryCardMarkup(countries) {
    const markup = countryCardTpl(...countries);
    refs.countryCard.innerHTML = markup;
};


