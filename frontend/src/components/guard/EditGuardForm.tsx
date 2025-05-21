import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import FormDate from "@/components/common/FormDate/FormDate";
import FormSelectControlled from "../common/FormSelect/FormSelectControlled";
import BackLink from "../common/BackLink/BackLink";
import FormInput from "../common/FormInput/FormInput";
import FormSearchableSelect from "../common/FormSearchableSelect/FormSearchableSelect";
import FilterDatalist from "../common/FilterDatalist/FilterDatalist";
import { useState } from "react";
import Button from "../common/Button/Button";
import VoluntareeGuardTable from "./VoluntareeGuardTable";
import { VoluntareeGuard } from "@/types/guard.schema";
import { GuardEditFormProps } from "./types/GuardEditFormProps.type";


export default function EditGuardForm({ setVoluntaries, voluntaries, volunteersData, shiftData, errors, register, control, watch, readonly }: GuardEditFormProps) {
    const [selectedVolunteer, setSelectedVolunteer] = useState<string>();

    const shiftOptions = shiftData?.map((data) => ({
        value: data.shiftId,
        label: data.name
    }));

    const volunteersOptions = volunteersData?.map((data) => ({
        id: data.volunteerId,
        name: `${data.lastName} ${data.firstName}, ${data.abbreviation} `
    }));


    const handleAddVolunteer = () => {
        if (selectedVolunteer == '') return

        const volunteerOptionId = volunteersOptions?.find(v => v.name === selectedVolunteer)?.id;
        const volunteer = volunteersData?.find(v => v.volunteerId === volunteerOptionId);

        const volunteerFormated: VoluntareeGuard = {
            voluntareeId: volunteer?.volunteerId || 0,
            voluntareeFullname: `${volunteer?.lastName} ${volunteer?.firstName}`,
            grade: volunteer?.gradeName || ''
        }

        if (volunteer && !voluntaries.some(v => v.voluntareeId === Number(volunteerOptionId))) {
            setVoluntaries([...voluntaries, volunteerFormated]);
            setSelectedVolunteer('');
        }
    };

    const handleRemoveVolunteer = (volunteerId: number) => {
        setVoluntaries(voluntaries.filter(v => v.voluntareeId !== volunteerId));
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 mx-5 items-start">
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
                        Datos generales
                    </h3>
                    <div className="w-full flex flex-wrap gap-3">
                        <div className="mb-4.5 flex flex-col w-full md:flex-1">
                            <FormSelectControlled
                                control={control}
                                label="Turno"
                                required
                                name="shiftId"
                                options={shiftOptions && shiftOptions.length > 0
                                    ? shiftOptions
                                    : [{ value: 0, label: "No hay opciones" }]}
                                readonly={readonly}
                                defaultValue={watch("shiftId")}
                            />
                            {errors.shiftId && (
                                <ErrorFormMessage>{errors.shiftId.message}</ErrorFormMessage>
                            )}
                        </div>
                        <div className="mb-4.5 flex flex-col w-full md:flex-1">
                            <FormDate label="Fecha de la guardia" placeholder="Selecciona la fecha" required
                                register={register}
                                name="guardDate"
                                readonly={readonly}
                                defaultValue={watch("guardDate")}
                            />
                            {errors.guardDate && (
                                <ErrorFormMessage>{errors.guardDate.message}</ErrorFormMessage>
                            )}
                        </div>
                    </div>
                    <div className="mb-4.5 flex flex-col">
                        <FormInput register={register} label="Ubicacion" required
                            placeholder="Ingresa la ubicación"
                            name="location"
                            readonly={readonly}
                            defaultValue={watch && watch("location")}
                        />
                        {errors.location && (
                            <ErrorFormMessage>{errors.location.message}</ErrorFormMessage>
                        )}
                    </div>
                </div>
                <div className="gap-4 p-4 rounded-xl border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <h3 className="my-3 dark:text-white text-2xl font-semibold text-black">
                        Asignación de rescatistas / voluntarios y responsable
                    </h3>
                    <div className="mb-4.5 flex flex-col w-full md:flex-1">
                        <FormSearchableSelect
                            name="responsibleId"
                            label="Responsable"
                            options={volunteersOptions && volunteersOptions.length > 0
                                ? volunteersOptions
                                : [{ id: 0, name: "No hay opciones" }]}
                            control={control}
                            disabled={readonly}
                            defaultValue={watch && watch("responsibleId")}
                        />
                        {errors.responsibleId && (
                            <ErrorFormMessage>{errors.responsibleId.message}</ErrorFormMessage>
                        )}
                    </div>
                    {
                        !readonly &&
                        <div className="mb-4.5 flex flex-col w-full md:flex-1">
                            <div className="flex gap-2 items-end">
                                <FilterDatalist
                                    name="responsibleId"
                                    label="Selecciona un voluntario"
                                    value={selectedVolunteer}
                                    options={volunteersOptions && volunteersOptions.length > 0
                                        ? volunteersOptions
                                        : [{ id: 0, name: "No hay opciones" }]} onChange={setSelectedVolunteer}
                                />
                                <Button
                                    label="Agregar"
                                    onClick={handleAddVolunteer}
                                    variant="primary"
                                />
                            </div>
                            {errors.voluntareeIds && (
                                <ErrorFormMessage>{errors.voluntareeIds.message}</ErrorFormMessage>
                            )}
                        </div>
                    }
                    <VoluntareeGuardTable
                        voluntaries={voluntaries}
                        removeVoluntaree={handleRemoveVolunteer}
                        readonly={readonly}
                    />
                </div>
            </div>
        </>
    )
}