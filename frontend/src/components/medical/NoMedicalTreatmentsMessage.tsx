import { Link } from "react-router-dom";

interface NoMedicalTreatmentsMessageProps {
    hasFilters: boolean
}

export function NoMedicalTreatmentsMessage({ hasFilters }: NoMedicalTreatmentsMessageProps) {
    return (
        <div className='h-fit'>
            <p className='text-center py-20'>
                {hasFilters
                    ? "No se encontraron registros con los filtros aplicados."
                    : "No existen tratamientos."}
                {!hasFilters && (
                    <Link to="/medical-treatments/create" className='text-primary font-bold'>Crear tratamiento</Link>
                )}
            </p>
        </div>
    );
}