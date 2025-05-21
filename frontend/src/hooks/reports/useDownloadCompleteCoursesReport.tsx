import { useCallback, useState } from 'react';
import { usePrintVolunteerReport } from './usePrintVolunteerReport'; // tu método de imprimir
import { getVolunteerById } from '@/api/VolunteerAPI';
import { convertToLocalDate } from '@/utils/common/formatDate';
import { getVolunteerCompletedCourses } from '@/api/CourseVolunteerAPI';

interface DownloadOptions {
    volunteerId: number;
    filters: {
        query?: string;
        categoryId?: string;
        startDate?: string;
        endDate?: string;
    };
}

export const useDownloadCompleteCoursesReport = () => {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadReport = useCallback(async ({
        volunteerId,
        filters
    }: DownloadOptions) => {
        setIsDownloading(true);
        try {
            const fullData = await getVolunteerCompletedCourses(volunteerId, {
                ...filters,
                page: 1,
                pageSize: 10000,
            });

            const volunteerData = await getVolunteerById(volunteerId);

            const columns = ["Fecha", 'Curso'];

            const rows: string[][] = fullData?.data.map((row: any) => (
                [
                    convertToLocalDate(row.completionDate),
                    row.courseName
                ]
            )) ?? [];

            usePrintVolunteerReport(
                'BITACORA DE CURSOS',
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