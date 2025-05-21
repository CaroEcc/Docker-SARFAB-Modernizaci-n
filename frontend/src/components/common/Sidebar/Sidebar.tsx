import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from '@/assets/images/logo/logo-sar-sidebar.webp';
import SidebarLinkGroup from "./SidebarLinkGroup";
import { RiArrowDownSLine } from '@remixicon/react';
import menuItems from "@/routes/menuItems";
import menuItemsConfiguration from "@/routes/menuItemsConfiguration";
import SidebarLink from "./SidebarLink";

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded == null ? false : storedSidebarExpanded === 'true'
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebar ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      ) {
        return;
      }
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`z-9999 absolute left-0 top-0 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear
                dark:bg-boxdark lg:static lg:translate-x-0
               ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
        </button>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <li key={item.label}>
                  {item.subItems ? (
                    <SidebarLinkGroup
                      activeCondition={pathname === item.path || pathname.includes(item.path)}
                    >
                      {(handleClick, open) => (
                        <React.Fragment>
                          <NavLink
                            to={item.path}
                            className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === item.path || pathname.includes(item.path)
                              ? 'bg-graydark dark:bg-meta-4'
                              : ''
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                            }}
                          >
                            {item.icon}
                            {item.label}
                            <RiArrowDownSLine
                              size={18}
                              className={`absolute right-4 transform transition-transform ${open ? 'rotate-180' : ''
                                }`}
                            />
                          </NavLink>
                          <div
                            className={`translate transform overflow-hidden ${!open ? 'hidden' : ''}`}>
                            <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                              {item.subItems &&
                                <>
                                  {item.subItems?.map((subItem) => (
                                    <li key={subItem.label}>
                                      <SidebarLink to={subItem.path} setSidebarOpen={setSidebarOpen}>
                                        {subItem.label}
                                      </SidebarLink>
                                    </li>
                                  ))}
                                </>}
                            </ul>
                          </div>
                        </React.Fragment>
                      )}
                    </SidebarLinkGroup>
                  ) : (
                    <NavLink
                      to={item.path}
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === item.path ? 'bg-graydark dark:bg-meta-4' : ''
                        }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>

          </div>
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              Otros
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {menuItemsConfiguration.map((item) =>
                item.subItems ? (
                  <SidebarLinkGroup
                    key={item.label}
                    activeCondition={pathname === item.path || pathname.includes(item.path)}
                  >
                    {(handleClick, open) => (
                      <>
                        <NavLink
                          to={item.path}
                          className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === item.path || pathname.includes(item.path)
                            ? 'bg-graydark dark:bg-meta-4'
                            : ''}`}
                          onClick={(e) => {
                            e.preventDefault();
                            sidebarExpanded ? handleClick() : setSidebarExpanded(true);
                          }}
                        >
                          {item.icon}
                          {item.label}
                          <RiArrowDownSLine
                            size={18}
                            className={`absolute right-4 transform transition-transform ${open ? 'rotate-180' : ''}`}
                          />
                        </NavLink>
                        <div className={`translate transform overflow-hidden ${!open ? 'hidden' : ''}`}>
                          <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                            {item.subItems?.map((subItem) => (
                              <li key={subItem.label}>
                                <NavLink
                                  to={subItem.path}
                                  className={({ isActive }) =>
                                    'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                                    (isActive ? '!text-white' : '')
                                  }
                                  onClick={() => setSidebarOpen(false)}
                                >
                                  {subItem.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </SidebarLinkGroup>
                ) : (
                  <li key={item.label}>
                    <NavLink
                      to={item.path}
                      className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4
                         ${pathname === item.path ? 'bg-graydark dark:bg-meta-4' : ''}`}
                    >
                      {item.icon}
                      {item.label}
                    </NavLink>
                  </li>
                )
              )}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
