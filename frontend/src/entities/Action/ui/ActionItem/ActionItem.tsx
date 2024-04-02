import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './ActionItem.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { Action } from '../../model/types/actions';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';

interface ActionItemProps {
   className?: string;
   action: Action;
}

export const ActionItem = memo((props: ActionItemProps) => {
   const { className, action } = props;

   return (
      <VStack className={classNames(cls.ActionItem, {}, [className])}>
         <img className={cls.image} src={action.image} alt={action.title} />
         <Text>{action.title}</Text>
         <Text>{action.description}</Text>
         <Button>Посмотреть</Button>
      </VStack>
   );
});
