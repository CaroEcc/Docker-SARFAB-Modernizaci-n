interface BreadcrumbItem {
    label: string;
    path?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    renderItem?: (item: BreadcrumbItem, isLast: boolean) => React.ReactNode;
}