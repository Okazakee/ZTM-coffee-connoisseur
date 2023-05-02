import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Banner from "../components/banner";
import Card from "../components/card";

export default function Home() {
  const handleOnBannerClick = () => {
    console.log("ats");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Coffee Connoisseur</h1>
        <Banner buttonText="View stores nearby" handleOnClick={handleOnBannerClick}/>
        <div className={styles.heroImage}>
          <Image src="/static/hero-image.png" width={700} height={400}></Image>
        </div>
        <div className={styles.cardLayout}>
          <Card className={styles.card} name="DarkHorse Coffee" href="/coffee-store/darkhorse-coffee" imgUrl="/static/hero-image.png" />
          <Card className={styles.card} name="DarkHorse Coffee" href="/coffee-store/darkhorse-coffee" imgUrl="/static/hero-image.png" />
          <Card className={styles.card} name="DarkHorse Coffee" href="/coffee-store/darkhorse-coffee" imgUrl="/static/hero-image.png" />
        </div>
      </main>
    </div>
  );
}
