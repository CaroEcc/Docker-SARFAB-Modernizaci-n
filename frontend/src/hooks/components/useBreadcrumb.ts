import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

interface OutletContext {
  setBreadcrumbItems: (items: BreadcrumbItem[]) => void;
}

export function useBreadcrumb(items: BreadcrumbItem[], deps: any[] = []) {
  const { setBreadcrumbItems } = useOutletContext<OutletContext>();

  useEffect(() => {
    setBreadcrumbItems(items);
  }, [setBreadcrumbItems, ...deps]);
}