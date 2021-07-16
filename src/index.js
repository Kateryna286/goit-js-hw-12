import './css/styles.css';
import countryCardTpl from './templates/country.hbs';
import countriesTpl from './templates/countries.hbs';

const refs = {
    countryCard: document.querySelector('.country-info'),
    input: document.querySelector('#search-box'),
};

refs.input.addEventListener('input', onSearch);

console.log(refs.input);

function onSearch(event) {
    const searchValue = event.currentTarget.value;
    console.log(searchValue);
    fetchCountries(`${searchValue}`);
}

const DEBOUNCE_DELAY = 300;

// then((response) => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });


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
        console.log(error);
    }).finally(() => {
        searchValue.reset();
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