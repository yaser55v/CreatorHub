import { Outlet } from 'react-router-dom';
import { Navbar } from '@/layout/navbar';
import { Footer } from '@/layout/footer';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}