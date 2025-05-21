import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function OperationHeader() {
  return (
    <nav>
      <Link to="/operation/create" className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90">
        <RiAddLine className='me-2' /> Crear nueva operación
      </Link>
    </nav>
    );
}