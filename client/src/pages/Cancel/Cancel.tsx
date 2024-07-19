import { FC } from "react";
import style from "./Cancel.module.scss";

const Cancel: FC = () => {
  return (
    <div className={style["cancel"]}>
      <h2>Cancel</h2>
    </div>
  );
};

export default Cancel;
