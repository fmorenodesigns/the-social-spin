import { ReactNode } from "react";

import { useLocation, useNavigation } from "./hooks";

interface Route {
  path: string;
  element?: ReactNode;
  redirect?: string;
}

interface Props {
  routes: Route[];
}

export default function Routes({ routes }: Props) {
  const { pathname } = useLocation();
  const navigate = useNavigation();

  for (const route of routes) {
    const { path, element, redirect } = route;
    const regex = new RegExp(`^${path}$`);

    if (!pathname.match(regex)) continue;

    if (!redirect) return element;

    navigate(redirect, true);
  }

  // Page not found
  throw new Error(`Missing route configuration for '${pathname}'`);
}
