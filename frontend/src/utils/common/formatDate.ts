// Función para formatear fecha a dd/mm/yyyy
export const convertToLocalDate = (date: unknown) => {
    if (!date) return "";

    if (typeof date === "string") {
        const stringDate = date.split('T')[0];

        const [year, month, day] = stringDate.split('-')
        return `${day}/${month}/${year}`;
    }
    return "";
};

export const convertTodDataBaseFormatDate = (date: string) => {
    if (!date) return ""; // Retorna vacío si no hay fecha

    const [day, month, year] = date.split('/')
    return `${year}-${month}-${day}`;
};