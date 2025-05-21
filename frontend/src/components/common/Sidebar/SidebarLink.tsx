import { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarLinkProps {
  to: string;
  children: ReactNode;
  setSidebarOpen?: (open: boolean) => void;
  className?: string;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ to, children, setSidebarOpen, className = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = location.pathname + location.search === to || location.pathname.includes(to);

  return (
    <a
      href={to}
      className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out hover:text-white 
        ${isActive ? "!text-white" : "text-bodydark2"} ${className}`}
      onClick={(e) => {
        e.preventDefault();
        navigate(to);
        if (setSidebarOpen) setSidebarOpen(false);
      }}
    >
      {children}
    </a>
  );
};

export default SidebarLink;
