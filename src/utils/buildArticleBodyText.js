function flattenTextParts(parts) {
  return parts.flatMap((part) => {
    if (typeof part === "string") {
      return part;
    }

    if (Array.isArray(part)) {
      return flattenTextParts(part);
    }

    if (part?.listItems) {
      return [part.title, ...part.listItems].filter(Boolean);
    }

    if (part?.title && part?.description) {
      return [`${part.title} ${part.description}`];
    }

    if (part?.title) {
      return [part.title];
    }

    return [];
  });
}

export default function buildArticleBodyText(...parts) {
  return flattenTextParts(parts).filter(Boolean).join(" ");
}
