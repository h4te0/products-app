'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';

import { useProductsStore } from '@/entities/product';
import { createProductSchema, TFormCreateProductValues } from '@/features/create-product';

import { Container } from '@/shared/ui/container';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

const CreateProductPage = () => {
  const { push } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormCreateProductValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      image: '/placehodler.webp',
    },
  });

  const createProduct = useProductsStore((state) => state.createProduct);

  const onSubmit: SubmitHandler<TFormCreateProductValues> = (data) => {
    console.log(data);
    createProduct(data);
    push('/');
  };

  return (
    <Container>
      <div className="flex items-center gap-4">
        <Link href={'/'} className="w-8 h-8 flex justify-center items-center">
          <ChevronLeft className="w-full h-full" />
        </Link>
        <h1 className="text-3xl font-bold my-4">Создание товара</h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Название товара" type="text" {...register('title')} />
        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
        <Input
          placeholder="Цена товара"
          type="number"
          {...register('price', { valueAsNumber: true })}
        />
        {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
        <Input placeholder="Ссылка на картинку товара" type="text" {...register('image')} />
        {errors.image && <p className="text-destructive text-sm">{errors.image.message}</p>}
        <Textarea placeholder="Описание товара" {...register('description')} />
        {errors.description && (
          <p className="text-destructive text-sm">{errors.description.message}</p>
        )}
        <Input
          type="submit"
          value="Создать"
          className="cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"
        />
      </form>
    </Container>
  );
};

export default CreateProductPage;
