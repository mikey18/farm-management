import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
import InventoryManagement from './pages/InventoryManagement';
import LivestockManagement from './pages/LivestockManagement';
import CropManagement from './pages/CropManagement';
import FinancialManagement from './pages/FinancialManagement';
import CropPrediction from './pages/CropPrediction';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, []);
    return (
        <Provider store={store}>
            <Routes>
                {auth === true && (
                    <>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<Dashboard />} />
                            <Route
                                path="inventory"
                                element={<InventoryManagement />}
                            />
                            <Route
                                path="livestock"
                                element={<LivestockManagement />}
                            />
                            <Route path="crops" element={<CropManagement />} />
                            <Route
                                path="finances"
                                element={<FinancialManagement />}
                            />

                            <Route
                                path="prediction"
                                element={<CropPrediction />}
                            />
                        </Route>
                    </>
                )}
                {auth === false && (
                    <>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </>
                )}
                {auth === true && auth === false && (
                    <Route path="*" element={<NotFound />} />
                )}
            </Routes>
        </Provider>
    );
}

export default App;
