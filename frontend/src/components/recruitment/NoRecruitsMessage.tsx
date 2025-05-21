import { Link } from "react-router-dom";

export function NoRecruitsMessage() {
    return (
      <div className='h-fit'>
        <p className='text-center py-20'>
          No existen reclutas. <Link to="/recruitment/create" className='text-primary font-bold'>Crear recluta</Link>
        </p>
      </div>
    );
  }