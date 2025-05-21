import { useState } from "react";
import BackLink from "../common/BackLink/BackLink";
import ErrorFormMessage from "../common/ErrorFormMessage/ErrorFormMessage";
import FormInput from "../common/FormInput/FormInput";
import { AttendanceGuardProps } from "./types/AttendanceGuardProps.type";
import { format } from "date-fns";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import Modal from "../common/Modal/Modal";
import FormTextArea from "../common/FormTextArea/FormTextArea";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import { VoluntareeGuard } from "@/types/guard.schema";

export default function AttendanceControlGuard({ data, volunteerAttendances, setVolunteerAttendances, errors }: AttendanceGuardProps) {
    const [observation, setObservation] = useState<string>('');
    const [person, setPerson] = useState<VoluntareeGuard | null>(null);
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isPersonReady, setIsPersonReady] = useState<boolean>(false);

    const handleAssignAssistance = (volunteerId: number, status: number, observation: string) => {
        const index = volunteerAttendances.findIndex(v => v.voluntareeId === volunteerId);
        if (index !== -1) {
            const updated = [...volunteerAttendances];
            updated[index] = { ...updated[index], status };
            setVolunteerAttendances(updated);
        } else {
            const validateObservation = observation.trim() === '' ? 'Ninguna' : observation.trim()
            setVolunteerAttendances([...volunteerAttendances, { voluntareeId: volunteerId, status, observation: validateObservation }]);
        }
        if (data) {
            const guardIndex = data.voluntareeGuards.findIndex(v => v.voluntareeId === volunteerId);
            if (guardIndex !== -1) {
                data.voluntareeGuards[guardIndex].status = status;
            }
        }
    };

    function handleConfirmNoAssistance(): void {
        if (person) {
            handleAssignAssistance(person?.voluntareeId, 2, observation);
            closeModal()
        }
    }

    function closeModal(): void {
        setIsOpenModal(false);
        setPerson(null);
        setObservation('');
        setIsPersonReady(false);
    }

    function OpenModal(person: VoluntareeGuard): void {
        setIsOpenModal(true);
        setPerson(person);
    }

    return (
        <>
            <div className="grid grid-cols-1 gap-9 mx-5 items-start">
                <div className="h-auto gap-4 rounded-xl p-4 border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="-mx-6 -mt-2">
                        <BackLink
                            text="Volver a listado de guardias"
                            iconSize={20}
                            link="/guards/list"
                            className="pt-1"
                        />
                    </div>
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Datos generales de la guardia
                    </h3>
                    <div className="w-full flex flex-row flex-wrap sm:flex-nowrap gap-3">
                        <FormInput
                            label="Turno"
                            name="shift"
                            type="text"
                            readonly
                            defaultValue={data?.shiftName}
                            className="bg-gray text-black dark:text-white text-center"
                        />
                        <FormInput
                            label="Fecha guardia"
                            name="date"
                            type="text"
                            readonly
                            defaultValue={format(data ? new Date(data.guardDate) : new Date(), "dd/MM/yyyy")}
                            className="bg-gray text-black dark:text-white text-center"
                        />
                        <FormInput
                            label="Ubicación"
                            name="location"
                            type="text"
                            readonly
                            defaultValue={data?.location}
                            className="bg-gray text-black dark:text-white text-center"
                        />
                        <FormInput
                            label="Estado de guardia"
                            name="status"
                            type="text"
                            readonly
                            defaultValue={data?.status == 0 ? 'Finalizada' : 'Programada'}
                            className="bg-gray text-black dark:text-white text-center"
                        />
                    </div>
                </div>
                <div className="gap-4 p-4 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Control de asistencia
                    </h3>
                    <h5 className="my-3 dark:text-white font-semibold text-black">
                        Selecciona los voluntarios que asistieron
                    </h5>
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
                                    <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                                        Asistio
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.voluntareeGuards.length > 0 ? (
                                    data.voluntareeGuards.map((person) => (
                                        <tr key={person.voluntareeId} className="border border-stroke dark:border-strokedark">
                                            <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                                                {person.voluntareeFullname}
                                            </td>
                                            <td className="py-2 px-4 border border-stroke dark:border-strokedark">
                                                {person.grade}
                                            </td>
                                            <td className="flex justify-center items-center gap-8 py-2 px-4 border border-stroke dark:border-strokedark">
                                                <FaRegCircleCheck
                                                    size={24}
                                                    color={person.status === 1 ? 'green' : 'grey'}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => (person.status === 0 || volunteerAttendances.some(v => v.voluntareeId === person.voluntareeId)) && handleAssignAssistance(person.voluntareeId, 1, '')}
                                                />
                                                <FaRegCircleXmark
                                                    size={24}
                                                    color={person.status === 2 ? 'red' : 'grey'}
                                                    style={{ cursor: 'pointer' }}
                                                    onClick={() => (person.status === 0 || volunteerAttendances.some(v => v.voluntareeId === person.voluntareeId)) && OpenModal(person)}
                                                />
                                            </td>

                                        </tr>
                                    ))
                                ) : (
                                    <tr className="border border-stroke dark:border-strokedark">
                                        <td className="py-4 text-center text-gray-500 border border-stroke dark:border-strokedark">
                                            Aún no se han agregado registros.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                        {errors.volunteerAttendances && (
                            <ErrorFormMessage>{errors.volunteerAttendances.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                title="Confirmar inasistencia"
                isOpen={isOpenModal}
                onClose={() => setIsOpenModal(false)}
            >
                <p className="text-gray-600 mb-4">
                    ¿Estás seguro de que <strong>{person?.voluntareeFullname}</strong> NO asistió a la operación?
                </p>
                <FormTextArea
                    label="Observaciones"
                    placeholder="Ingrese observaciones..."
                    name="observation"
                    defaultValue={observation}
                    className="mb-4"
                    register={() => ({
                        onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setObservation(e.target.value),
                    })}
                />
                <div className="flex justify-end gap-4 mt-6">
                    <ButtonGroup
                        buttons={[
                            {
                                type: 'button',
                                label: 'Confirmar',
                                onClick: handleConfirmNoAssistance,
                                variant: 'primary',
                                disabled: isPersonReady
                            },
                            {
                                type: 'button',
                                label: 'Cancelar',
                                onClick: () => closeModal(),
                                variant: 'secondary',
                                disabled: isPersonReady
                            },
                        ]}
                    />
                </div>
            </Modal>
        </>
    )
}