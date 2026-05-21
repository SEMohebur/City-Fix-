import { createBrowserRouter } from "react-router";
import Rootlayout from "../Layout/Rootlayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import NotfoundPage from "../Pages/NotfoundPage";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import MyIssues from "../Pages/MyIssues";
import CreateIssues from "../Pages/CreateIssues";
import MyInfo from "../Pages/MyInfo";
import AllIssues from "../Pages/AllIssues";
import IssueDetaile from "../Pages/IssueDetaile";
import PrivateRoute from "./PrivateRoute";
import UpdateIssue from "../Pages/UpdateIssue";
import ManageIssue from "../Pages/Admin/ManageIssue";
import ManageStaff from "../Pages/Admin/ManageStaff";
import CreateStaff from "../Pages/Admin/CreateStaff";
import DashBoard_Admin from "../Pages/Admin/DashBoard_Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout></Rootlayout>,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home></Home> },
      { path: "/about", element: <About></About> },
      { path: "/allIssues", element: <AllIssues></AllIssues> },
      { path: "/contact", element: <Contact></Contact> },
      { path: "/login", element: <Login></Login> },
      { path: "/register", element: <Register></Register> },
      {
        path: "/myInfo",
        element: <MyInfo></MyInfo>,
      },
      {
        path: "/myIssues",
        element: <MyIssues></MyIssues>,
      },
      {
        path: "/createIssue",
        element: (
          <PrivateRoute>
            <CreateIssues></CreateIssues>
          </PrivateRoute>
        ),
      },
      {
        path: "/issueDetaile/:id",
        element: (
          <PrivateRoute>
            <IssueDetaile></IssueDetaile>
          </PrivateRoute>
        ),
      },
      {
        path: "/issueUpdate/:id",
        element: (
          <PrivateRoute>
            <UpdateIssue></UpdateIssue>
          </PrivateRoute>
        ),
      },

      // Admin routs=======================
      {
        path: "/manageIssues",
        element: (
          <PrivateRoute>
            <ManageIssue></ManageIssue>
          </PrivateRoute>
        ),
      },
      {
        path: "/manageStaff",
        element: (
          <PrivateRoute>
            <ManageStaff></ManageStaff>
          </PrivateRoute>
        ),
      },
      {
        path: "/createStaff",
        element: (
          <PrivateRoute>
            <CreateStaff></CreateStaff>
          </PrivateRoute>
        ),
      },

      {
        path: "/dashboard_admin",
        element: (
          <PrivateRoute>
            <DashBoard_Admin></DashBoard_Admin>
          </PrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotfoundPage></NotfoundPage> },
]);
