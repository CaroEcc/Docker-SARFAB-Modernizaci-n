import autoTable from 'jspdf-autotable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import escudo from '@/assets/images/signIn/escudo.png';
import logo from '@/assets/images/signIn/logo.png';

export const usePrintVolunteerReport = (reportTitle: string, volunteerData: any, columns: string[], data: string[][]) => {
    const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "letter",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight()

    const escudoHeight = 30;
    const escudoAspect = 1110 / 750;
    const escudoWidth = escudoHeight * escudoAspect;

    doc.addImage(escudo, 'PNG', 10, 10, escudoWidth, escudoHeight);

    doc.addImage(logo, 'PNG', pageWidth - 40, 10, 30, 30);

    // Reservar espacio para foto (3x3 cm) en la parte superior derecha
    const photoBoxSize = 30; // 30 mm = 3 cm
    const photoBoxX = pageWidth - photoBoxSize - 10; // 10 mm de margen derecho
    const photoBoxY = 45; // debajo del logo

    doc.setDrawColor(0); // color del borde
    doc.setLineWidth(0.1);
    doc.rect(photoBoxX, photoBoxY, photoBoxSize, photoBoxSize); // marco de la foto
    doc.setFontSize(8);
    doc.text('Foto 3x3 cm', photoBoxX + photoBoxSize / 2, photoBoxY + photoBoxSize / 2 + 2, { align: 'center' });


    doc.setFont('helvetica', 'bold');

    const textLines = [
        'Fuerza Aérea Boliviana',
        'II Brigada Aérea',
        'Grupo De Búsqueda Y Rescate',
        'SAR-FAB',
        'Cochabamba - Bolivia'
    ];

    const centerX = pageWidth / 2;
    let currentY = 15;

    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');

    textLines.forEach(line => {
        doc.text(line, centerX, currentY, { align: 'center' });
        currentY += 6;
    });

    currentY += 2;
    doc.setFontSize(13);
    doc.text(reportTitle.toUpperCase(), centerX, currentY, { align: 'center' });

    const labelX1 = 20;
    const valueX1 = 65;
    const labelX2 = 130;
    const valueX2 = 155;
    let yInfo = currentY + 10;

    doc.setFontSize(10);

    // Fila 1: Nombre completo y CI
    doc.setFont('helvetica', 'bold');
    doc.text('APELLIDOS Y NOMBRE:', labelX1, yInfo);
    doc.setFont('helvetica', 'normal');
    doc.text(`${volunteerData.lastName} ${volunteerData.firstName}` || '', valueX1, yInfo);

    doc.setFont('helvetica', 'bold');
    doc.text('CI:', labelX2, yInfo);
    doc.setFont('helvetica', 'normal');
    doc.text(volunteerData.ci || '', valueX2, yInfo);

    yInfo += 6; // siguiente fila

    // Fila 2: Dirección y Teléfono
    doc.setFont('helvetica', 'bold');
    doc.text('DIRECCIÓN:', labelX1, yInfo);
    doc.setFont('helvetica', 'normal');
    doc.text(volunteerData.homeAddress || '', valueX1, yInfo);

    doc.setFont('helvetica', 'bold');
    doc.text('TELÉFONO:', labelX2, yInfo);
    doc.setFont('helvetica', 'normal');
    doc.text(volunteerData.phone || '', valueX2, yInfo);

    const tablaStartY = yInfo + 15;

    autoTable(doc, {
        head: [columns],
        body: data,
        theme: 'grid',
        startY: tablaStartY,
        margin: { bottom: 40 },
        headStyles: {
            fillColor: [200, 200, 200],
            textColor: [0, 0, 0],
            fontStyle: 'bold'
        },
        styles: {
            fontSize: 10
        },
    });

    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.text('FIRMA, ENCARGADO', 60, pageHeight - 25, { align: 'center' });
        doc.text('FIRMA, COMANDANTE\nDEL GRUPO SAR FAB', pageWidth - 60, pageHeight - 25, { align: 'center' });
        doc.setPage(i);
        doc.text(`Página ${i} de ${pageCount}`, pageWidth - 40, pageHeight - 10);
    }

    doc.save(`${reportTitle.toLowerCase().replace(' ', '_')}_${volunteerData.lastName}_${volunteerData.firstName}.pdf`);
};