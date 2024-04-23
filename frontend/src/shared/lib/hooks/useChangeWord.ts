export const useChangeWord = (num: number) => {
   let word: string = '';
   const oneNum = Number(num.toString().slice(-1));

   if (
      (num > 4 && num < 21) ||
      (num > 110 && num <= 120) ||
      (oneNum > 4 && oneNum <= 9) ||
      oneNum === 0
   ) {
      word = 'товаров';
   } else if (oneNum === 1) {
      word = 'товар';
   } else if (oneNum > 1 && oneNum < 5) word = 'товара';

   return { word };
};
