import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

const getUrlForCoffeStores = (latLong, radius, limit) => {
  return `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&radius=${radius}&limit=${limit}`;
};

const getListOfCoffeeStoresPhotos = async () => {
  try {
    const photos = await unsplash.search.getPhotos({
      query: "coffee shop",
      page: 1,
      perPage: 30,
      orientation: "landscape",
    });

    const unsplashResults = photos.response.results;

    return unsplashResults.map((result) => result.urls.small);
  } catch (error) {
    console.error("Unsplash API error:", error);
    return []; // Return an empty array if the Unsplash API fails
  }
};

export const fetchCoffeeStores = async (
  latLong = "38.116590133305266%2C13.363525114843128"
) => {
  const photos = await getListOfCoffeeStoresPhotos();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(getUrlForCoffeStores(latLong, 8000, 6), options);

  const data = await response.json();

  if (!data.results) {
    // Handle the case when data.results is undefined
    console.error("Foursquare API error: Invalid response");
    return [];
  }

  return data.results.map((result, i) => {
    return {
      id: result.fsq_id,
      name: result.name,
      address: result.location.address,
      locality: result.location.locality,
      postcode: result.location.postcode,
      imgUrl:
        photos.length !== 0
          ? photos[i]
          : "https://media-cdn.tripadvisor.com/media/photo-w/1a/9e/c1/5f/20200116-184618-largejpg.jpg",
    };
  });
};
