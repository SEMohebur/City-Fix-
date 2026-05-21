import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";
import SidebarComponent from "../Components/SidebarComponent";

const Rootlayout = () => {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <Navbar></Navbar>
          {/* Page content here */}
          <Outlet></Outlet>
        </div>
        {/* Sidebar content here */}
        <SidebarComponent></SidebarComponent>
      </div>
    </div>
  );
};

export default Rootlayout;
