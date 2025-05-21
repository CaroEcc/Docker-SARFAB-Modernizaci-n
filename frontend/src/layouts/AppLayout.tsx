import { Navigate, Outlet } from 'react-router-dom'
import Sidebar from '@/components/common/Sidebar/Sidebar'
import Header from '@/components/common/Header/Header'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '@/components/common/Footer/Footer';
import { useAuth } from '@/hooks/auth/useAuth';
import ChangePasswordFirstLoginModal from '@/components/user/ChangePasswordFirstLoginModal';

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState<{ label: string; path?: string }[]>([]);

  const { data, isError, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 text-xl font-medium">
        <img src="/src/assets/images/signIn/logo.png" alt="Logo" className="w-32 h-32 animate-pulse" />
        <span>Cargando...</span>
      </div>
    );
  }
  if (isError) {
    return <Navigate to='/auth/signin' />
  }

  if (data) return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} breadcrumbItems={breadcrumbItems} dataUser={data} />
            <main className="flex-grow">
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10 ">
                <Outlet context={{ setBreadcrumbItems }} />
              </div>
            </main>
            <Footer />
          </div>
        </div>
      </div>
      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} className="!z-[999999] !fixed"
        position="top-right" />
      {
        data &&
        <ChangePasswordFirstLoginModal isOpen={data.firstLogin === 1} userId={data.id} />
      }
    </>
  )
}