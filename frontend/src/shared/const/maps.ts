import { LngLat } from '@yandex/ymaps3-types';
import { Coords } from '../types/maps';

export const mainCoordinates = [
   50.198671434081945, 53.20688008343526,
] as LngLat;
// важна очередность, чтобы иконки были по порядку (верхняя - нижний слой -- / -- нижняя - верхний слой)
export const coordsStores: Coords = {
   'Гудок, Красноармейская, 131, секция 188': [50.128006, 53.186877],
   'Амбар, Южное шоссе, 5, секция 188': [50.1738419843127, 53.140474983917876],
   'Аврора, Аэродромная, 47а, секция 188': [
      50.189787957824635, 53.191186119094645,
   ],
   'Космопорт, Дыбенко, 30, секция 188': [
      50.19854268804921, 53.207472681589095,
   ],
   'Парк хаус,  Московское шоссе, 81а, секция 188': [50.199978, 53.233678],
   'Мега, Московское шоссе 24-й километр, 5, секция 188': [
      50.305533, 53.326102,
   ],
};
export const coordCar = [50.218688, 53.2067] as LngLat;
export const mainZoom = 14;
