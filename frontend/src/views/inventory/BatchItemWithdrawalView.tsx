import BatchItemWithdrawalForm from "@/components/inventory/BatchItemWithdrawalForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";

export default function BatchItemWithdrawalView() {
  useBreadcrumb([
    { label: "Inventario", path: "/inventory/list" },
    { label: "Registro de extracción de elementos" }
  ]);
  return (
    <>
      <section className="container mx-auto p-4">
        <div className="w-full md:w-1/2 mr-auto">
          <BatchItemWithdrawalForm />
        </div>
      </section>
    </>
  )
}