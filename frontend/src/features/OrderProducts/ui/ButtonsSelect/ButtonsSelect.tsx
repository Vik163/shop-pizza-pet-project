import React, { Dispatch, memo } from 'react';

import cls from './ButtonsSelect.module.scss';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';
import { FlexWrap } from '@/shared/ui/Stack/Flex';
import { classNames } from '@/shared/lib/classNames/classNames';

interface ButtonsSelectProps {
   setSizePizza: Dispatch<React.SetStateAction<string>>;
   setViewDough: Dispatch<React.SetStateAction<string>>;
   viewDough: string;
   sizePizza: string;
}

export const ButtonsSelect = memo((props: ButtonsSelectProps) => {
   const { setSizePizza, setViewDough, viewDough, sizePizza } = props;

   return (
      <HStack gap={10} wrap={FlexWrap.WPAP} className={cls.buttonsContainer}>
         <Button
            onClick={() => setSizePizza('small')}
            className={classNames(
               cls.buttonSmall,
               { [cls.buttonActive]: sizePizza === 'small' },
               [],
            )}
         >
            Маленькая
         </Button>
         <Button
            onClick={() => setSizePizza('average')}
            className={classNames(
               cls.buttonSmall,
               { [cls.buttonActive]: sizePizza === 'average' },
               [],
            )}
         >
            Средняя
         </Button>
         <Button
            onClick={() => setSizePizza('big')}
            className={classNames(
               cls.buttonSmall,
               { [cls.buttonActive]: sizePizza === 'big' },
               [],
            )}
         >
            Большая
         </Button>
         <Button
            onClick={() => setViewDough('традиционное')}
            className={classNames(
               cls.buttonBig,
               { [cls.buttonActive]: viewDough === 'традиционное' },
               [],
            )}
         >
            Традиционное
         </Button>
         <Button
            onClick={() => setViewDough('тонкое')}
            className={classNames(
               cls.buttonBig,
               { [cls.buttonActive]: viewDough === 'тонкое' },
               [],
            )}
         >
            Тонкое
         </Button>
      </HStack>
   );
});
