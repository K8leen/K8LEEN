import { useEffect, useRef, useState } from "react";
import ImageLoader from "./ImageLoader";

function DeferredImage({
  src,
  alt,
  className = "",
  onLoad,
  onError,
  loader = true,
  loaderSize,
  ...props
}) {
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setLoaded(false);
    setErrored(false);

    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) {
      setLoaded(true);
    }
  }, [src]);

  const showLoader = loader && !loaded && !errored;

  return (
    <span
      className={`deferred-image${showLoader ? " deferred-image--loading" : ""}${loaded ? " deferred-image--loaded" : ""}`.trim()}
    >
      {showLoader ? (
        <span className="deferred-image__loader" aria-hidden="true">
          <ImageLoader size={loaderSize} />
        </span>
      ) : null}
      <img
        {...props}
        ref={imgRef}
        src={src}
        alt={alt}
        className={`deferred-image__img ${className}`.trim()}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        onError={(event) => {
          setErrored(true);
          onError?.(event);
        }}
      />
    </span>
  );
}

export default DeferredImage;
