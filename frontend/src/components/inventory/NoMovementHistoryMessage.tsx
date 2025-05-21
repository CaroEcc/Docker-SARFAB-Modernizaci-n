export function NoMovementHistoryMessage({ hasFilters }: { hasFilters: boolean }) {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <p className="text-gray-500 text-center px-4">
        {hasFilters
          ? "No se encontraron movimientos en el historial con los filtros aplicados."
          : "No hay movimientos registrados."}
      </p>
    </div>
  );
}
