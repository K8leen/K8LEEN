import ImageLoader from "./ImageLoader";

function LoadingHost({ loading, children, className = "", loaderSize }) {
  return (
    <div
      className={`loading-host${loading ? " loading-host--loading" : ""} ${className}`.trim()}
      aria-busy={loading || undefined}
    >
      {loading ? (
        <span className="loading-host__loader" aria-hidden="true">
          <ImageLoader size={loaderSize} />
        </span>
      ) : null}
      {children}
    </div>
  );
}

export default LoadingHost;
