function Headline({
  header = "HEADER",
  subheader = "SUBHEADER",
  className = "",
}) {
  return (
    <section className={`headline ${className}`.trim()}>
      <h1 className="text-hero text-structure-text">{header}</h1>
      <p className="headline-subheader text-subhero text-structure-text">{subheader}</p>
    </section>
  );
}

export default Headline;
