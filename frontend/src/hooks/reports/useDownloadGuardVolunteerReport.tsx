import { useCallback, useState } from 'react';
import { usePrintVolunteerReport } from './usePrintVolunteerReport'; // tu método de imprimir
import { getVolunteerById, getVolunteerGuardsReportList } from '@/api/VolunteerAPI';
import { convertToLocalDate } from '@/utils/common/formatDate';

interface DownloadOptions {
    volunteerId: number;
    filters: {
        query?: string;
        status?: string;
        shift?: string;
        startDate?: string;
        endDate?: string;
    };
}

export const useDownloadGuardVolunteerReport = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadReport = useCallback(async ({
        volunteerId,
        filters
    }: DownloadOptions) => {
        setIsDownloading(true);
        try {
            const fullData = await getVolunteerGuardsReportList(volunteerId, {
                ...filters,
                page: 1,
                pageSize: 10000,
            });

            const volunteerData = await getVolunteerById(volunteerId);

            const columns = ["Fecha de la guardia", 'Turno', "Responsable", "Ubicación", "Observaciones", "Estado"];

            const rows: string[][] = fullData?.data.map((row) => (
                [
                    convertToLocalDate(row.guardDate),
                    row.shiftName,
                    row.responsibleFullname,
                    row.location,
                    row.observation,
                    row.status === 1 ? "Asistió" : row.status === 2 ? "No asistió" : 'Pendiente'
                ]
            )) ?? [];

            usePrintVolunteerReport(
                'BITACORA DE GUARDIAS',
                volunteerData,
                columns,
                rows
            );
        } catch (error) {
            console.error("Error al generar el reporte:", error);
        } finally {
            setIsDownloading(false);
        }
    }, []);

    return { downloadReport, isDownloading };
};