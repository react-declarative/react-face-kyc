import { ISwitchItem } from "react-declarative";

import ErrorPage from "../pages/ErrorPage/ErrorPage";
import MainPage from "../pages/MainPage/MainPage";
import DonePage from "../pages/DonePage/DonePage";

export const routes: ISwitchItem[] = [
  {
    path: "/",
    redirect: "/main-page",
  },
  {
    path: "/main-page",
    element: MainPage,
  },
  {
    path: "/done-page",
    element: DonePage,
  },
  {
    path: "/error-page",
    element: ErrorPage,
  },
];

export default routes;
