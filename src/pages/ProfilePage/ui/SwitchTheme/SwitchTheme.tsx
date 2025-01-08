import { memo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './SwitchTheme.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { SwitchUI } from '@/shared/ui/SwitchUI';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
   getUserSettings,
   userAction,
   useSetUserSettingsMutation,
} from '@/entities/User';
import { LOCALSTORAGE_USER_KEY } from '@/shared/const/localstorage';

export const SwitchTheme = memo(() => {
   const dispatch = useAppDispatch();
   const userSettings = useSelector(getUserSettings);
   const [setUserSettings, result] = useSetUserSettingsMutation();
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);

   const { theme, toggleTheme } = useTheme();

   const onToggleTheme = (id: string) => {
      if (id === 'theme' && userId)
         toggleTheme((newTheme) => {
            setUserSettings({
               userId,
               userSettings: {
                  ...userSettings,
                  theme: newTheme,
               },
            });
         });
   };

   useEffect(() => {
      if (result.data) {
         dispatch(userAction.setAuthData(result.data));
      }
   }, [dispatch, result.data]);

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
