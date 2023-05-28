import {useEffect, useState, useContext} from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";
import { fetchCoffeeStores } from "../libs/coffee-stores";
import useTrackLocation from "../hooks/user-track-location";

import { ACTION_TYPES, StoreContext } from "./_app";

export default function Home({coffeeStoresInit}) {

  const { handleTrackLocation, locationErrorMsg, isFindingLocation } = useTrackLocation();

  /* const [coffeeStores, SetCoffeeStores] = useState(coffeeStoresInit); */
  const [coffeeStoresError, SetCoffeeStoresError] = useState(null);

  const { dispatch, state } = useContext(StoreContext);

  const { coffeeStores, latLong } = state;

  useEffect(() => {
    async function setCoffeeStoresByLocation() {
          if (latLong) {
            console.log("aaaaaaaaaaa",latLong)
            try {
              const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
              console.log({fetchedCoffeeStores});
              /* SetCoffeeStores(fetchedCoffeeStores); */
              dispatch({
                type: ACTION_TYPES.SET_COFFEE_STORES,
                payload: {
                  coffeeStores: fetchedCoffeeStores,
                }
              })
            } catch (error) {
              console.log(error);
              SetCoffeeStoresError(error);
            }
        }
    }

    setCoffeeStoresByLocation();
    },[latLong])

  const handleOnBannerClick = () => {
    handleTrackLocation();
    console.log({latLong, locationErrorMsg})
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Find Coffee Stores nearby!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Connoisseur</h1>
        <Banner buttonText={isFindingLocation ? "Locating…" : "View stores nearby"} handleOnClick={handleOnBannerClick}/>
        {locationErrorMsg && <h2>Error: {locationErrorMsg}!</h2>}
        {coffeeStoresError && <h2>Error: {coffeeStoresError}!</h2>}
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400}></Image>
        </div>
        {coffeeStores &&
        <div className={styles.sectionWrapper}>
          <h2 className={styles.heading2}>{`Stores near ${coffeeStores[0]?.locality || "Palermo"}`}</h2>
          <div className={styles.cardLayout}>
            {(coffeeStores.length === 0 ? coffeeStoresInit : coffeeStores).map((store) => {
              return(
                <Card
                  className={styles.card}
                  key={store.id}
                  name={store.name}
                  href={`/coffee-store/${store.id}`}
                  imgUrl={store.imgUrl || "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"}
                />
              )
            })}
          </div>
        </div>}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {

  const coffeeStoresInit = await fetchCoffeeStores();

  return {
    props: {
      coffeeStoresInit,
    }
  }
}