import { useRouter } from 'next/router';
import React from 'react'

const CoffeeStore = () => {
  const router = useRouter();

  return (
    <div>Coffee Store Page {router.query.id}</div>
  )
}

export default CoffeeStore;