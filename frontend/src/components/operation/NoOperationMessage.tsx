import { Link } from "react-router-dom";

export function NoOperationMessage({ hasFilters }: { hasFilters: boolean }) {
    return (
      <div className='h-fit'>
        <p className='text-center py-20'>
          {hasFilters
            ? "No se encontraron operaciones con los filtros aplicados."
            : "No existen operaciones. "}
          {!hasFilters && (
            <Link to="/operation/create" className='text-primary font-bold'>
              Crear operación
            </Link>
          )}
        </p>
      </div>
    );
  }