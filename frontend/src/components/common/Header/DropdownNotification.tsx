import { RiNotification2Line, RiAlarmWarningFill, RiBellFill, RiErrorWarningFill } from '@remixicon/react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Notification } from '@/types/notification.schema';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useUnreadNotifications } from '@/hooks/notification/querys/useUnreadNotifications';
import { useMarkNotificationAsRead } from '@/hooks/notification/mutations/useMarkNotificationAsRead';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  const { data: notificaciones = [], isLoading: cargando } = useUnreadNotifications();
  
  const { mutate: marcarComoLeida } = useMarkNotificationAsRead();

  const manejarMarcarComoLeida = (id: number) => {
    marcarComoLeida(id);
  };

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  // Formatear fecha
  const formatearFecha = (dateString: string) => {
    try {
      return format(new Date(dateString), "dd MMM, yyyy", { locale: es });
    } catch (error) {
      return dateString;
    }
  };

  const acortarMensaje = (mensaje: string, longitudMaxima = 100) => {
    return mensaje.length > longitudMaxima
      ? `${mensaje.substring(0, longitudMaxima)}...`
      : mensaje;
  };

  const obtenerIcono = (tipo: string) => {
    const tipoEnMinusculas = tipo.toLowerCase();
    if (tipoEnMinusculas.includes('demérito') || tipoEnMinusculas.includes('demerit') || tipoEnMinusculas.includes('puntos')) {
      return <RiErrorWarningFill className="text-red-500" size={18} />;
    }
    else if (tipoEnMinusculas.includes('venc') || tipoEnMinusculas.includes('expired')) {
      return <RiAlarmWarningFill className="text-red-500" size={18} />;
    }
    else if (tipoEnMinusculas.includes('recordatorio') || tipoEnMinusculas.includes('chequeo') || tipoEnMinusculas.includes('médico')) {
      return <RiBellFill className="text-yellow-500" size={18} />;
    }
    return <RiNotification2Line className="text-primary" size={18} />;
  };

  const obtenerTextoTipo = (tipo: string) => {
    const tipoEnMinusculas = tipo.toLowerCase();
    if (tipoEnMinusculas.includes('demérito') || tipoEnMinusculas.includes('demerit') || tipoEnMinusculas.includes('puntos')) {
      return 'Límite de faltas acumuladas';
    } 
    else if (tipoEnMinusculas.includes('venc') || tipoEnMinusculas.includes('expired') || 
            (tipoEnMinusculas.includes('médico') && tipoEnMinusculas.includes('venc'))) {
      return 'Chequeo médico vencido';
    }
    else if (tipoEnMinusculas.includes('recordatorio') || 
            (tipoEnMinusculas.includes('médico') && !tipoEnMinusculas.includes('venc'))) {
      return 'Recordatorio de chequeo médico';
    }
    else if (tipoEnMinusculas.includes('medical') && 
            (tipoEnMinusculas.includes('checkup') || tipoEnMinusculas.includes('check'))) {
      if (tipoEnMinusculas.includes('expired')) {
        return 'Chequeo médico vencido';
      } else {
        return 'Recordatorio de chequeo médico';
      }
    }
    return tipo;
  };

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        {notificaciones.length > 0 && (
          <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1">
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
        )}
        <RiNotification2Line size={20} className="fill-current duration-300 ease-in-out" />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        <div className="flex justify-between items-center px-4.5 py-3">
          <h5 className="text-sm font-medium text-bodydark2">
            Notificaciones {notificaciones.length > 0 ? `(${notificaciones.length})` : ''}
          </h5>
          {notificaciones.length > 0 && (
            <Link 
              to="/notificaciones" 
              className="text-xs text-primary hover:underline"
            >
              Ver todas
            </Link>
          )}
        </div>

        <ul className="flex h-auto flex-col overflow-y-auto">
          {cargando ? (
            <li className="px-4.5 py-3 text-center">
              Cargando notificaciones...
            </li>
          ) : notificaciones.length === 0 ? (
            <li className="px-4.5 py-3 text-center">
              No tienes notificaciones nuevas
            </li>
          ) : (
            notificaciones.map((notificacion: Notification) => (
              <li key={notificacion.id}>
                <Link
                  className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                  to="#"
                  onClick={() => manejarMarcarComoLeida(notificacion.id)}
                >
                  <div className="flex items-center gap-2">
                    {obtenerIcono(notificacion.type)}
                    <span className="text-sm font-medium text-black dark:text-white">
                      {obtenerTextoTipo(notificacion.type)}
                    </span>
                  </div>
                  <p className="text-sm ml-6">
                    {acortarMensaje(notificacion.message)}
                  </p>

                  <p className="text-xs ml-6">{formatearFecha(notificacion.sentAt)}</p>
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </li>
  );
};

export default DropdownNotification;
