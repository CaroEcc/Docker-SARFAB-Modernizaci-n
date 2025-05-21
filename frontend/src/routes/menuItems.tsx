import { RiAccountBox2Fill, RiAlarmWarningFill, RiShieldFill, RiNotification2Line } from '@remixicon/react';
import { RiSettings2Fill, RiUserCommunityFill, RiFileLine, RiFirstAidKitFill } from 'react-icons/ri';

const menuItems: MenuItem[] = [
    {
        label: "Notificaciones",
        path: "/notificaciones",
        icon: <RiNotification2Line size={18} color="white" />,
    },
    {
        label: "Reclutamiento",
        icon: <RiUserCommunityFill size={18} color="white" />,
        path: "/recruitment",
        subItems: [
            { label: "Lista de reclutas pendientes", path: "/recruitment/list" },
            { label: "Aprobar / Rechazar reclutas", path: "/recruitment/approve-or-deny" },
            { label: "Registrar recluta", path: "/recruitment/create" },
        ],
    },
    {
        label: "Voluntarios",
        icon: <RiAccountBox2Fill size={18} color="white" />,
        path: "/volunteers",
        subItems: [
            { label: "Ver voluntarios activos", path: "/volunteers/active-volunteers" },
            { label: "Historico de voluntarios", path: "/volunteers/volunteer-history" },
            { label: "Añadir nueva afiliación", path: "/volunteers/create" },
        ],
    },
    {
        label: "Personal militar",
        icon: <span className="material-symbols-outlined">military_tech</span>,
        path: "/military",
        subItems: [
            { label: "Ver personal militar", path: "/military/list" },
            { label: "Registrar personal militar", path: "/military/list?openMilitaryModal=true" },
        ],
    },
    {
        label: "Operaciones",
        icon: <RiAlarmWarningFill size={18} color="white" />,
        path: "/operations",
        subItems: [
            { label: "Lista de operaciones", path: "/operation/list" },
            { label: "Crear operación", path: "/operation/create" },
        ],
    },
    {
        label: "Guardias",
        icon: <RiShieldFill size={18} color="white" />,
        path: "/guards/list",
        subItems: [
            { label: "Lista de guardias", path: "/guards/list" },
            { label: "Crear guardia", path: "/guards/create" },
        ],
    },
    {
        label: "Inventario",
        icon: <RiFileLine size={18} color="white" />,
        path: "/inventory",
        subItems: [
          { label: "Lista de inventario", path: "/inventory/list" },
            {label: "Histórico de devoluciones y extracciones", path: "/inventory/movement-historical"},
            { label: "Registrar nuevo elemento", path: "/inventory/list?openItemModal=true" },
            { label: "Registrar extracción de elementos", path: "/inventory/batch-item-withdrawal" },
            { label: "Registrar devolución de elementos", path: "/inventory/batch-item-return" },
        ]
    },
    {
        label: "Sanidad",
        icon: <RiFirstAidKitFill size={18} color="white" />,
        path: "/medical-treatment/list",
        subItems: [
            { label: "Lista de tratamientos", path: "/medical-treatment/list" },
            { label: "Registrar tratamiento", path: "/medical-treatment/create" },
        ]
    },
    {
        label: "Configuración",
        icon: <RiSettings2Fill size={18} color="white" />,
        path: "/configuration",
        subItems: [
            { label: "Tipos y categorías de operación", path: "/configuration/operation-category/list" },
            { label: "Cursos", path: "/courses/list" },
            { label: "Solicitantes", path: "/configuration/requester/list" },
        ]
    },
];

export default menuItems;