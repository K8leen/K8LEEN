const toneMap = {
  nda: {
    text: "#5A89B1",
    border: "#5A89B1",
    background: "#EAF4FC",
  },
  web: {
    text: "#42509D",
    border: "#D4D7EE",
    background: "#F6F7FC",
  },
  webMobile: {
    text: "#137FBF",
    border: "#A8D9F6",
    background: "#EFF8FE",
  },
  mobile: {
    text: "#5D39DE",
    border: "#CFC6F7",
    background: "#F4F1FD",
  },
  uxUi: {
    text: "#8A3B63",
    border: "#EBB8CE",
    background: "#FDEDF4",
  },
  code: {
    text: "#A04E28",
    border: "#E8C6A6",
    background: "#FFF4EA",
  },
};

function Tag({ children, tone = "nda", className = "" }) {
  const palette = toneMap[tone] ?? toneMap.nda;

  return (
    <span
      className={`tag-chip text-tech ${className}`.trim()}
      style={{
        color: palette.text,
        borderColor: palette.border,
        backgroundColor: palette.background,
      }}
    >
      {children}
    </span>
  );
}

export default Tag;
