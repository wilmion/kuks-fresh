import { IProduct, Review } from '../models/interfaces';

// Ordena de mayor a menor un producto por estrellas.
export const sortProductByStars = (products: Array<IProduct>) => {
  const p = products.sort((a, b) => {
    const reviewsA = sumStarsProduct(a.reviews);
    const reviewsB = sumStarsProduct(b.reviews);

    return reviewsB - reviewsA;
  });
  return p;
};

// Suma todas las estrellas del producto.
export const sumStarsProduct = (reviews: Review) => {
  return (
    reviews.one_start +
    reviews.two_start +
    reviews.three_start +
    reviews.for_start +
    reviews.five_start
  );
};

// Busca por el titulo un producto
export const searchByTitleProduct = (products: IProduct[], value: string) => {
  return products.filter((item) =>
    item.title.toLowerCase().includes(value.toLocaleLowerCase())
  );
};

// Busca por Id un producto
export const searchByIdProduct = (products: IProduct[], id: string) => {
  return products.find((p) => p._id === id);
};

// Calcula la puntuación por las reviews de un producto sobre su calificación , retorna un patrón
export const calculateStars = (product: IProduct) => {
  const reviews = product.reviews;
  const totalReviews = sumStarsProduct(product.reviews);

  const denominador: number =
    reviews.five_start * 5 +
    reviews.for_start * 4 +
    reviews.three_start * 3 +
    reviews.two_start * 2 +
    reviews.one_start * 1;

  const puntuation = Math.round(denominador / totalReviews);

  let starsActive: number[] = [];
  let starsInactive: number[] = [];

  switch (puntuation) {
    case 1:
      starsActive = [1];
      starsInactive = [1, 2, 3, 4];
      break;
    case 2:
      starsActive = [1, 2];
      starsInactive = [1, 2, 3];
      break;
    case 3:
      starsActive = [1, 2, 3];
      starsInactive = [1, 2];
      break;
    case 4:
      starsActive = [1, 2, 3, 4];
      starsInactive = [1];
      break;
    case 5:
      starsActive = [1, 2, 3, 4, 5];
      starsInactive = [];
      break;
  }

  return [starsActive, starsInactive];
};

// Retorna un tipo de imagen si el product tiene un tipo en especial
export const getImageByTypeProduct = (product: IProduct) => {
  switch (product.type) {
    case 'lunch':
      return 'assets/icon/lunch-icon.svg';
    case 'drinks':
      return 'assets/icon/drinks-icon.svg';
    case 'breakFast':
      return 'assets/icon/breakfast-icon.svg';
    case 'Desserts':
      return 'assets/icon/desert-icon.svg';
    case 'fastFood':
      return 'assets/icon/fastFood-icon.svg';
  }
};
