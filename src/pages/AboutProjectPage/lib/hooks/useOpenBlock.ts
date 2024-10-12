import { useState } from 'react';

export const useOpenBlock = () => {
   const [nameOpenBlock, setNameOpenBlock] = useState<string[]>([]);

   const openBlock = (name: string) => {
      setNameOpenBlock(
         nameOpenBlock?.includes(name)
            ? nameOpenBlock.filter((i) => i !== name)
            : nameOpenBlock.concat(name),
      );
   };

   return { nameOpenBlock, openBlock };
};
