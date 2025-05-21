import { RiMapLine, RiUser2Line, RiUserStarLine } from "@remixicon/react";
import BackLink from "../../common/BackLink/BackLink";
import FormDate from "../../common/FormDate/FormDate";
import FormInput from "../../common/FormInput/FormInput";
import FormSelect from "../../common/FormSelect/FormSelect";
import { useGrades } from "@/hooks/grades/querys/useGrades";
import ErrorFormMessage from "@/components/common/ErrorFormMessage/ErrorFormMessage";
import { VolunteerUpdateFormProps } from "../types/VolunteerUpdateFormProps";
import { useEffect } from "react";

export default function VolunteerEditForm({ errors, register, control, volunteerData, setValue }: VolunteerUpdateFormProps) {

    const { data: grades } = useGrades();

    const departments = [{ id: 1, name: "Cochabamba" }];
    const volunteerTypes = [{ id: "Libretista", name: "Libretista" }, { id: "Voluntario", name: "Voluntario" }];

    useEffect(() => {
        if (volunteerData && grades?.length && departments?.length && setValue) {
          const gradeId = grades.find(
            (grade) => grade.name === volunteerData.gradeName
          )?.id;
      
          const departmentId = departments.find(
            (dep) => dep.name === volunteerData.departmentName
          )?.id;
      
          const volunteerTypeId = volunteerTypes.find(
            (vt) => vt.name === volunteerData.volunteerType
          )?.id;
      
          if (gradeId) setValue("gradeId", String(gradeId));
          if (departmentId) setValue("departmentId", String(departmentId));
          if (volunteerTypeId) setValue("volunteerType", volunteerTypeId);
        }
      }, [volunteerData, grades, departments, volunteerTypes, setValue]);

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
                <div className="flex flex-col gap-9">
                    <div className="flex flex-col gap-9">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <BackLink
                                text="Volver al listado de voluntarios activos"
                                iconSize={20}
                                link="/volunteers/active-volunteers"
                            />
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                Datos personales
                            </h3>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Nombres" placeholder="Ingresa los nombres del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="firstName"
                                            type="text" />
                                        {errors.firstName && (
                                            <ErrorFormMessage>{errors.firstName.message}</ErrorFormMessage>
                                        )}
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Apellidos" placeholder="Ingresa los apellidos del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="lastName"
                                            type="text" />
                                        {errors.lastName && (
                                            <ErrorFormMessage>{errors.lastName.message}</ErrorFormMessage>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <FormInput label="Documento de identidad" placeholder="Ingresa el documento de identidad del voluntario"
                                        register={register}
                                        errors={errors}
                                        name="ci"
                                        type="text" />
                                    {errors.ci && (
                                        <ErrorFormMessage>{errors.ci.message}</ErrorFormMessage>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <FormDate
                                        label="Fecha de nacimiento"
                                        placeholder="Ingresa la fecha de nacimiento del recluta"
                                        required
                                        register={register}
                                        name="birthDate"
                                    />
                                    {errors.birthDate && (
                                        <ErrorFormMessage>{errors.birthDate.message}</ErrorFormMessage>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <FormInput label="Correo electrónico" placeholder="Ingresa el correo del voluntario del voluntario"
                                        register={register}
                                        errors={errors}
                                        name="email"
                                        type="email" />
                                    {errors.email && (
                                        <ErrorFormMessage>{errors.email.message}</ErrorFormMessage>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <FormSelect
                                        label="Departamento"
                                        options={departments}
                                        control={control}
                                        name="departmentId"
                                        required
                                        icon={<RiMapLine size={20} />}
                                    />
                                    {errors.departmentId && (
                                        <ErrorFormMessage>{errors.departmentId.message}</ErrorFormMessage>
                                    )}
                                </div>

                                <div className="mb-4.5">
                                    <FormInput label="Dirección" placeholder="Ingresa la dirección del voluntario"
                                        register={register}
                                        errors={errors}
                                        name="homeAddress"
                                        type="text" />
                                    {errors.homeAddress && (
                                        <ErrorFormMessage>{errors.homeAddress.message}</ErrorFormMessage>
                                    )}
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Teléfono" placeholder="Ingresa el teléfono del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="phone"
                                            type="tel" />
                                        {errors.phone && (
                                            <ErrorFormMessage>{errors.phone.message}</ErrorFormMessage>
                                        )}
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Número de celular" placeholder="Ingresa el celular del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="mobilePhone"
                                            type="tel" />
                                        {errors.mobilePhone && (
                                            <ErrorFormMessage>{errors.mobilePhone.message}</ErrorFormMessage>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormSelect
                                            label="Selecciona un grado"
                                            options={grades || []}
                                            control={control}
                                            name="gradeId"
                                            required
                                            icon={<RiUserStarLine size={20} />}
                                        />
                                        {errors.gradeId && (
                                            <ErrorFormMessage>{errors.gradeId.message}</ErrorFormMessage>
                                        )}
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormSelect
                                            label="Tipo de voluntario"
                                            options={volunteerTypes}
                                            control={control}
                                            name="volunteerType"
                                            required
                                            icon={<RiUser2Line size={20} />}
                                        />
                                        {errors.volunteerType && (
                                            <ErrorFormMessage>{errors.volunteerType.message}</ErrorFormMessage>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Ocupación" placeholder="Estudiante, independiente, licenciado,  etc."
                                            register={register}
                                            errors={errors}
                                            name="occupation"
                                            type="text" />
                                        {errors.occupation && (
                                            <ErrorFormMessage>{errors.occupation.message}</ErrorFormMessage>
                                        )}
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Religion" placeholder="Católico, adventista, cristiano, no practica, etc."
                                            register={register}
                                            errors={errors}
                                            name="religion"
                                            type="text" />
                                        {errors.religion && (
                                            <ErrorFormMessage>{errors.religion.message}</ErrorFormMessage>
                                        )}
                                    </div>
                                </div>

                                <div className="mb-4.5">
                                    <FormInput label="Señas particulares" placeholder=""
                                        register={register}
                                        errors={errors}
                                        name="distinctiveFeatures"
                                        type="text" />
                                    {errors.distinctiveFeatures && (
                                        <ErrorFormMessage>{errors.distinctiveFeatures.message}</ErrorFormMessage>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-9">
                    <div className="col-span-2 row-span-2 col-start-4">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                En caso de emergencia
                            </h3>
                            <div className="p-6.5">
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Contacto de emergencia" placeholder="Contacto de emergencia del voluntario"
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactFullName"
                                            type="text" />
                                        {errors.emergencyContactFullName && (
                                            <ErrorFormMessage>{errors.emergencyContactFullName.message}</ErrorFormMessage>
                                        )}
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Parentezco" placeholder="Madre, padre, hermana, hermano, tio, etc."
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactRelation"
                                            type="text" />
                                        {errors.emergencyContactRelation && (
                                            <ErrorFormMessage>{errors.emergencyContactRelation.message}</ErrorFormMessage>
                                        )}
                                    </div>
                                </div>
                                <div className="mb-4.5">
                                    <FormInput label="Dirección del contacto" placeholder=""
                                        register={register}
                                        errors={errors}
                                        name="emergencyContactAddress"
                                        type="text" />
                                    {errors.emergencyContactAddress && (
                                        <ErrorFormMessage>{errors.emergencyContactAddress.message}</ErrorFormMessage>
                                    )}
                                </div>
                                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Telefono de contacto de emergancia" placeholder=""
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactPhone"
                                            type="text" />
                                        {errors.emergencyContactPhone && (
                                            <ErrorFormMessage>{errors.emergencyContactPhone.message}</ErrorFormMessage>
                                        )}
                                    </div>

                                    <div className="w-full xl:w-1/2">
                                        <FormInput label="Celular de contacto de emergancia" placeholder=""
                                            register={register}
                                            errors={errors}
                                            name="emergencyContactMobile"
                                            type="text" />
                                        {errors.emergencyContactMobile && (
                                            <ErrorFormMessage>{errors.emergencyContactMobile.message}</ErrorFormMessage>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 col-start-4 row-start-4">
                        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                            <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                                Datos medicos
                            </h3>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <FormInput label="Alergias" placeholder="Antibioticos, nuez, picadura de abeja, etc."
                                        register={register}
                                        errors={errors}
                                        name="allergies"
                                        type="text" />
                                    {errors.allergies && (
                                        <ErrorFormMessage>{errors.allergies.message}</ErrorFormMessage>
                                    )}
                                </div>
                                <div className="mb-4.5">
                                    <FormInput label="Grupo sanguineo" placeholder="A+, A-, B+, B-, AB+, AB-, O+, O-"
                                        register={register}
                                        errors={errors}
                                        name="bloodType"
                                        type="text" />
                                    {errors.bloodType && (
                                        <ErrorFormMessage>{errors.bloodType.message}</ErrorFormMessage>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}