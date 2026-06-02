import CookieBanner from "./CookieBanner";
import Footer from "./Footer";
import Header from "./Header";

function SiteLayout({ children }) {
  return (
    <div className="site-layout bg-base-bg text-primary-text">
      <div className="site-layout-inner">
        <Header />
        {children}
        <Footer />
      </div>
      <CookieBanner fixed />
    </div>
  );
}

export default SiteLayout;
