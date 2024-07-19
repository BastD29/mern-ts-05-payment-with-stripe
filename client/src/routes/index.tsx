import { RouteObject } from "react-router-dom";
import { HOME, SUCCESS } from "../constants/routes";
import { FC, LazyExoticComponent, lazy } from "react";

const Home: LazyExoticComponent<FC> = lazy(() => import("../pages/Home/Home"));
const Success: LazyExoticComponent<FC> = lazy(
  () => import("../pages/Success/Success")
);

export const routes: RouteObject[] = [
  { path: HOME, element: <Home /> },
  { path: SUCCESS, element: <Success /> },
];
