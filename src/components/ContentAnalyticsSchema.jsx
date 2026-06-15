import { useEffect } from "react";

const SCHEMA_SCRIPT_ID = "content-analytics-schema";

function ContentAnalyticsSchema({ path, headline, alternativeHeadline, articleBody, authorName }) {
  useEffect(() => {
    const pageUrl = `${window.location.origin}${path}`;
    const schema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": pageUrl,
      headline,
      articleBody,
      author: {
        "@type": "Person",
        name: authorName,
      },
    };

    if (alternativeHeadline) {
      schema.alternativeHeadline = alternativeHeadline;
    }

    const script = document.createElement("script");
    script.id = SCHEMA_SCRIPT_ID;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, [path, headline, alternativeHeadline, articleBody, authorName]);

  return null;
}

export default ContentAnalyticsSchema;
