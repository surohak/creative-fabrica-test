import { IData } from '@/types';
import { DATA_ENDPOINT } from '@/utils/constants';

export async function getData(): Promise<IData> {
  try {
    const res = await fetch(DATA_ENDPOINT);
    return (await res.json()) as IData;
  } catch (error) {
    return {
      Creators: [],
      Products: [],
    };
  }
}
