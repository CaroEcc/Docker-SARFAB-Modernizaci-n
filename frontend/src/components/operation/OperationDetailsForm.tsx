import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { OperationDetailsFormProps } from './types/OperationDetailsProps';
import FormInput from '@/components/common/FormInput/FormInput';
import FormDate from '@/components/common/FormDate/FormDate';
import FilterDatalist from '@/components/common/FilterDatalist/FilterDatalist';
import ErrorFormMessage from '../common/ErrorFormMessage/ErrorFormMessage';
import BackLink from '../common/BackLink/BackLink';

export default function OperationDetailsForm({
  errors,
  register,
  control,
  operationContext,
}: OperationDetailsFormProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<
    number | null
  >(null);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null,
  );

  const mappedOperationContext = operationContext
    ? {
        operationTypes: operationContext.operationTypes.map(
          ({ operationTypeId, name, operationCategoryId }) => ({
            id: operationTypeId,
            name,
            categoryId: operationCategoryId,
          }),
        ),
        operationCategories: operationContext.operationCategories.map(
          ({ operationCategoryId, name }) => ({
            id: operationCategoryId,
            name,
          }),
        ),
        departments: operationContext.departments.map(
          ({ departmentId, name }) => ({
            id: departmentId,
            name,
          }),
        ),
        provinces: operationContext.provinces.map(
          ({ provinceId, name, departmentId }) => ({
            id: provinceId,
            name,
            departmentId,
          }),
        ),
        municipalities: operationContext.municipalities.map(
          ({ municipalityId, name, provinceId }) => ({
            id: municipalityId,
            name,
            provinceId,
          }),
        ),
      }
    : null;

  const filteredOperationTypes =
    mappedOperationContext?.operationTypes.filter(
      (type) => type.categoryId === selectedCategoryId,
    ) || [];

  const filteredProvinces =
    mappedOperationContext?.provinces.filter(
      (province) => province.departmentId === selectedDepartmentId,
    ) || [];

  const filteredMunicipalities =
    mappedOperationContext?.municipalities.filter(
      (municipality) => municipality.provinceId === selectedProvinceId,
    ) || [];
  const handleSelection = (
    value: string,
    options: { id: number; name: string }[],
    setState: (id: number | null) => void,
  ) => {
    const selected = options.find((option) => option.name === value);
    setState(selected?.id || null);
  };

  return (
    <div className="space-y-6">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <FilterDatalist
            name="operationCategoryId"
            label="Categoría"
            options={mappedOperationContext?.operationCategories || []}
            onChange={(value) =>
              handleSelection(
                value,
                mappedOperationContext?.operationCategories || [],
                setSelectedCategoryId,
              )
            }
            value={
              selectedCategoryId
                ? mappedOperationContext?.operationCategories.find(
                    (option) => option.id === selectedCategoryId,
                  )?.name || ''
                : ''
            }
          />
          <Controller
            name="operationTypeId"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col">
                <FilterDatalist
                  {...field}
                  label="Tipo de Operación"
                  options={filteredOperationTypes}
                  onChange={(value) => {
                    const selected = filteredOperationTypes.find(
                      (option) => option.name === value,
                    );
                    field.onChange(selected?.id || '');
                  }}
                  value={
                    filteredOperationTypes.find(
                      (option) => option.id === field.value,
                    )?.name || ''
                  }
                  disabled={!selectedCategoryId}
                />
                {errors.operationTypeId && (
                  <ErrorFormMessage>
                    {errors.operationTypeId.message}
                  </ErrorFormMessage>
                )}
              </div>
            )}
          />
        </div>
        <div className="flex flex-col md:col-span-2 mb-4">
          <FilterDatalist
            name="departmentId"
            label="Departamento"
            options={mappedOperationContext?.departments || []}
            onChange={(value) => {
              handleSelection(
                value,
                mappedOperationContext?.departments || [],
                setSelectedDepartmentId,
              );
              setSelectedProvinceId(null);
            }}
            value={
              selectedDepartmentId
                ? mappedOperationContext?.departments.find(
                    (option) => option.id === selectedDepartmentId,
                  )?.name || ''
                : ''
            }
          />
        </div>
        <div className="flex flex-col md:col-span-2 mb-4">
          <FilterDatalist
            name="provinceId"
            label="Provincia"
            options={filteredProvinces}
            onChange={(value) =>
              handleSelection(value, filteredProvinces, setSelectedProvinceId)
            }
            value={
              selectedProvinceId
                ? filteredProvinces.find(
                    (option) => option.id === selectedProvinceId,
                  )?.name || ''
                : ''
            }
            disabled={!selectedDepartmentId}
          />
        </div>
        <Controller
          name="municipalityId"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col md:col-span-2 mb-4">
              <FilterDatalist
                {...field}
                label="Municipio"
                options={filteredMunicipalities}
                onChange={(value) => {
                  const selected = filteredMunicipalities.find(
                    (option) => option.name === value,
                  );
                  field.onChange(selected?.id || '');
                }}
                value={
                  filteredMunicipalities.find(
                    (option) => option.id === field.value,
                  )?.name || ''
                }
                disabled={!selectedProvinceId}
              />
              {errors.municipalityId && (
                <ErrorFormMessage>
                  {errors.municipalityId.message}
                </ErrorFormMessage>
              )}
            </div>
          )}
        />
        <div className="flex flex-col mb-4">
          <FormInput
            name="address"
            label="Dirección"
            placeholder="Ingrese la dirección"
            register={register}
            errors={errors}
            required
          />
          {errors.address && (
            <ErrorFormMessage>{errors.address.message}</ErrorFormMessage>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <FormDate
              name="departureDate"
              label="Fecha de salida"
              register={register}
              required
            />
            {errors.departureDate && (
              <ErrorFormMessage>
                {errors.departureDate.message}
              </ErrorFormMessage>
            )}
          </div>

          <div className="flex flex-col">
            <FormDate
              name="arrivalDate"
              label="Fecha de llegada"
              register={register}
              required
            />
            {errors.arrivalDate && (
              <ErrorFormMessage>{errors.arrivalDate.message}</ErrorFormMessage>
            )}
          </div>
        </div>
      </div>
      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
          Datos del solicitante
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <FormInput
              name="requester.requesterName"
              label="Solicitante"
              placeholder="Nombre del solicitante"
              register={register}
              errors={errors}
              required
            />
            {errors.requester?.requesterName && (
              <ErrorFormMessage>
                {errors.requester.requesterName.message}
              </ErrorFormMessage>
            )}
          </div>

          <FormInput
            name="requester.requesterPhone"
            label="Teléfono"
            placeholder="Teléfono del solicitante"
            register={register}
            errors={errors}
          />
          <div className="flex flex-col">
            <FormInput
              name="requester.requesterMobilePhone"
              label="Celular"
              placeholder="Celular del solicitante"
              register={register}
              errors={errors}
              required
            />
            {errors.requester?.requesterMobilePhone && (
              <ErrorFormMessage>
                {errors.requester.requesterMobilePhone.message}
              </ErrorFormMessage>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
