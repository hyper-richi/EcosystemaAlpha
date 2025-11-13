import { NavLink } from 'react-router-dom';

import AppRoutes from './routes/AppRoutes';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <header>
        <nav>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/create-product">Create Product</NavLink>
        </nav>
      </header>
      <AppRoutes />
    </div>
  );
};

export default App;
