import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeStores = (latLong, radius, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&radius=${radius}&limit=${limit}`
}

const getListOfCoffeeStoresPhotos = async() => {

    const photos = await unsplash.search.getPhotos({
        query: 'coffee shop',
        page: 1,
        perPage: 30,
        orientation: 'landscape',
        });

    const unsplashResults = photos.response.results;

    return unsplashResults.map((result) => result.urls.small);
}

export const fetchCoffeeStores = async() => {

    const photos = await getListOfCoffeeStoresPhotos();

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: process.env.FOURSQUARE_API_KEY,
        }
        };

    const response = await fetch(getUrlForCoffeStores(
        "38.116590133305266%2C13.363525114843128",
        5000,
        6
    ),
    options);

    const data = await response.json();

    return data.results.map((result, i) => {
        return {
            fsq_id: result.fsq_id,
            name: result.name,
            location: {
                address: result.location.address,
                locality: result.location.locality,
                postcode: result.location.postcode
            },
            imgUrl: photos[i],
        }
    });
}