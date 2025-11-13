import { NavLink } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => {
  const navLinkClassName = ({ isActive }: { isActive: boolean }) =>
    [
      'rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-300',
      'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80',
      isActive
        ? 'bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-500 text-white shadow-[0_8px_24px_rgba(129,140,248,0.45)] hover:shadow-[0_12px_40px_rgba(129,140,248,0.65)]'
        : 'text-white/80 hover:text-white hover:bg-white/10 hover:shadow-[0_6px_18px_rgba(255,255,255,0.15)]',
    ].join(' ');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_#3b82f633,_transparent_55%),radial-gradient(circle_at_bottom,_#a855f733,_transparent_55%)]" />
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-10">
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.5em] text-white/50">Ecosystema</p>
            <h1 className="text-2xl font-semibold tracking-tight text-white drop-shadow sm:text-3xl">
              SPA Products
            </h1>
          </div>
          <nav className="flex flex-wrap items-center gap-3">
            <NavLink to="/products" end className={navLinkClassName}>
              Products
            </NavLink>
            <NavLink to="/create-product" className={navLinkClassName}>
              Create Product
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl flex-1 flex-col overflow-hidden px-4 py-8 sm:px-6 lg:px-10">
        <AppRoutes />
      </main>
    </div>
  );
};

export default App;
