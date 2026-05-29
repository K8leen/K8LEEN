import Footer from "./Footer";
import Header from "./Header";

function SiteLayout({ children }) {
  return (
    <div className="site-layout min-h-screen bg-base-bg text-primary-text">
      <div className="site-layout-inner">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}

export default SiteLayout;
