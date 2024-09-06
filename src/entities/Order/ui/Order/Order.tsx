import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./Order.module.scss";

interface OrderProps {
  className?: string;
}

export const Order = memo((props: OrderProps) => {
  const { className } = props;

  return <div className={classNames(cls.Order, {}, [className])}></div>;
});
