import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { useNavigate } from "react-router-dom";
import { EditVolunteerFormProps } from "../types/EditVolunteerFormProps";
import VolunteerEditForm from "./VolunteerEditForm";
import { useDetailsVolunteerForm } from "@/hooks/volunteer/useEditVolunteerForm";

export default function EditVolunteerForm({ data, volunteerId }: EditVolunteerFormProps) {
    const { register, handleSubmit, errors, control, isSubmitting, handleForm, setValue } = useDetailsVolunteerForm(data, volunteerId);
    const navigate = useNavigate();

    return (
        <>
            <form onSubmit={handleSubmit(handleForm)} noValidate>
                <fieldset disabled={isSubmitting}>
                    <VolunteerEditForm errors={errors} register={register} control={control} volunteerData={data} setValue={setValue} />
                </fieldset>
                <div className="p-6.5">
                    <ButtonGroup
                        buttons={[
                            { type: "button", label: "Editar voluntario", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                            { type: "button", label: "Cancelar", onClick: () => navigate(-1), variant: "secondary" }
                        ]}
                    />
                </div>
            </form>
        </>
    )
}