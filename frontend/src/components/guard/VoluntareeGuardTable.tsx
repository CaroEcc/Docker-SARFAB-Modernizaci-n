import { VoluntareeGuard } from "@/types/guard.schema";

interface VoluntareeGuardTableProps {
    voluntaries: VoluntareeGuard[];
    removeVoluntaree: (value: number) => void;
    readonly?: boolean
}

export default function VoluntareeGuardTable({ voluntaries, removeVoluntaree, readonly = false }: VoluntareeGuardTableProps) {
    return (
        <div className="mt-4 border border-stroke dark:border-strokedark rounded-md">
            <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
                <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                        <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                            Nombre
                        </th>
                        <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                            Grado
                        </th>
                        {
                            !readonly &&
                            <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                                Acción
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {voluntaries.length > 0 ? (
                        voluntaries.map((person) => (
                            <tr key={person.voluntareeId} className="border border-stroke dark:border-strokedark">
                                <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                                    {person.voluntareeFullname}
                                </td>
                                <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                                    {person.grade}
                                </td>
                                {
                                    !readonly &&
                                    <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                                        <button
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                removeVoluntaree(person.voluntareeId);
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            ❌
                                        </button>
                                    </td>
                                }
                            </tr>
                        ))
                    ) : (
                        <tr className="border border-stroke dark:border-strokedark">
                            <td
                                colSpan={!readonly ? 3 : 2}
                                className="py-4 text-center text-gray-500 border border-stroke dark:border-strokedark"
                            >
                                Aún no se han agregado registros.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}