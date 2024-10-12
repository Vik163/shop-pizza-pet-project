import React, { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AboutProjectPage.module.scss';
import { FontSize, HeaderTagType, Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import { VStack } from '@/shared/ui/Stack';

import plus from '@/shared/assets/icons/plus.svg';
import minus from '@/shared/assets/icons/minus.svg';
import { Icon } from '@/shared/ui/Icon';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { Button } from '@/shared/ui/Button';
import { technologies } from '../../model/constants/technologies';
import { useOpenBlock } from '../../lib/hooks/useOpenBlock';
import { SkiilsComponent } from './SkiilsComponent/SkiilsComponent';

export interface AboutProjectPageProps {
   className?: string;
}

const AboutProjectPage = memo((props: AboutProjectPageProps) => {
   const { className } = props;
   const { nameOpenBlock, openBlock } = useOpenBlock();
   // const [nameOpenBlock, setNameOpenBlock] = useState<string[]>([]);

   // const openBlock = (name: string) => {
   //    setNameOpenBlock(
   //       nameOpenBlock?.includes(name)
   //          ? nameOpenBlock.filter((i) => i !== name)
   //          : nameOpenBlock.concat(name),
   //    );
   // };

   return (
      <Page className={classNames(cls.AboutProject, {}, [className])}>
         <Text title={HeaderTagType.H_1} fontSize={FontSize.SIZE_32}>
            О проекте
         </Text>
         <Text className={cls.description}>
            Проект создавал, чтобы проверить себя - что из этого получится.
            <br />
            Верстка - свободный макет (figma). Логика - что-то сам, что-то с
            сайта &quot;Додо пицца&quot;
            <br />
            Работа полностью не закончена. Считаю, остались мелочи, которые
            можно отложить.
         </Text>
         <VStack
            className={cls.technologies}
            max
            align={FlexAlign.START}
            gap={30}
         >
            <Text
               title={HeaderTagType.H_2}
               className={cls.title}
               fontSize={FontSize.SIZE_18}
            >
               Что и как применял.
            </Text>

            {technologies.map((item) => (
               <VStack
                  key={item.name}
                  className={cls.technology}
                  max
                  align={FlexAlign.START}
               >
                  <Button
                     className={cls.titleTechnology}
                     fontSize={FontSize.SIZE_22}
                     onClick={() => openBlock(item.name)}
                  >
                     <Icon
                        Svg={nameOpenBlock.includes(item.name) ? minus : plus}
                        className={cls.addIcon}
                        width={20}
                        height={20}
                     />
                     {item.name}
                  </Button>
                  {nameOpenBlock.includes(item.name) && (
                     <SkiilsComponent skills={item.skills} />
                  )}
               </VStack>
            ))}
         </VStack>
      </Page>
   );
});

export default AboutProjectPage;
