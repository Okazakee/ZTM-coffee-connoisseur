import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import coffeeStoreData from '../../data/coffee-stores.json';

export default function CoffeeStore(props) {

  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading</div>
  }

  const {address, name, neighbourhood} = props.coffeeStore;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighbourhood}</p>
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