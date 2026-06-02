import Headline from "../components/Headline";
import LegalInfoPageRow from "../components/LegalInfoPageRow";
import SiteLayout from "../components/SiteLayout";
import { useLegalSec01Width } from "../hooks/useLegalSec01Width";

function LegalInformationPage() {
  const sec01Width = useLegalSec01Width();

  return (
    <SiteLayout>
      <main className="legal-info-page">
        <Headline header="Правовая информация" subheader="" />
        <LegalInfoPageRow sec01Width={sec01Width} />
      </main>
    </SiteLayout>
  );
}

export default LegalInformationPage;
