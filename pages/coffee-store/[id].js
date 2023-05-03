import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import cls from 'classnames';

import coffeeStoreData from '../../data/coffee-stores.json';

import styles from '../../styles/coffee-store.module.css'

export default function CoffeeStore(props) {

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>
  }

  const {address, name, neighbourhood, imgUrl} = props.coffeeStore;

  const handleUpvoteButton = () => {
    console.log("handle upvote");
  }

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
        <div className={styles.backToHomeLink}>
          <Link href="/">
            <a>Back to Home</a>
          </Link>
        </div>
        <div className={styles.nameWrapper}>
          <h1>{name}</h1>
        </div>
          <Image
            src={imgUrl}
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          />
        </div>
        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image src={"/static/icons/places.svg"} width={24} height={24} />
            <p className={styles.text}>{address}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={"/static/icons/nearMe.svg"} width={24} height={24} />
            <p className={styles.text}>{neighbourhood}</p>
          </div>
          <div className={styles.iconWrapper}>
            <Image src={"/static/icons/star.svg"} width={24} height={24} />
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button>
        </div>
      </div>
    </div>
  )
}

export function getStaticProps(staticProps) {
  const params = staticProps.params
  return {
    props: {
      coffeeStore: coffeeStoreData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id;
      })
    }
  };
}

export function getStaticPaths() {

  const paths = coffeeStoreData.map((store) => {
    return {
      params: {
        id: store.id.toString()
      }
    }
  })

  return {
    paths,
    fallback: true,
  }
}