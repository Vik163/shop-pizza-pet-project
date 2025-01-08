import { memo, useEffect } from 'react';

import { useSelector } from 'react-redux';
import cls from './SwitchLoadProducts.module.scss';
import { VStack } from '@/shared/ui/Stack';
import { FontColor, FontSize, FontWeight, Text } from '@/shared/ui/Text';
import { FlexAlign } from '@/shared/ui/Stack/Flex';
import { SwitchUI } from '@/shared/ui/SwitchUI';
import { useViewLoadProducts } from '@/shared/lib/hooks/useViewLoadProducts';
import { ViewLoad } from '@/shared/const/view_load';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import {
   getUserSettings,
   useSetUserSettingsMutation,
   userAction,
} from '@/entities/User';
import {
   LOCAL_STORAGE_VIEW_LOAD_KEY,
   LOCALSTORAGE_USER_KEY,
} from '@/shared/const/localstorage';

export const SwitchLoadProducts = memo(() => {
   const dispatch = useAppDispatch();
   const userSettings = useSelector(getUserSettings);
   const { viewLoadProducts } = userSettings;
   const [setUserSettings, result] = useSetUserSettingsMutation();
   const userId = localStorage.getItem(LOCALSTORAGE_USER_KEY);
   const { viewLoad, toggleViewLoad } = useViewLoadProducts();

   const onToggleLoadProducts = (id: string) => {
      if (id === 'load' && userId)
         toggleViewLoad((load: ViewLoad) => {
            setUserSettings({
               userId,
               userSettings: {
                  ...userSettings,
                  viewLoadProducts: load,
               },
            });
         });
   };

   useEffect(() => {
      if (result.data) {
         dispatch(userAction.setAuthData(result.data));
         const settings = result.data.userSettings;
         localStorage.setItem(
            LOCAL_STORAGE_VIEW_LOAD_KEY,
            settings.viewLoadProducts,
         );
      }
   }, [dispatch, result.data]);

   return (
      <VStack className={cls.switch} align={FlexAlign.START}>
         <Text fontSize={FontSize.SIZE_14} fontWeight={FontWeight.TEXT_700}>
            Метод загрузки товаров
         </Text>
         <SwitchUI
            variant='load'
            labelLeft='прокрутка'
            labelRight='страницы'
            fontSizeLabel={FontSize.SIZE_14}
            fontWeightLabel={FontWeight.TEXT_700}
            fontColorLabel={FontColor.TEXT_PRIMARY}
            className={cls.switchTheme}
            width={70}
            onToggle={onToggleLoadProducts}
            isChecked={viewLoadProducts !== ViewLoad.SCROLL}
            value={viewLoad}
         />
      </VStack>
   );
});
