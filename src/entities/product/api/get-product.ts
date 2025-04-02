import axios from 'axios';

import type { IProduct } from '../model/types';

export const getProduct = async (id: number) => {
  return (await axios.get<IProduct>(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`)).data;
};
