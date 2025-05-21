import { RiUserSettingsFill } from "@remixicon/react";

const menuItemsConfiguration: MenuItem[] = [
    {
        label: "Administración",
        icon: <RiUserSettingsFill size={18} color="white" />,
        path: "/administration",
        subItems: [
            { label: "Usuarios", path: "/administration/users" },
        ],
    }
];

export default menuItemsConfiguration;