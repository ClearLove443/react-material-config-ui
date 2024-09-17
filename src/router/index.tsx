import type { RouteObject } from "react-router-dom";
import Layout from "../component/Layout";
import DataSourceTablePage from "../page/DataSouceTablePage";
import DataSourcePage from "../page/DataSourcePage";
import HomePage from "../page/HomePage";
import FullFeaturedCrudGrid from "../page/PBCustomer2";

// const authRoutes: RouteObject = {
//   path: "*",
//   children: [
//     {
//       path: "login",
//       children: [
//         {
//           path: "",
//           element: <LoginPage />,
//         },
//         {
//           path: "validateOtp",
//           element: <Validate2faPage />,
//         },
//       ],
//     },
//     {
//       path: "register",
//       element: <RegisterPage />,
//     },
//   ],
// };

const normalRoutes: RouteObject = {
  path: "*",
  element: <Layout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "data-source",
      children: [
        {
          path: "add",
          element: <DataSourcePage />,
        },
        {
          path: ":action/:sourceUUid",
          element: <DataSourcePage />,
        },
      ],
    },
    {
      path: "data-source/table/:sourceUUid",
      element: <DataSourceTablePage />,
    },
    {
      path: "data-source/table/:sourceId/:tableName",
      element: <DataSourceTablePage />,
    },
    {
      path: "nam-pb/add",
      element: <FullFeaturedCrudGrid />,
    },
    {
      path: "nam-chub/add",
      element: <FullFeaturedCrudGrid />,
    },
    // {
    //   path: "profile",
    //   element: <ProfilePage />,
    // },
  ],
};

const routes: RouteObject[] = [normalRoutes];

export default routes;
