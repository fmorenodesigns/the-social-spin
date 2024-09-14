import { useEffect, useState } from "react";

export function useLocation() {
  const [location, setLocation] = useState({
    pathname: window.location.pathname,
  });

  useEffect(() => {
    const listener = () => setLocation({ pathname: window.location.pathname });

    addEventListener("popstate", listener);
    addEventListener("pushstate", listener);
    addEventListener("replacestate", listener);
    return () => {
      removeEventListener("popstate", listener);
      removeEventListener("pushstate", listener);
      removeEventListener("replacestate", listener);
    };
  }, []);

  return location;
}

const pushStateEvent = new CustomEvent("pushstate", {
  bubbles: true, // Allows the event to bubble up the DOM tree
  cancelable: true, // Allows the event to be canceled
});
const replaceStateEvent = new CustomEvent("replacestate", {
  bubbles: true, // Allows the event to bubble up the DOM tree
  cancelable: true, // Allows the event to be canceled
});

export function useNavigation() {
  return (newPath: string, replace = false) => {
    if (isExternalPath(newPath)) {
      externalNavigate(newPath, replace);
      return;
    }
    internalNavigate(newPath, replace);
  };
}

function externalNavigate(newPath: string, replace = false) {
  if (replace) window.location.replace(newPath);
  else window.location.href = newPath;
}

function isExternalPath(path: string): boolean {
  try {
    const currentOrigin = new URL(window.location.href);
    const targetUrl = new URL(path, currentOrigin);

    return currentOrigin.hostname !== targetUrl.hostname;
  } catch {
    // Handle invalid URLs
    return true;
  }
}

function internalNavigate(newPath: string, replace = false) {
  const { state } = window.history;
  if (replace) {
    window.history.replaceState(state, "", newPath);
    window.dispatchEvent(replaceStateEvent);
  } else {
    window.history.pushState(state, "", newPath);
    window.dispatchEvent(pushStateEvent);
  }
}
