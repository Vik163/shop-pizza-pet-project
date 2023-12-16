import { memo } from "react";
import { classNames } from "@/shared/lib/classNames/classNames";

import cls from "./[FTName].module.scss";

interface <FTName | capitalize>Props {
  className?: string;
}

export const <FTName | capitalize> = memo((props: <FTName | capitalize>Props) => {
  const { className } = props;

  return <div className={classNames(cls.<FTName | capitalize>, {}, [className])}></div>;
});
