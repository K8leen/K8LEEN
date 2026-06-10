import CookieBanner from "./CookieBanner";
import CookieBannerMobile from "./CookieBannerMobile";
import Footer from "./Footer";
import Header from "./Header";
import useMediaQuery from "../hooks/useMediaQuery";

const MOBILE_MQ = "(max-width: 699px)";

function SiteLayout({ children }) {
  const isMobile = useMediaQuery(MOBILE_MQ);

  return (
    <div className="site-layout bg-base-bg text-primary-text">
      <div className="site-layout-inner">
        <Header />
        {children}
        <Footer />
      </div>
      {isMobile ? <CookieBannerMobile fixed /> : <CookieBanner fixed />}
    </div>
  );
}

export default SiteLayout;
