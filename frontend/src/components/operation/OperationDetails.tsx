import FormInput from '../common/FormInput/FormInput';
import FormDate from '../common/FormDate/FormDate';
import { OperationDetailResponse } from '@/types/operation.schema';
import BackLink from '../common/BackLink/BackLink';
import FormTextArea from '../common/FormTextArea/FormTextArea';

export default function OperationDetails({
  operation,
}: {
  operation: OperationDetailResponse;
}) {
  return (
    <section className="space-y-6">
      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="-mx-6 -mt-2">
          <BackLink
            text="Volver al listado de operaciones"
            link="/operation/list"
            className="pt-0"
          />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white mt-4">
          Datos de la operación
        </h2>
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FormInput
            label="Categoria de operación"
            name="categoryName"
            type="text"
            readonly
            value={operation.categoryName.length > 25 ? operation.categoryName.slice(0, 22) + '...' : operation.categoryName}
            title={operation.categoryName}
            className="bg-gray text-black dark:text-white text-center"
          />
          <div className="mb-4">
            <FormInput
              label="Tipo de operación"
              name="operationTypeName"
              type="text"
              readonly
              value={operation.operationTypeName.length > 25 ? operation.operationTypeName.slice(0, 22) + '...' : operation.operationTypeName}
              title={operation.operationTypeName}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
          <div className="flex flex-col md:col-span-2 mb-4">
            <FormInput
              label="Departamento"
              name="departmentName"
              type="text"
              readonly
              value={operation.departmentName}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
          <div className="flex flex-col md:col-span-2 mb-4">
            <FormInput
              label="Provincia"
              name="provinceName"
              type="text"
              readonly
              value={operation.provinceName}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
          <div className="flex flex-col md:col-span-2 mb-4">
            <FormInput
              label="Municipio"
              name="municipalityName"
              type="text"
              readonly
              value={operation.municipalityName}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
          <div className="flex flex-col md:col-span-2 mb-4">
            <FormInput
              label="Dirección"
              name="address"
              type="text"
              readonly
              value={operation.address}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
          <FormDate
            label="Fecha de salida"
            name="departureDate"
            readonly
            defaultValue={operation.departureDate?.split('T')[0]}
            className="bg-gray text-black dark:text-white text-center"
          />
          <FormDate
            label="Fecha de llegada"
            name="arrivalDate"
            readonly
            defaultValue={operation.arrivalDate?.split('T')[0]}
            className="bg-gray text-black dark:text-white text-center"
          />
          <div className="flex flex-col md:col-span-2 mb-4 mt-4">
            <FormInput
              label="Estado"
              name="operationStatus"
              type="text"
              readonly
              value={operation.operationStatus}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
          <div className="flex flex-col md:col-span-2 mb-4 mt-4">
            <FormTextArea
              label="Observaciones"
              name="observations"
              readonly
              defaultValue={operation.observations}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
        </article>
      </div>
      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Datos del solicitante
        </h2>
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col md:col-span-2 mb-4">
            <FormInput
              label="Solicitante"
              name="requesterName"
              type="text"
              readonly
              value={operation.requesterName}
              className="bg-gray text-black dark:text-white text-center"
            />
          </div>
          <FormInput
            label="Télefono"
            name="requesterPhone"
            type="text"
            readonly
            value={operation.requesterPhone || "Sin teléfono"}
            className="bg-gray text-black dark:text-white text-center"
          />
          <FormInput
            label="Celular"
            name="requesterMobile"
            type="text"
            readonly
            value={operation.requesterMobile || "Sin celular"}
            className="bg-gray text-black dark:text-white text-center"
          />
        </article>
      </div>
    </section>
  );
}
