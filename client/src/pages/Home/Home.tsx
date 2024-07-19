import { FC } from "react";
import Checkout from "../../components/Checkout/Checkout";
import style from "./Home.module.scss";

const Home: FC = () => {
  return (
    <div className={style["home"]}>
      <Checkout />
    </div>
  );
};

export default Home;
