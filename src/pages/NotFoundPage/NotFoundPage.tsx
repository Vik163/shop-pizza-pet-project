import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './NotFoundPage.module.scss';
import { FontColor, FontSize, Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { VStack } from '@/shared/ui/Stack';
import { FlexJustify } from '@/shared/ui/Stack/Flex';

interface NotFoundPageProps {
   className?: string;
}

export const NotFoundPage = memo((props: NotFoundPageProps) => {
   const { className } = props;
   const navigate = useNavigate();

   const goBack = () => {
      if (window.history?.length && window.history.length > 1) {
         navigate(-1);
      } else {
         navigate('/', { replace: true });
      }
   };

   return (
      <VStack
         className={classNames(cls.NotFoundPage, {}, [className])}
         justify={FlexJustify.CENTER}
         gap={50}
      >
         <Text fontSize={FontSize.SIZE_38} fontColor={FontColor.TEXT_ORANGE}>
            Страница не найдена
         </Text>
         <Button fontSize={FontSize.SIZE_17} onClick={goBack}>
            🡰 &ensp; Вернуться назад
         </Button>
      </VStack>
   );
});
