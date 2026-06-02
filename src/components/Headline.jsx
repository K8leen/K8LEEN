function Headline({
  header = "HEADER",
  subheader = "SUBHEADER",
  className = "",
}) {
  // Стандартизируем регистр отображаемого текста независимо от того,
  // как строка была введена на странице.
  const headerText = String(header).toLocaleUpperCase("ru");
  const subheaderText = String(subheader).toLocaleLowerCase("ru");
  const hasSubheader = String(subheader).trim() !== "";

  return (
    <section className={`headline ${className}`.trim()}>
      <h1 className="text-hero text-structure-text">{headerText}</h1>
      {hasSubheader ? (
        <p className="headline-subheader text-subhero text-structure-text">
          {subheaderText}
        </p>
      ) : null}
    </section>
  );
}

export default Headline;
