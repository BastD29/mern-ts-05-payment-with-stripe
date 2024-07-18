import { FC } from "react";
import Checkout from "../Checkout/Checkout";
import style from "./App.module.scss";

const App: FC = () => {
  return (
    <div className={style["app"]}>
      <Checkout />
    </div>
  );
};

export default App;
