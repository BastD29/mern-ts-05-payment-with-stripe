import { FC } from "react";
import style from "./Checkout.module.scss";

const Checkout: FC = () => {
  return (
    <div className={style["checkout"]}>
      <button>Checkout</button>
    </div>
  );
};

export default Checkout;
