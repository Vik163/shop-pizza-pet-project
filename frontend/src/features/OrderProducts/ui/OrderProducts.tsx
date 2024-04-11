import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./OrderProducts.module.scss";

interface OrderProductsProps {
  className?: string;
}

export const OrderProducts = memo((props: OrderProductsProps) => {
  const { className } = props;

  return <div className={classNames(cls.OrderProducts, {}, [className])}></div>;
});
