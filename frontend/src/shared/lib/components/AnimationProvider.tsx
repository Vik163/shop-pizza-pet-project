import {
   ReactNode,
   createContext,
   useContext,
   useEffect,
   useMemo,
   useRef,
   useState,
} from 'react';

type SpringType = typeof import('@react-spring/web');
type GestureType = typeof import('@use-gesture/react');

interface AnimationContextPayload {
   Gesture?: GestureType;
   Spring?: SpringType;
   isLoaded?: boolean;
}

// создаю классический реактовский провайдер
// не глобальный, поэтому в shared
const AnimationContext = createContext<AnimationContextPayload>({});

// Ленивая подгрузка библиотек
const getAsyncAnimationModules = async () => {
   return Promise.all([
      import('@react-spring/web'),
      import('@use-gesture/react'),
   ]);
};

// значения из контекста
export const useAnimationLibs = () => {
   return useContext(AnimationContext) as Required<AnimationContextPayload>;
};

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
   const GestureRef = useRef<GestureType>();
   const SpringRef = useRef<SpringType>();
   const [isLoaded, setIsLoaded] = useState(false);

   useEffect(() => {
      getAsyncAnimationModules().then(([Spring, Gesture]) => {
         GestureRef.current = Gesture;
         SpringRef.current = Spring;
         setIsLoaded(true);
      });
   }, []);

   const value = useMemo(
      () => ({
         Gesture: GestureRef.current,
         Spring: SpringRef.current,
         isLoaded,
      }),
      [],
   );
   return (
      <AnimationContext.Provider value={value}>
         {children}
      </AnimationContext.Provider>
   );
};
