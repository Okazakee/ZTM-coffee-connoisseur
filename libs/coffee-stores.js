const getUrlForCoffeStores = (latLong, radius, limit) => {
    return `https://api.foursquare.com/v3/places/search?query=coffee&ll=${latLong}&radius=${radius}&limit=${limit}`
}

export const fetchCoffeeStores = async() => {
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
      return data.results;
}