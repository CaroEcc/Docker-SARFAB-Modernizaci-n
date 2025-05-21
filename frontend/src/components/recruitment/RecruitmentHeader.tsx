import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function RecruitmentHeader() {
    return (
      <nav>
        <Link to="/recruitment/create" className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90">
          <RiAddLine className='me-2' /> Añadir nuevo recluta
        </Link>
      </nav>
    );
  }
  