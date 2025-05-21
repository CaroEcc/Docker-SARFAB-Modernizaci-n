import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function InventoryHeader() {
  return (
    <nav>
      <Link to="?openItemModal=true" className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90">
        <RiAddLine className='me-2' /> Agregar nuevo elemento en inventario
      </Link>
    </nav>
  );
}