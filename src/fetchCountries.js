export function fetchCountries(name) {
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

function renderCountryCardsMarkup(countries) {
    const markup = createCountryCardsMarkup(countries);
    createCountryCardsMarkup(countries);
    refs.countryCard.innerHTML = markup;
};

function renderOneCountryCardMarkup(countries) {
    const markup = countryCardTpl(...countries);
    refs.countryCard.innerHTML = markup;
};

function createCountryCardsMarkup(countries) {
    return countries.map(countriesTpl).join('');
};