import BatchItemReturnForm from "@/components/inventory/BatchItemReturnForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";

export default function BatchItemReturnView() {
  useBreadcrumb([
    { label: "Inventario", path: "/inventory/list" },
    { label: "Registro de devolución de elementos" }
  ]);
  return (
    <>
      <section className="container mx-auto p-4">
        <div className="w-full md:w-1/2 mr-auto">
          <BatchItemReturnForm />
        </div>
      </section>
    </>
  )
}