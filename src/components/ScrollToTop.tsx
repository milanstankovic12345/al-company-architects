import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "@/lib/anchors";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    scrollToHash(hash as `#${string}`);
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
