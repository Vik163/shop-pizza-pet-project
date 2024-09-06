export const usePhoneValidator = () => {
   const phoneValidator = (value: string) => {
      if (!value) return value;

      const currentValue = value.replace(/[^\d+]/g, '');
      const codeCountry = currentValue.slice(0, 2); // +7
      const codeCity = currentValue.slice(2, 5); // (999)
      const firstBlockNumbers = currentValue.slice(5, 8); // 999
      const secondBlockNumbers = currentValue.slice(8, 10); // 99
      const thirdBlockNumbers = currentValue.slice(10, 12); // 99
      const cvLength = currentValue.length;

      // returns: "+7"
      if (cvLength < 3) return '+7';

      if (cvLength < 6) return `${codeCountry} ${codeCity}`;

      // returns: "+7 (xxx) xxx",
      if (cvLength < 9)
         return `${codeCountry} (${codeCity}) ${firstBlockNumbers}`;

      // returns: "+7 (xxx) xxx-xx",
      if (cvLength < 11)
         return `${codeCountry} (${codeCity}) ${firstBlockNumbers}-${secondBlockNumbers}`;

      // returns: "+7 (xxx) xxx-xx-xx",
      return `${codeCountry} (${codeCity}) ${firstBlockNumbers}-${secondBlockNumbers}-${thirdBlockNumbers}`;
   };

   const checkValidate = (value: string) => {
      let error = '';

      if (!value) error = 'Required!';
      else if (value.length !== 18)
         error = 'Неправильный формат телефона. Ожидается: +7 (999) 999-99-99';

      return error;
   };
   return { phoneValidator, checkValidate };
};
