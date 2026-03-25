export type AnchorId = "about" | "kontakt";

type ScrollOptions = {
  headerOffset?: number;
  behavior?: ScrollBehavior;
};

const DEFAULT_HEADER_OFFSET = 96;

function getAnchorIdFromHash(hash: string): string {
  return decodeURIComponent(hash.replace(/^#/, "").trim());
}

export function scrollToAnchor(id: string, options: ScrollOptions = {}) {
  const { headerOffset = DEFAULT_HEADER_OFFSET, behavior = "smooth" } = options;

  const attemptScroll = () => {
    const element = document.getElementById(id);
    if (!element) return;

    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: Math.max(elementTop - headerOffset, 0), behavior });
  };

  requestAnimationFrame(attemptScroll);
}

export function setHashWithoutNavigation(hash: `#${string}`) {
  const nextUrl = `${window.location.pathname}${window.location.search}${hash}`;
  window.history.replaceState(window.history.state, "", nextUrl);
}

export function scrollToHash(hash: `#${string}`, options: ScrollOptions = {}) {
  const id = getAnchorIdFromHash(hash);
  if (!id) return;
  setHashWithoutNavigation(hash);
  scrollToAnchor(id, options);
}

