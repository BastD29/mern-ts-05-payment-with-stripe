import { FC } from "react";
import style from "./Success.module.scss";

const Success: FC = () => {
  return (
    <div className={style["success"]}>
      <h2>Success</h2>
    </div>
  );
};

export default Success;
