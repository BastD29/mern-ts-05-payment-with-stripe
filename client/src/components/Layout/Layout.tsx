import { FC, Suspense } from "react";
// import Header from "../Header/Header";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.scss";

const Layout: FC = () => {
  return (
    <div className={style["layout"]}>
      {/* <Header /> */}
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default Layout;
