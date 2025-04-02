import axios from 'axios';

import type { IProduct } from '../model/types';

export const getProducts = async () => {
  return await axios.get<IProduct[]>(`${process.env.NEXT_PUBLIC_API_URL}/products`);
};
