import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionItem.module.scss';
import { Action } from '../../model/types/actions';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { Button, ButtonBgColor, ButtonVariant } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { VStack } from '@/shared/ui/Stack';
import { FlexAlign } from '@/shared/ui/Stack/Flex';

interface ActionItemProps {
   className?: string;
   action: Action;
}

export const ActionItem = memo((props: ActionItemProps) => {
   const { className, action } = props;

   return (
      <Card
         id={action.title}
         className={classNames(cls.ActionItem, {}, [className])}
      >
         <img className={cls.image} src={action.image} alt={action.title} />
         <VStack className={cls.info} align={FlexAlign.START}>
            <Text fontSize={FontSize.SIZE_20} fontWeight={FontWeight.TEXT_700}>
               {action.title}
            </Text>
            <Text
               className={cls.description}
               fontSize={FontSize.SIZE_13}
               fontWeight={FontWeight.TEXT_500}
            >
               {action.description}
            </Text>
            <a href={action.link} target='_blank' rel='noreferrer'>
               <Button
                  className={cls.button}
                  variant={ButtonVariant.FILLED}
                  bgColor={ButtonBgColor.YELLOW}
                  fontColor={FontColor.TEXT_BUTTON}
                  fontSize={FontSize.SIZE_14}
               >
                  Посмотреть
               </Button>
            </a>
         </VStack>
      </Card>
   );
});
