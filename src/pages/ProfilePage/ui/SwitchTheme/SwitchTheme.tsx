import { memo } from 'react';

import { useSelector } from 'react-redux';
import cls from './SwitchTheme.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { SwitchUI } from '@/shared/ui/SwitchUI';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { getUserSettings, saveUserSettings } from '@/entities/User';

export const SwitchTheme = memo(() => {
   const dispatch = useAppDispatch();
   const userSettings = useSelector(getUserSettings);

   const { theme, toggleTheme } = useTheme();

   const onToggleTheme = (id: string) => {
      if (id === 'theme')
         toggleTheme((newTheme) => {
            dispatch(
               saveUserSettings({
                  ...userSettings,
                  theme: newTheme,
               }),
            );
         });
   };

   return (
      <VStack className={cls.switch} align={FlexAlign.START}>
         <Text fontSize={FontSize.SIZE_14} fontWeight={FontWeight.TEXT_700}>
            Цветовая тема
         </Text>
         <SwitchUI
            variant='theme'
            labelLeft='тёмная'
            labelRight='светлая'
            fontSizeLabel={FontSize.SIZE_14}
            fontWeightLabel={FontWeight.TEXT_700}
            fontColorLabel={FontColor.TEXT_PRIMARY}
            className={cls.switchTheme}
            width={70}
            onToggle={onToggleTheme}
            isChecked={theme !== 'app_dark_theme'}
         />
      </VStack>
   );
});
