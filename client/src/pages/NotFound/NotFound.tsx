import { FC } from "react";
import { Link } from "react-router-dom";
import style from "./NotFound.module.scss";

const NotFound: FC = () => {
  return (
    <div className={style["not-found"]}>
      <h1 className="title">404 - Page Not Found</h1>
      <p className="not-found-message">
        The page you are looking for does not exist
      </p>
      <Link to="/" className={"back-to-home"}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
