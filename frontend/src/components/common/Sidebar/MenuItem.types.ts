interface MenuItem {
    label: string;
    path: string;
    icon: JSX.Element;
    subItems?: SubItem[];
}