import { createBrowserRouter, redirect } from "react-router";
import MarketingLayout from "./components/MarketingLayout";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import ProductView from "./pages/dashboard/ProductView";
import { getSession } from "./lib/auth";

const requireSession = ({ request }) => {
  if (!getSession()) {
    const next = new URL(request.url).pathname;
    throw redirect(`/login?next=${encodeURIComponent(next)}`);
  }
  return null;
};
const redirectIfSignedIn = () => (getSession() ? redirect("/dashboard") : null);

export const router = createBrowserRouter([
  {
    element: <MarketingLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/services", element: <Services /> },
      { path: "/products", element: <Products /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  { path: "/login", element: <Login />, loader: redirectIfSignedIn },
  { path: "/signup", element: <Signup />, loader: redirectIfSignedIn },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    loader: requireSession,
    children: [
      { index: true, element: <Overview /> },
      { path: ":slug", element: <ProductView /> },
    ],
  },
]);
