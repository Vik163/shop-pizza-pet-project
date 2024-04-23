import {
   Ref,
   forwardRef,
   memo,
   useCallback,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPageProducts.module.scss';
import { type Product } from '@/entities/Product';
import {
   HeaderTagType,
   Text,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { useProductsFilters } from '../../../lib/hooks/useProductsFilter';
import { fetchViewProducts } from '../../../model/services/fetchViewProducts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import {
   getEntityProducts,
   mainPageActions,
} from '../../../model/slices/mainPageSlice';
import { ProductsList } from '@/entities/Product';
import { paginateElements } from '@/shared/const/paginate_elements';
import { getSaveScroll } from '@/features/ScrollSave';
import { getCards } from '../../../model/selectors/productsSelector';
import {
   getIsLoadingProducts,
   getPageHasMore,
   getPageProductsNum,
   getViewProducts,
} from '../../../model/selectors/paginateSelector';
import { TypeProducts } from '../model/types/mainPageProducts';
import { nameViewProducts } from '@/shared/const/product_const';
import { PageSelect } from './PageSelect/PageSelect';
import { getUserSettings } from '@/entities/User';
import { Modal } from '@/shared/ui/Modal';
import { OrderProductsModal } from '@/features/OrderProducts';
import { additivesActions } from '@/entities/Additives';

interface MainPageProductsProps {
   className?: string;
}

export interface RefType {
   onLoadNextPart: () => void;
}

const MainPageProducts = forwardRef(
   (props: MainPageProductsProps, ref: Ref<RefType>) => {
      const { className } = props;
      const dispatch = useAppDispatch();
      const { pathname } = useLocation();
      const [productInfo, setProductInfo] = useState<Product>();
      const [isOpenModal, setIsOpenModal] = useState(false);
      const [isClosing, setIsClosing] = useState(false);
      const products: Product[] = useSelector(getEntityProducts.selectAll);
      const cards = useSelector(getCards);
      const isLoading = useSelector(getIsLoadingProducts);
      const refProducts = useRef<HTMLDivElement>(null);
      const { onChangeViewProducts } = useProductsFilters();
      const scroll = useSelector(getSaveScroll);
      const viewProduct = useSelector(getViewProducts);
      const page = useSelector(getPageProductsNum);
      const hasMoreProducts = useSelector(getPageHasMore);
      const { viewLoadProducts } = useSelector(getUserSettings);

      // Преобразуем путь (убираем слеш) ====================
      const checkViewProductFromPath = () => {
         const path = pathname.slice(1) as keyof TypeProducts;
         if (nameViewProducts[path]) return path;
      };

      useEffect(() => {
         const pathProduct = checkViewProductFromPath();

         if (pathProduct) onChangeViewProducts(pathProduct);
      }, [pathname]);

      // Запрос при переключении вида загрузки и сброс стейта
      useEffect(() => {
         dispatch(mainPageActions.setProducts({}));
         dispatch(
            fetchViewProducts({
               page: 1,
               // меняет, а не добавляет
               replace: pathname,
            }),
         );
      }, [viewLoadProducts]);

      // Сбор данных в стейт =========================
      useEffect(() => {
         if (products.length) {
            if (viewProduct === products[0].type) {
               if (viewLoadProducts === 'scroll') {
                  dispatch(
                     mainPageActions.setProducts({
                        ...cards,
                        [viewProduct as string]: products,
                     }),
                  );
               } else {
                  dispatch(
                     mainPageActions.setProducts({
                        [viewProduct as string]: products,
                     }),
                  );
               }
            }
         }
      }, [products]);

      // первоначальный запрос при изменении страницы если нет данных в стейте
      useEffect(() => {
         if (!cards[viewProduct]) {
            dispatch(
               fetchViewProducts({
                  page: 1,
                  replace: viewProduct || '',
               }),
            );
         }
      }, [viewProduct, cards]);

      // Бесконечный скролл =======================================
      const onLoadNextPart = () => {
         if (scroll[viewProduct]) {
            if (hasMoreProducts && window.scrollY > scroll[viewProduct])
               dispatch(
                  fetchViewProducts({
                     page: page + 1,
                  }),
               );
         } else if (hasMoreProducts)
            dispatch(
               fetchViewProducts({
                  page: page + 1,
               }),
            );
      };

      useImperativeHandle(ref, () => ({
         onLoadNextPart,
      }));

      const onOpenModal = (card: Product) => {
         setProductInfo(card);
         setIsOpenModal(true);
      };

      const onCloseModal = () => {
         setProductInfo(undefined);
         setIsOpenModal(false);
         // сброс цены в селекторе
         dispatch(
            additivesActions.additivesSelect({
               orderAdditives: [],
            }),
         );
      };

      const handleAnimate = useCallback((bool: boolean) => {
         setIsClosing(bool);
      }, []);

      return (
         <div
            ref={refProducts}
            className={classNames(cls.MainPageProducts, {}, [className])}
         >
            <Text
               className={classNames(cls.title)}
               title={HeaderTagType.H_3}
               fontSize={FontSize.SIZE_32}
               fontWeight={FontWeight.TEXT_900}
               fontColor={FontColor.TEXT_YELLOW}
               max
            >
               {nameViewProducts[viewProduct]}
            </Text>
            <ProductsList
               products={cards[viewProduct]}
               isLoading={isLoading}
               skeletonElements={paginateElements}
               onModal={onOpenModal}
            />
            {viewLoadProducts === 'pages' && <PageSelect />}
            {isOpenModal && productInfo && (
               // если нет то модалка не встраивается
               <Modal
                  onAnimate={handleAnimate}
                  isOpen={isOpenModal}
                  onClose={onCloseModal}
                  className={classNames(
                     cls.modal,
                     { [cls.modalActive]: isClosing },
                     [],
                  )}
                  delayClose={300}
                  lazy
                  buttonCloseHeight={40}
                  buttonCloseRight={30}
                  buttonCloseTop={30}
                  buttonCloseWidth={40}
               >
                  <OrderProductsModal
                     onCloseModal={onCloseModal}
                     productInfo={productInfo}
                  />
               </Modal>
            )}
         </div>
      );
   },
);

export const MainPageProductsMemo = memo(MainPageProducts);
