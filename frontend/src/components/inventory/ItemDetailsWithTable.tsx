import { ItemWithPendingTable } from "@/types/invetory.schema";
import FormInput from "../common/FormInput/FormInput";
import BackLink from "../common/BackLink/BackLink";
export default function ItemDetailsWithTable({
  item,
}: {
  item: ItemWithPendingTable;
  }) {
  return (
    <section className="space-y-6">
      <div className="rounded-md border border-stroke bg-white p-6 shadow-md dark:border-strokedark dark:bg-boxdark">
        <div className="-mx-6 -mt-2">
          <BackLink text="Volver al listado de elementos" link="/inventory/list" className="pt-0" />
        </div>
        <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white mt-4">
          Datos del elemento
        </h2>
        <article className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col md:col-span-2 mb-4">
            <FormInput
              label="Nombre del elemento"
              name="name"
              type="text"
              readonly
              value={item.name}
              className="bg-gray text-black dark:text-white"
            />
          </div>
          <div className="flex flex-col md:col-span-2 mb-4">
            <FormInput
              label="Cantidad total"
              name="totalQuantity"
              type="text"
              readonly
              value={`${item.totalQuantity} ${item.totalQuantity === 1 ? "elemento" : "elementos"}`}
              className="bg-gray text-black dark:text-white"
            />
          </div>
          <div className="md:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">
              Voluntarios pendientes de devolución
            </h2>
          </div>
          <div className="md:col-span-2">
          <table className="w-full table-auto text-center border-collapse border border-stroke dark:border-strokedark">
          <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4 border border-stroke dark:border-strokedark">
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Nombre de la persona
                </th>
                <th className="py-4 px-4 text-center font-bold text-black dark:text-white border border-stroke dark:border-strokedark">
                  Cantidad
                </th>
              </tr>
            </thead>
            <tbody>
              {item.pendingReturns?.length > 0 ? (
                item.pendingReturns.map((pendingReturn) => (
                  <tr
                    key={pendingReturn.volunteerId}
                    className="border border-stroke dark:border-strokedark"
                  >
                    <td className="py-4 px-4 text-center text-black dark:text-white">
                      {pendingReturn.volunteerWithGrade}
                    </td>
                    <td className="py-4 px-4 text-center text-black dark:text-white">
                      {pendingReturn.quantity}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-4 px-4 text-center text-black dark:text-white">
                    No hay personas pendientes de devolución
                  </td>
                </tr>
              )}
            </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  );
}