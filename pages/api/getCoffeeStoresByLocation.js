import { fetchCoffeeStores } from "../../libs/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {

  try {
    const {latLong} = req.query;

    const response = await fetchCoffeeStores(latLong);

    res.status(200);
    res.json(response);
  } catch(err) {
    res.status(500);
    res.json({message: "Oh no! Something went wrong", err})
  }


}

export default getCoffeeStoresByLocation;