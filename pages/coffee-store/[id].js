import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import cls from "classnames";
import { fetchCoffeeStores } from "../../libs/coffee-stores";

import styles from "../../styles/coffee-store.module.css";

import { StoreContext } from "../../contexts/store-context";
import { isEmpty } from "../../utils";

export default function CoffeeStore(initialProps) {
  const router = useRouter();
  const id = router.query.id;

  const {
    state: { coffeeStores },
  } = useContext(StoreContext);

  const [coffeeStore, setCoffeeStore] = useState(initialProps.coffeeStore);
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleCreateCoffeeStore = async (coffeeStore) => {
    try {
      const { id, name, voting, imgUrl, address, postcode } = coffeeStore;

      const response = await fetch("/api/createCoffeeStore", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: `${id}`,
          name,
          address: address || "",
          postcode: postcode || "",
          imgUrl,
          voting,
        }),
      });

      const dbCoffeeStore = response.json();
      console.log("dbstores", dbCoffeeStore);
    } catch (error) {
      console.error("Error creating coffee-store", error);
    }
  };

  useEffect(() => {
    if (!isRequestSent) {
      if (isEmpty(initialProps.coffeeStore)) {
        if (coffeeStores.length > 0) {
          const cofeeStoresFromContext = coffeeStores.find(
            (store) => store.id.toString() === id
          );

          if (cofeeStoresFromContext) {
            setCoffeeStore(cofeeStoresFromContext);
            handleCreateCoffeeStore(cofeeStoresFromContext);
            setIsRequestSent(true);
          }
        }
      } else {
        // SSG
        handleCreateCoffeeStore(initialProps.coffeeStore);
        setIsRequestSent(true);
      }
    }
  }, [
    id,
    coffeeStore,
    coffeeStores,
    initialProps,
    initialProps.coffeeStore,
    isRequestSent,
    setIsRequestSent,
  ]);

  if (router.isFallback) {
    return <div>Loading</div>;
  }

  const { address, postcode, name, imgUrl } = coffeeStore;

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to Home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>

        <div className={cls("glass", styles.col2)}>
          {address && (
            <div className={styles.iconWrapper}>
              <Image
                src={"/static/icons/places.svg"}
                width={24}
                height={24}
                alt={name}
              />
              <p className={styles.text}>{address}</p>
            </div>
          )}
          {postcode && (
            <div className={styles.iconWrapper}>
              <Image
                src={"/static/icons/nearMe.svg"}
                width={24}
                height={24}
                alt={name}
              />
              <p className={styles.text}>{postcode}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/star.svg"}
              width={24}
              height={24}
              alt={name}
            />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(staticProps) {
  const params = staticProps.params;

  const coffeeStores = await fetchCoffeeStores();

  const findCoffeeStoreById = coffeeStores.find(
    (store) => store.id.toString() === params.id
  );

  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();

  const paths = coffeeStores.map((store) => ({
    params: {
      id: store.id.toString(),
    },
  }));

  return {
    paths,
    fallback: true,
  };
}
