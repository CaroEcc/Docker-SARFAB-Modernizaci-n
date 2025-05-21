import { RiAddLine } from "@remixicon/react";
import { Link } from "react-router-dom";

export function GuardHeader() {
    return (
        <nav>
            <Link to="/guards/create" className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-10 text-white hover:bg-opacity-90">
                <RiAddLine className='me-2' /> Registrar guardia
            </Link>
        </nav>
    );
}