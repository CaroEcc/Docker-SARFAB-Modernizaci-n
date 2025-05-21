import FilterSearchBox from "@/components/common/FilterSearchBox/FilterSearchBox";
import { useAllNotifications } from '@/hooks/notification/querys/useAllNotifications';
import { useMarkNotificationAsRead } from '@/hooks/notification/mutations/useMarkNotificationAsRead';
import { useDeleteNotification } from '@/hooks/notification/mutations/useDeleteNotification';
import { Notification } from '@/types/notification.schema';
import { RiAlarmWarningFill, RiBellFill, RiCheckDoubleFill, RiErrorWarningFill, RiNotification2Line, RiDeleteBinLine, RiUserSearchLine } from '@remixicon/react';
import { useState, useMemo } from 'react';
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { useNavigate } from 'react-router-dom';
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal/Modal";

export default function NotificationListView() {
  const [filtro, setFiltro] = useState<'todas' | 'leidas' | 'no-leidas'>('todas');
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const forPage = 8;

  const { data: notificaciones = [], isLoading: cargando } = useAllNotifications();
  const { mutate: marcarComoLeida } = useMarkNotificationAsRead();
  const { mutate: eliminarNotificacion, isPending: eliminando } = useDeleteNotification();
  const navigate = useNavigate();
  const [modalMarcarTodasAbierto, setModalMarcarTodasAbierto] = useState(false);
const [modalEliminarAbierto, setModalEliminarAbierto] = useState(false);
const [notificacionAEliminar, setNotificacionAEliminar] = useState<Notification | null>(null);

  const breadcrumbItems = [
    {
      label: "Notificaciones",
      path: "/notifications"
    }
  ];
  useBreadcrumb(breadcrumbItems);

  const formatearFecha = (dateString: string) => {
    try {
      let anio, mes, dia, hora, minuto;
      if (dateString.includes('T')) {
        const [fechaParte, horaParte] = dateString.split('T');
        [anio, mes, dia] = fechaParte.split('-');
        [hora, minuto] = horaParte.split(':');
      } else if (dateString.includes(' ')) {
        const [fechaParte, horaParte] = dateString.split(' ');
        [anio, mes, dia] = fechaParte.split('-');
        [hora, minuto] = horaParte.split(':');
      } else {
        return dateString;
      }
      let horaBolivia = parseInt(hora, 10) - 4;
      if (horaBolivia < 0) horaBolivia = 24 + horaBolivia;
      const horaFormateada = horaBolivia.toString().padStart(2, '0');
      return `${dia}/${mes}/${anio} ${horaFormateada}:${minuto}`;
    } catch {
      return dateString;
    }
  };

  const obtenerIcono = (tipo: string) => {
    const t = tipo.toLowerCase();
    if (t.includes('demérito') || t.includes('demerit') || t.includes('puntos')) return <RiErrorWarningFill className="text-red-500" size={20} />;
    if (t.includes('venc') || t.includes('expired')) return <RiAlarmWarningFill className="text-red-500" size={20} />;
    if (t.includes('recordatorio') || t.includes('chequeo') || t.includes('médico')) return <RiBellFill className="text-yellow-500" size={20} />;
    return <RiNotification2Line className="text-primary" size={20} />;
  };

  const obtenerTextoTipo = (tipo: string) => {
    const t = tipo.toLowerCase();
    if (t.includes('demérito') || t.includes('demerit') || t.includes('puntos')) return 'Límite de faltas acumuladas';
    if (t.includes('venc') || t.includes('expired') || (t.includes('médico') && t.includes('venc'))) return 'Chequeo médico vencido';
    if (t.includes('recordatorio') || (t.includes('médico') && !t.includes('venc'))) return 'Recordatorio de chequeo médico';
    if (t.includes('medical') && (t.includes('checkup') || t.includes('check'))) return t.includes('expired') ? 'Chequeo médico vencido' : 'Recordatorio de chequeo médico';
    return tipo;
  };

  const notificacionesOrdenadas = useMemo(() => {
    return [...notificaciones].sort((a, b) => {
      if (a.wasRead === b.wasRead) {
        return new Date(b.sentAt).getTime() - new Date(a.sentAt).getTime();
      }
      return a.wasRead ? 1 : -1;
    });
  }, [notificaciones]);

  const notificacionesFiltradas = useMemo(() => {
    return notificacionesOrdenadas.filter((n) => {
      const estado = filtro === 'todas' ? true : filtro === 'leidas' ? n.wasRead : !n.wasRead;
      const texto = busqueda.trim().toLowerCase();
      const contiene = texto === '' || n.message.toLowerCase().includes(texto) || obtenerTextoTipo(n.type).toLowerCase().includes(texto);
      return estado && contiene;
    });
  }, [notificacionesOrdenadas, filtro, busqueda]);

  const totalPaginas = Math.ceil(notificacionesFiltradas.length / forPage);

  const notificacionesPaginadas = useMemo(() => {
    const inicio = (paginaActual - 1) * forPage;
    return notificacionesFiltradas.slice(inicio, inicio + forPage);
  }, [notificacionesFiltradas, paginaActual]);

  const manejarMarcarComoLeida = (id: number) => marcarComoLeida(id);
  const manejarEliminarNotificacion = (notificacion: Notification) => {
    setNotificacionAEliminar(notificacion);
    setModalEliminarAbierto(true);
  };
  const confirmarEliminarNotificacion = () => {
    if (notificacionAEliminar) {
      eliminarNotificacion(notificacionAEliminar.id);
      setNotificacionAEliminar(null);
      setModalEliminarAbierto(false);
    }
  };
  const manejarMarcarTodasComoLeidas = () => {
    setModalMarcarTodasAbierto(true);
  };
  const confirmarMarcarTodasComoLeidas = () => {
    notificacionesFiltradas.filter(n => !n.wasRead).forEach(n => marcarComoLeida(n.id));
    setModalMarcarTodasAbierto(false);
  };

  const filtroButtons: {
    type: "button";
    label: string;
    onClick: () => void;
    variant?: "primary" | "dark" | "secondary" | "danger" | "success" | "warning";
  }[] = [
      {
        type: "button",
        label: "Todas",
        onClick: () => {
          setFiltro("todas");
          setPaginaActual(1);
        },
        variant: filtro === "todas" ? "primary" : "dark",
      },
      {
        type: "button",
        label: "No leídas",
        onClick: () => {
          setFiltro("no-leidas");
          setPaginaActual(1);
        },
        variant: filtro === "no-leidas" ? "primary" : "dark",
      },
      {
        type: "button",
        label: "Leídas",
        onClick: () => {
          setFiltro("leidas");
          setPaginaActual(1);
        },
        variant: filtro === "leidas" ? "primary" : "dark",
      },
    ];

  return (
    <div className="flex flex-col">
      <div>
        <div className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="w-full sm:w-72 md:w-80">
            <FilterSearchBox
              name="buscar-notificaciones"
              placeholder="Buscar en notificaciones..."
              className="w-full"
              value={busqueda}
              onChange={(value: string) => setBusqueda(value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonGroup buttons={filtroButtons} />
            {notificacionesFiltradas.some(n => !n.wasRead) && (
              <button
                onClick={manejarMarcarTodasComoLeidas}
                className="flex items-center justify-center gap-1 rounded bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-opacity-90"
              >
                <RiCheckDoubleFill size={16} />
                <span>Marcar todas como leídas</span>
              </button>
            )}
          </div>
        </div>

        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {cargando ? (
            <Loader message="Cargando notificaciones..." />
          ) : notificacionesFiltradas.length === 0 ? (
            <div className="flex h-100 flex-col items-center justify-center text-center p-4">
              <RiNotification2Line className="mb-2 text-gray-400 dark:text-gray-600" size={48} />
              <h5 className="mb-1 text-lg font-medium text-black dark:text-white">
                No hay notificaciones
              </h5>
              <p className="text-sm text-body">
                {filtro === 'todas'
                  ? 'No tienes notificaciones en este momento'
                  : filtro === 'leidas'
                    ? 'No tienes notificaciones leídas'
                    : 'No tienes notificaciones sin leer'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              {notificacionesPaginadas.map((notificacion: Notification) => (
                <div
                  key={notificacion.id}
                  className={`rounded-lg border p-5 h-full transition-all hover:shadow-md ${notificacion.wasRead
                    ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800'
                    : 'border-primary bg-blue-50 dark:border-blue-900/20 dark:bg-boxdark'
                    }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      {obtenerIcono(notificacion.type)}
                      <h5 className="font-medium text-black dark:text-white">
                        {obtenerTextoTipo(notificacion.type)}
                      </h5>
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      {!notificacion.wasRead && (
                        <button
                          onClick={() => manejarMarcarComoLeida(notificacion.id)}
                          className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs text-white hover:bg-opacity-90"
                        >
                          <RiCheckDoubleFill size={14} />
                          <span>Marcar como leída</span>
                        </button>
                      )}
                      {notificacion.wasRead && (
                        <button
                        onClick={() => manejarEliminarNotificacion(notificacion)}
                          className="flex items-center gap-1 rounded-md bg-danger px-3 py-1 text-xs text-white hover:bg-opacity-90"
                          disabled={eliminando}
                        >
                          <RiDeleteBinLine size={14} />
                          <span>Eliminar</span>
                        </button>
                      )}
                      {notificacion.volunteerId > 0 && (
                        <button
                          onClick={() => navigate(`/volunteers/${notificacion.volunteerId}/view`)}
                          className="flex items-center gap-1 rounded-md bg-primary px-3 py-1 text-xs text-white hover:bg-opacity-90"
                        >
                          <RiUserSearchLine size={14} />
                          <span>Ver voluntario</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 border-l-2 border-gray-300 pl-4 dark:border-gray-600">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {notificacion.message}
                    </p>
                  </div>
                  <div className="mt-3 flex justify-between items-center text-xs">
                    <span className="text-gray-500 dark:text-gray-400">
                      {formatearFecha(notificacion.sentAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {totalPaginas > 1 && (
        <div className="mt-6 flex justify-center gap-2 py-6 dark:text-white">
          <button
            onClick={() => setPaginaActual(prev => Math.max(1, prev - 1))}
            disabled={paginaActual === 1}
            className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          >Anterior</button>
          {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(num => (
            <button
              key={num}
              onClick={() => setPaginaActual(num)}
              className={`rounded px-3 py-1 text-sm ${paginaActual === num ? 'bg-primary text-white' : 'bg-gray-100 text-black hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
                }`}
            >{num}</button>
          ))}
          <button
            onClick={() => setPaginaActual(prev => Math.min(totalPaginas, prev + 1))}
            disabled={paginaActual === totalPaginas}
            className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300 disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600"
          >Siguiente</button>
        </div>
      )}
      {/* Modal para Marcar Todas Como Leídas */}
    <Modal
      isOpen={modalMarcarTodasAbierto}
      onClose={() => setModalMarcarTodasAbierto(false)}
      title="Confirmar Acción"
      fitContent
    >
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        ¿Estás seguro de que deseas marcar todas las notificaciones como leídas?
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setModalMarcarTodasAbierto(false)}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          onClick={confirmarMarcarTodasComoLeidas}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-opacity-90"
        >
          Confirmar
        </button>
      </div>
    </Modal>

    {/* Modal para Eliminar Notificación */}
    <Modal
      isOpen={modalEliminarAbierto}
      onClose={() => {
        setModalEliminarAbierto(false);
        setNotificacionAEliminar(null);
      }}
      title="Confirmar Eliminación"
      fitContent
    >
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        ¿Estás seguro de que deseas eliminar esta notificación? Esta acción no se puede deshacer.
      </p>
      <div className="flex justify-end gap-3">
        <button
          onClick={() => {
            setModalEliminarAbierto(false);
            setNotificacionAEliminar(null);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          onClick={confirmarEliminarNotificacion}
          className="px-4 py-2 text-sm font-medium text-white bg-danger rounded-md hover:bg-opacity-90"
          disabled={eliminando}
        >
          {eliminando ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </Modal>
    </div>
  );
}
