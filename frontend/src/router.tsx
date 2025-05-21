import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignIn from '@/views/Auth/signIn'
import routes from '@/routes/index'
import { Toaster } from 'react-hot-toast';
import { lazy, Suspense } from 'react';
import AuthLayout from './layouts/AuthLayout';

const AppLayout = lazy(() => import('@/layouts/AppLayout'));

export default function Router() {
    return <BrowserRouter>
        <Toaster
            position="top-right"
            reverseOrder={false}
            containerClassName="overflow-auto"
        />
        <Routes>
            <Route element={<AuthLayout />}>
                <Route path='/auth/signin' element={<SignIn />} />
            </Route>
            <Route element={<AppLayout />}>
                {routes.map((routes, index) => {
                    const { path, component: Component } = routes;
                    return (
                        <Route key={index}
                            path={path}
                            element={
                                <Suspense>
                                    <Component />
                                </Suspense>
                            }
                        />
                    )
                })}
            </Route>
        </Routes>
    </BrowserRouter>
}