import {
   Ref,
   forwardRef,
   memo,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './MainPageProducts.module.scss';
import {
   PaginateData,
   ProductView,
   ViewProducts,
   getEntityProducts,
   getIsLoadingProducts,
   getSavePage,
   getViewProducts,
   type Product,
} from '@/entities/Product';
import {
   HeaderTagType,
   Text,
   FontColor,
   FontSize,
   FontWeight,
} from '@/shared/ui/Text';
import { useProductsFilters } from '../../../lib/hooks/useProductsFilter';
import { fetchViewProducts } from '../../../../../entities/Product/model/services/fetchViewProducts';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { mainPageActions } from '../../../model/slices/mainPageSlice';
import {
   ProductsList,
   getPaginateProduct,
   getSaveScroll,
} from '@/entities/Product';
import { paginateElements } from '@/shared/const/paginate_elements';
import { getCards } from '../../../model/selectors/productsSelector';

import { nameViewProducts } from '@/shared/const/product_const';
import { PageSelect } from './PageSelect/PageSelect';
import { getUserSettings } from '@/entities/User';
import { additivesActions } from '@/entities/Additives';
import { ModalOrderProduct, RefTypeModal } from '@/features/ModalOrderProduct';
import { useResize } from '@/shared/lib/hooks/useResize';

interface MainPageProductsProps {
   className?: string;
}

export interface RefType {
   onLoadNextPart: () => void;
}

const MainPageProducts = forwardRef(
   (props: MainPageProductsProps, ref: Ref<RefType>) => {
      const { className } = props;
      const childRef = useRef<RefTypeModal>(null);

      const dispatch = useAppDispatch();
      const { pathname } = useLocation();
      const products: Product[] = useSelector(getEntityProducts.selectAll);
      const cards = useSelector(getCards);
      const isLoading = useSelector(getIsLoadingProducts);
      const refProducts = useRef<HTMLDivElement>(null);
      const { onChangeViewProducts } = useProductsFilters();
      const scroll = useSelector(getSaveScroll);
      const savePage = useSelector(getSavePage);
      const viewProduct = useSelector(getViewProducts) as ProductView;
      const paginate = useSelector(getPaginateProduct);
      const [paginateData, setPaginateData] = useState<PaginateData>();
      const { isMobile } = useResize();
      const { viewLoadProducts } = useSelector(getUserSettings);

      const productsFromPageLoud = (arr: Product[]) => {
         if (paginateData)
            return arr.filter(
               (item, index) =>
                  index >= (paginateData.page - 1) * paginateElements &&
                  index < paginateData.page * paginateElements &&
                  item,
            );
      };

      // Преобразуем путь (убираем слеш) ====================
      const checkViewProductFromPath = () => {
         const path = pathname.slice(1) as keyof ViewProducts;
         if (path && nameViewProducts[path]) return path;
      };

      // Для старта если в cards есть данные
      // для определения номера страницы. paginateData не успевает. Если добавить ее в зависимость, то бесконечный запрос
      const getNumPage = () => {
         const currentNum = cards[viewProduct]?.length;

         const numPages =
            currentNum &&
            currentNum >= paginateElements &&
            currentNum / paginateElements;

         return numPages;
      };

      useEffect(() => {
         if (viewProduct) setPaginateData(paginate[viewProduct]);
      }, [viewProduct, viewLoadProducts, paginate]);

      useEffect(() => {
         const pathProduct = checkViewProductFromPath();

         if (pathProduct) onChangeViewProducts(pathProduct);
      }, [pathname]);

      // Сбор данных в стейт =========================
      useEffect(() => {
         if (products.length && viewProduct === products[0].type) {
            if (viewLoadProducts === 'scroll' || isMobile) {
               dispatch(
                  mainPageActions.setProducts({
                     ...cards,
                     [viewProduct as string]: products,
                  }),
               );
            } else if (viewLoadProducts === 'pages' && !isMobile) {
               // при переходе на выбор страниц отрисовывает элементы, на которых остановилась прокрутка (при бесконечном скролле)
               // выбирает из массива нужные
               if (products.length > paginateElements) {
                  dispatch(
                     mainPageActions.setProducts({
                        [viewProduct as string]: productsFromPageLoud(products),
                     }),
                  );
               } else {
                  // обычная отрисовка
                  dispatch(
                     mainPageActions.setProducts({
                        [viewProduct as string]: products,
                     }),
                  );
               }
            }
         }
      }, [products, viewLoadProducts, viewProduct]);

      // первоначальный запрос при изменении страницы если нет данных в стейте
      useEffect(() => {
         if (viewLoadProducts === 'scroll' || isMobile) {
            if (!cards[viewProduct]) {
               // разбиваю на два, чтобы не было второго запроса
               if (viewProduct === pathname.slice(1)) {
                  dispatch(
                     fetchViewProducts({
                        page: 1,
                        replace: viewProduct,
                     }),
                  );
               } else if (pathname === '/') {
                  dispatch(
                     fetchViewProducts({
                        page: 1,
                        replace: 'pizzas',
                     }),
                  );
               }
            } else {
               // Понадобился из-за бага. При загрузке стартовой страницы в cards-pizzas записываются карточки. Не скроля эту страницу
               // перехожу на другую и т ам скролю. Возвращаюсь на pizzas - бесконечный скролл не работает. Причина createEntityAdapter
               // в productsSlice (addMany добавляет в конец, setAll перезатирает) пришлось добавить в запросе replace то,чтобы отработал setAll
               // иначе добавлялись разных видов карты
               const page = getNumPage();
               if (page && page === 1)
                  dispatch(
                     fetchViewProducts({
                        page: 1,
                        replace: viewProduct,
                     }),
                  );
            }
         } else if (viewLoadProducts === 'pages' && !isMobile) {
            dispatch(
               fetchViewProducts({
                  page: savePage[viewProduct] ? savePage[viewProduct].page : 1,
                  replace: viewProduct,
               }),
            );
         }
      }, [viewProduct, viewLoadProducts]);

      // Бесконечный скролл =======================================
      const onLoadNextPart = () => {
         if (paginateData) {
            if (scroll[viewProduct]) {
               if (
                  paginateData.hasMore &&
                  window.scrollY > scroll[viewProduct].position
               ) {
                  dispatch(
                     fetchViewProducts({
                        page: paginateData.page + 1,
                     }),
                  );
               }
            }
            //
            else if (paginateData.hasMore) {
               dispatch(
                  fetchViewProducts({
                     page: paginateData.page + 1,
                  }),
               );
            }
         }
      };

      useImperativeHandle(ref, () => ({
         onLoadNextPart,
      }));

      // пробрасываю функцию в модалку через реф
      const openModal = (card: Product) => {
         childRef.current?.openModal(card);
      };

      const onCloseModal = () => {
         // сброс цены в селекторе
         dispatch(
            additivesActions.additivesSelect({
               orderAdditives: [],
            }),
         );
      };

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
               onModal={openModal}
            />
            {viewLoadProducts === 'pages' && paginateData && !isMobile && (
               <PageSelect paginateData={paginateData} />
            )}
            <ModalOrderProduct ref={childRef} onCloseModal={onCloseModal} />
         </div>
      );
   },
);

export const MainPageProductsMemo = memo(MainPageProducts);
