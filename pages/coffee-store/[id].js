import { useRouter } from 'next/router';
import Link from 'next/link';
import coffeeStoreData from '../../data/coffee-stores.json';

export default function CoffeeStore(props) {
  const router = useRouter();

  return (
    <div>
      Coffee Store Page {router.query.id}
      <Link href="/">
        <a>Back to Home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
      <p>{props.coffeeStore.address}</p>
      <p>{props.coffeeStore.name}</p>
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
  return {
    paths: [ { params: { id: "0" } }, { params: { id: "1" } } ],
    fallback: false,
  }
}