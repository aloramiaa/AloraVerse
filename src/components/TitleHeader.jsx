const TitleHeader = ({ title, sub, subtitle }) => {
  // Use the subtitle parameter if provided, otherwise fall back to sub
  const subtitleText = subtitle || sub;

  return (
    <div className="flex flex-col items-center gap-5">
      {subtitleText && (
        <div className="hero-badge">
          <p>{subtitleText}</p>
        </div>
      )}
      <div>
        <h1 className="font-semibold md:text-5xl text-3xl text-center text-white-50">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;
