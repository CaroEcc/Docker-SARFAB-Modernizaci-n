import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function VolunteerHeader() {
    return (
      <nav>
        <Link to="/volunteers/create" className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90">
          <RiAddLine className='me-2' /> Añadir nueva afilicación
        </Link>
      </nav>
    );
  }
  