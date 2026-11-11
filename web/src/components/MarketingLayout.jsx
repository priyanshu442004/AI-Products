import { Outlet } from "react-router";
import Nav from "./Nav";
import Footer from "./Footer";
import SmoothScroll from "./SmoothScroll";

export default function MarketingLayout() {
  return (
    <div className="grain">
      <SmoothScroll />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
