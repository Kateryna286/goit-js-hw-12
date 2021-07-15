import './css/styles.css';
import countryCardTpl from './templates/country.hbs';
import countriesTpl from './templates/countries.hbs';

const refs = {
    countryCard: document.querySelector('.country-info'),
};

const DEBOUNCE_DELAY = 300;

fetchCountries('do');

function fetchCountries(name) {
    console.log(name);
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
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
        console.log(error);
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



// fetch('https://restcountries.eu/rest/v2/name/swit').then(response => {
//     return response.json();
// }).then(countries => {

//     if (countries.length === 1) {
//         renderOneCountryCardMarkup(countries);
//     }
    
//     else if (countries.length > 1 || countries.length < 10) {
//         renderCountryCardsMarkup(countries);
//     }

//     else {
//         console.log('error');
//     };
    
// }).catch(error => {
//     console.log(error);
// });