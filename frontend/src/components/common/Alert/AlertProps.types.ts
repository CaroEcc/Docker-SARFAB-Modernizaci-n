interface AlertProps {
    type: 'warning' | 'success' | 'error';
    title: string;
    message: string;
    icon?: JSX.Element;
    className?: string;
    renderContent?: () => JSX.Element;
  
}