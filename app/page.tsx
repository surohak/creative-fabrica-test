'use client';
import { useEffect, useState } from 'react';
import isEqual from 'react-fast-compare';

import CreatorProducts from '@/components/CreatorProducts';
import CreatorsList from '@/components/CreatorsList';
import { ICreator, ProductsByCreatorId } from '@/types';
import {
  getCreatorsFromLocalStorage,
  getCreatorsInfo,
  getData,
  getProductsByCreatorIdFromLocalStorage,
  getSlicedCreators,
} from '@/utils';

const topCount = 3;

export default function Home() {
  const [creators, setCreators] = useState<ICreator[]>([]);
  const [productsByCreatorId, setProductsByCreatorId] = useState<ProductsByCreatorId>({});
  const [activeCreator, setActiveCreator] = useState<ICreator | null>(null);

  useEffect(() => {
    const localStorageCreators = getSlicedCreators(getCreatorsFromLocalStorage(), topCount);
    localStorageCreators.length && setCreators(localStorageCreators);

    const localStorageProductsByCreatorId = getProductsByCreatorIdFromLocalStorage();
    Object.keys(localStorageProductsByCreatorId).length && setProductsByCreatorId(localStorageProductsByCreatorId);

    void (async () => {
      const res = await getData();
      const { sortedCreators, productsByCreatorId } = getCreatorsInfo(res);

      localStorage.setItem('creators', JSON.stringify(sortedCreators));
      localStorage.setItem('productsByCreatorId', JSON.stringify(productsByCreatorId));

      setCreators((prev) => (isEqual(prev, sortedCreators) ? prev : sortedCreators));
      setProductsByCreatorId((prev) => (isEqual(prev, productsByCreatorId) ? prev : productsByCreatorId));
    })();
  }, []);

  return (
    <div className="flex w-full h-full justify-center items-center">
      <div className="flex flex-col gap-4">
        Top {topCount} Active Creators
        <CreatorsList creators={creators} setActiveCreator={setActiveCreator} topCount={topCount} />
      </div>
      {activeCreator && (
        <CreatorProducts
          activeCreator={activeCreator}
          productsByCreatorId={productsByCreatorId}
          setActiveCreator={setActiveCreator}
        />
      )}
    </div>
  );
}
