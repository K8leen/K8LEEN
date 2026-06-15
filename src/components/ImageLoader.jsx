function ImageLoader({ className = "", size = 20, label = "Загрузка" }) {
  const radius = size * 0.4;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;
  const arc = circumference * 0.72;

  return (
    <span className={`image-loader ${className}`.trim()} role="status" aria-label={label}>
      <svg
        className="image-loader__svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          className="image-loader__track"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--light-accent)"
          strokeWidth="2"
          opacity="0.28"
        />
        <circle
          className="image-loader__arc"
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="var(--light-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${arc} ${circumference - arc}`}
        />
      </svg>
    </span>
  );
}

export default ImageLoader;
