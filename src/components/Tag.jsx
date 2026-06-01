const toneMap = {
  nda: {
    text: "#5A89B1",
    background: "#EAF4FC",
  },
  web: {
    text: "#42509D",
    background: "#F6F7FC",
  },
  webMobile: {
    text: "#137FBF",
    background: "#EFF8FE",
  },
  mobile: {
    text: "#5D39DE",
    background: "#F4F1FD",
  },
  uxUi: {
    text: "#8A3B63",
    background: "#FDEDF4",
  },
  code: {
    text: "#A04E28",
    background: "#FFF4EA",
  },
};

function Tag({ children, tone = "nda", className = "" }) {
  const palette = toneMap[tone] ?? toneMap.nda;

  return (
    <span
      className={`tag-chip text-tech border-0 ${className}`.trim()}
      style={{
        color: palette.text,
        backgroundColor: palette.background,
        border: "none",
      }}
    >
      {children}
    </span>
  );
}

export default Tag;
