import { ICreator, IData, IProduct, ProductsByCreatorId } from '@/types';

export const getCreatorsInfo = (
  data: IData
): { sortedCreators: ICreator[]; productsByCreatorId: ProductsByCreatorId } => {
  const sortedCreators = [...data.Creators];

  const productsByCreatorId: { [key: string]: IProduct[] } = {};

  data.Products.forEach((product) => {
    productsByCreatorId[product.creatorId] = [...(productsByCreatorId[product.creatorId] || []), product];
  });

  Object.values(productsByCreatorId).forEach((products) => {
    products.sort((a, b) => {
      return (new Date(b.createTime) as unknown as number) - (new Date(a.createTime) as unknown as number);
    });
  });

  sortedCreators.sort((a, b) => {
    const productCountDiff = productsByCreatorId[b.id].length - productsByCreatorId[a.id].length;
    if (productCountDiff !== 0) {
      return productCountDiff;
    } else {
      const aLatestProduct = productsByCreatorId[a.id][0];
      const bLatestProduct = productsByCreatorId[b.id][0];

      return (
        (new Date(bLatestProduct.createTime) as unknown as number) -
        (new Date(aLatestProduct.createTime) as unknown as number)
      );
    }
  });

  return { sortedCreators, productsByCreatorId };
};

export const getCreatorsFromLocalStorage = (): ICreator[] => {
  const creators = localStorage.getItem('creators');

  try {
    return creators ? (JSON.parse(creators) as ICreator[]) : [];
  } catch (error) {
    return [];
  }
};

export const getSlicedCreators = (creators: ICreator[], count: number): ICreator[] => {
  return creators.slice(0, count);
};

export const getProductsByCreatorIdFromLocalStorage = (): ProductsByCreatorId => {
  const productsByCreatorId = localStorage.getItem('productsByCreatorId');

  try {
    return productsByCreatorId ? (JSON.parse(productsByCreatorId) as ProductsByCreatorId) : {};
  } catch (error) {
    return {};
  }
};
