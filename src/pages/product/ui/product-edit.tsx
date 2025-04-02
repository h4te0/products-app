import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { useProductsStore } from '@/entities/product';
import { createProductSchema, TFormCreateProductValues } from '@/features/create-product';

import { Container } from '@/shared/ui/container';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';

interface Props {
  setIsEdit: (_: boolean) => void;
}

export const ProductEdit = ({ setIsEdit }: Props) => {
  const { editProduct, currentProduct } = useProductsStore(
    useShallow((state) => ({
      editProduct: state.editProduct,
      currentProduct: state.currentProduct,
    })),
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormCreateProductValues>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      title: currentProduct.title,
      price: currentProduct.price,
      description: currentProduct.description,
      image: currentProduct.image,
    },
  });

  const onSubmit: SubmitHandler<TFormCreateProductValues> = (data) => {
    console.log(data);
    editProduct(data);
    setIsEdit(false);
  };

  return (
    <Container>
      <div className="flex items-center gap-4">
        <div
          className="w-8 h-8 flex justify-center items-center cursor-pointer"
          onClick={() => setIsEdit(false)}>
          <ChevronLeft className="w-full h-full" />
        </div>
        <h1 className="text-3xl font-bold my-4">Редактирование товара {currentProduct.title}</h1>
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <Input placeholder="Название товара" type="text" {...register('title')} />
        {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
        <Input
          placeholder="Цена товара"
          type="number"
          step="any"
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
          value="Редактировать"
          className="cursor-pointer hover:bg-gray-100 transition-colors duration-300 ease-in-out"
        />
      </form>
    </Container>
  );
};
