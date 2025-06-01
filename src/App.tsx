import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/AdminLogin';
import Dashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import ArtForm from './pages/ArtForm';
import ProtectedRoute from './ProtectedRoute';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/dashboard' element={
          <ProtectedRoute>
            <Dashboard>

            </Dashboard>
          </ProtectedRoute>
        }/>
        <Route path='/admin-products' element={
          <ProtectedRoute>
            <AdminProducts></AdminProducts>
          </ProtectedRoute>
        }/>
        <Route path='/art-form' element={
          <ProtectedRoute>
            <ArtForm></ArtForm>
          </ProtectedRoute>
        }/>
      </Routes>
  );
}

export default App;
