import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';
import HomePage from '@/components/pages/HomePage';

function Layout() {
return (
<>
<ScrollToTop />
<Outlet />
</>
);
}

const router = createBrowserRouter([
{
path: "/",
element: <Layout />,
errorElement: <ErrorPage />,
children: [
{
index: true,
element: <HomePage />,
routeMetadata: {
pageIdentifier: 'home',
},
},
{
path: "*",
element: <Navigate to="/" replace />,
},
],
},
], {
basename: "/",
});

export default function AppRouter() {
return (
<MemberProvider>
<RouterProvider router={router} />
</MemberProvider>
);
}
