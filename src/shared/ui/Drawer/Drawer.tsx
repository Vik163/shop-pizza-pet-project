import React, {
   memo,
   ReactNode,
   useCallback,
   useEffect,
   useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
   AnimationProvider,
   useAnimationLibs,
} from '@/shared/lib/components/AnimationProvider';
import cls from './Drawer.module.scss';
import { Portal } from '../Portal/Portal';
import { useTheme } from '@/shared/lib/hooks/useTheme';
import { HStack } from '../Stack';
import { Icon } from '../Icon';
import Logo from '@/shared/assets/icons/shop_logo.png';
import closeIcon from '@/shared/assets/icons/closeNav.svg';
import { FlexJustify } from '../Stack/Flex';
import { Overlay } from '../Overlay';

interface DrawerProps {
   className?: string;
   children: ReactNode;
   isOpen?: boolean;
   onClose?: () => void;
}

// высота - общий размер окна
const height = 480;

export const DrawerContent = memo((props: DrawerProps) => {
   const { Spring, Gesture } = useAnimationLibs();
   const [{ y }, api] = Spring.useSpring(() => ({ y: height * -1 }));
   const { theme } = useTheme();
   const { className, children, onClose, isOpen } = props;
   const [isOpenDrawer, setIsOpenDrawer] = useState(false);
   const [isOpenOverlayWithAnimation, setIsOpenOverlayWithAnimation] =
      useState(false);

   const onOpenDrawer = () => {
      setIsOpenDrawer(true);
   };

   const onCloseDrawer = () => {
      setIsOpenDrawer(false);
      if (onClose) onClose();
   };

   const openDrawer = useCallback(() => {
      setIsOpenOverlayWithAnimation(true);

      // открывая дровер запускаем анимацию
      api.start({ y: 0, immediate: false, onResolve: onOpenDrawer });
   }, [api]);

   const close = (velocity = 0) => {
      setIsOpenOverlayWithAnimation(false);
      // закрывая дровер запускаем анимацию
      api.start({
         y: height * -1,
         immediate: false, // true - мгновенно, false - анимация
         config: { ...Spring.config.stiff, velocity },
         onResolve: onCloseDrawer, // срабатывает при завершении
      });
   };

   useEffect(() => {
      if (isOpen) {
         openDrawer();
      }
   }, [api, isOpen, openDrawer]);

   // возвращает хандлеры (onDrag и т.п.), необходимые для drag-and-drop
   const bind = Gesture.useDrag(
      ({
         last, // когда тащишь false, отпускаешь true
         velocity: [, vy], // скорость перемещения от 0 до 1 (pixels / ms)
         direction: [, dy], // вниз 1, вверх -1
         movement: [, my], // вниз - положительные значения (px), вниз - отрицательные
         cancel,
      }) => {
         if (my > 70) cancel();

         if (last) {
            if (my < height * -0.5 || (vy > 0.5 && dy < 0)) {
               close();
            } else {
               openDrawer();
            }
         } else {
            api.start({ y: my, immediate: true });
         }
      },
      {
         from: () => [0, y.get()], // откуда тащишь (координаты)
         filterTaps: true, // Если true, компонент не запустит логику перетаскивания, если пользователь просто нажал на компонент
         bounds: { bottom: 0 }, // Ограничивает "смещение" жеста указанными границами.
         rubberband: true, // Коэффициент эластичности жеста при выходе за пределы поля. Если значение true, коэффициент эластичности по умолчанию будет равен 0,15
      },
   );

   if (!isOpen) {
      return null;
   }

   const display = y.to((py) => (py < height ? 'block' : 'none')); // py - вниз - положительные значения (px), вниз - отрицательные

   return (
      <Portal element={document.getElementById('app') ?? document.body}>
         <div
            className={classNames(
               cls.Drawer,
               { [cls.openDrower]: isOpenDrawer },
               [className, theme],
            )}
         >
            <Spring.a.div
               className={cls.sheet}
               style={{
                  display,
                  y,
               }}
               {...bind()}
            >
               <HStack
                  max
                  justify={FlexJustify.BETWEEN}
                  className={cls.logoContainer}
               >
                  <Icon src={Logo} width={55} height={45} />

                  <Icon
                     className={cls.iconMenu}
                     onClick={() => close()}
                     Svg={closeIcon}
                  />
               </HStack>
               {children}
            </Spring.a.div>
            <Overlay
               onClick={() => close()}
               isAnimate={isOpenOverlayWithAnimation}
               delayClose={200}
            />
         </div>
      </Portal>
   );
});

const DrawerAsync = (props: DrawerProps) => {
   // загружаем библиотеки
   const { isLoaded } = useAnimationLibs();

   if (!isLoaded) {
      return null;
   }

   return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
   return (
      <AnimationProvider>
         <DrawerAsync {...props} />
      </AnimationProvider>
   );
};
