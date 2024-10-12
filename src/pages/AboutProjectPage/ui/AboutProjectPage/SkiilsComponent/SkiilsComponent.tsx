import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './SkiilsComponent.module.scss';

import plus from '@/shared/assets/icons/plus.svg';
import minus from '@/shared/assets/icons/minus.svg';
import { Icon } from '@/shared/ui/Icon';
import { Button } from '@/shared/ui/Button';
import { useOpenBlock } from '../../../lib/hooks/useOpenBlock';
import { Text } from '@/shared/ui/Text';

interface SkiilsComponentProps {
   className?: string;
   skills: Record<string, string[] | undefined>;
}

export const SkiilsComponent = memo((props: SkiilsComponentProps) => {
   const { className, skills } = props;
   const { nameOpenBlock, openBlock } = useOpenBlock();

   return (
      <ul className={classNames(cls.Layout, {}, [className])}>
         {Object.entries(skills).map(([name, value]) =>
            value ? (
               <li key={name} className={cls.skills}>
                  <Button
                     className={cls.titleSkill}
                     onClick={() => openBlock(name)}
                  >
                     <Icon
                        Svg={nameOpenBlock.includes(name) ? minus : plus}
                        className={cls.addIcon}
                        width={20}
                        height={20}
                     />
                     {name}
                  </Button>
                  {nameOpenBlock.includes(name) &&
                     value.map((text) => (
                        <Text key={text} className={cls.text}>
                           {text}
                        </Text>
                     ))}
               </li>
            ) : (
               <li
                  className={classNames(cls.titleSkill, {}, [
                     cls.cursorDefault,
                  ])}
                  key={name}
               >
                  &emsp;&ensp;{name}
               </li>
            ),
         )}
      </ul>
   );
});
