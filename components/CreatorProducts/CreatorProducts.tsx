import { Dispatch, SetStateAction } from 'react';

import { ICreator, ProductsByCreatorId } from '@/types';

interface ICreatorProductsProps {
  activeCreator: ICreator;
  setActiveCreator: Dispatch<SetStateAction<ICreator | null>>;
  productsByCreatorId: ProductsByCreatorId;
}

const CreatorProducts = ({ activeCreator, setActiveCreator, productsByCreatorId }: ICreatorProductsProps) => {
  const activeCreatorProducts = productsByCreatorId[activeCreator.id] || [];

  return (
    <div className="absolute right-0 w-60 bg-[#333333] p-2 rounded-l-lg">
      <div className="flex flex-col">
        <span className="font-medium text-nowrap max-w-52 text-ellipsis overflow-hidden">{activeCreator.id}</span>
        <span className="font-light">Creator Products</span>
        <span className="absolute right-2 cursor-pointer" onClick={() => setActiveCreator(null)}>
          X
        </span>
      </div>
      <div className="max-h-[500px] overflow-auto">
        {activeCreatorProducts.map((product) => (
          <div className="grid grid-cols-1 items-center bg-[#333333] p-2" key={product.id}>
            <span className="text-xs font-light">Product ID:</span>
            <span className="text-base font-medium text-nowrap text-ellipsis overflow-hidden">{product.id}</span>
            <span className="text-xs font-light">Product Creation Time:</span>
            <span className="text-base font-medium text-nowrap text-ellipsis overflow-hidden">
              {new Date(product.createTime).toDateString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreatorProducts;
