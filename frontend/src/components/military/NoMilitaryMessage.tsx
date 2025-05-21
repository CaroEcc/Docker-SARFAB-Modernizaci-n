import { Link } from "react-router-dom";

interface NoMilitaryMessageProps {
  hasFilters: boolean;
}

export function NoMilitaryMessage({ hasFilters }: NoMilitaryMessageProps) {
  return ( 
    <div className="h-fit">
      <p className="text-center py-20">
        {hasFilters
          ? "No se encontraron registros con los filtros aplicados."
          : "No existe personal militar. "}
        {!hasFilters && (
          <Link to="/military/create" className="text-primary font-bold">
            Crear personal militar
          </Link>
        )}
      </p>
    </div>
  );
}
