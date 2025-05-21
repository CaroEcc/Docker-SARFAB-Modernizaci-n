import { Link } from "react-router-dom";

export function NoInventoryMessage({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="h-fit">
      <p className="text-center py-20">
        {hasFilters
          ? "No se encontraron elementos en el inventario con los filtros aplicados."
          : "No existen elementos en el inventario. "}
        {!hasFilters && (
          <Link to="/inventory/create" className="text-primary font-bold">
            Agregar nuevo elemento
          </Link>
        )}
      </p>
    </div>
  )
}