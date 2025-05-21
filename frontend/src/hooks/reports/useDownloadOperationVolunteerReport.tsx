import { useCallback, useState } from 'react';
import { usePrintVolunteerReport } from './usePrintVolunteerReport'; // tu método de imprimir
import { getVolunteerById, getVolunteerOperationsReportList } from '@/api/VolunteerAPI';
import { convertToLocalDate } from '@/utils/common/formatDate';

interface DownloadOptions {
    volunteerId: number;
    filters: {
        query?: string;
        categoryId?: string;
        startDate?: string;
        endDate?: string;
    };
}

export const useDownloadOperationVolunteerReport = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadReport = useCallback(async ({
        volunteerId,
        filters
    }: DownloadOptions) => {
        setIsDownloading(true);
        try {
            const fullData = await getVolunteerOperationsReportList(volunteerId, {
                ...filters,
                page: 1,
                pageSize: 10000,
            });

            const volunteerData = await getVolunteerById(volunteerId);

            const columns = ["Fecha del operativo", 'Actividad', "Ubicación", "Dirección", "Responsable", "Observacion", "Estado"];

            const rows: string[][] = fullData?.data.map((row: any) => (
                [
                    convertToLocalDate(row.operationDate),
                    row.activity,
                    row.location,
                    row.address,
                    row.responsible,
                    row.observations,
                    row.status === 1 ? "Asistió" : row.status === 2 ? "No asistió" : 'Pendiente'
                ]
            )) ?? [];

            usePrintVolunteerReport(
                'BITACORA DE ACTIVIDADES',
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