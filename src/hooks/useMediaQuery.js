import { useSyncExternalStore } from "react";

function subscribe(query, onChange) {
  const mq = window.matchMedia(query);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(query) {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => subscribe(query, onChange),
    () => getSnapshot(query),
    getServerSnapshot,
  );
}

export default useMediaQuery;
