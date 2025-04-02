import { z } from 'zod';

export const createProductSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Введите название товара' })
    .max(40, { message: 'Не более 40 символов' }),
  price: z.number().min(1, { message: 'Введите цену' }),
  description: z
    .string()
    .min(1, { message: 'Введите описание товара' })
    .max(120, { message: 'Не более 120 символов' }),
  image: z
    .string()
    .min(1, { message: 'Введите ссылку на картинку товара или оставьте "/placehodler.webp"' }),
});

export type TFormCreateProductValues = z.infer<typeof createProductSchema>;
