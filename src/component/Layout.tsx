import { Outlet } from "react-router-dom";
import SideBar from "./SideBar.tsx";

const Layout = () => {
  return (
    <>
      <SideBar />
      <Outlet />
    </>
  );
};

export default Layout;
