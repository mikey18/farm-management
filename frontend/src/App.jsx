import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Layout from './components/Layout';
// import InventoryManagement from './pages/InventoryManagement';
// import LivestockManagement from './pages/LivestockManagement';
// import CropManagement from './pages/CropManagement';
// import FinancialManagement from './pages/FinancialManagement';
// import CropPrediction from './pages/CropPrediction';
import NotFound from './pages/NotFound';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<Dashboard />} />
                {/* <Route path="inventory" element={<InventoryManagement />} /> */}
                {/* <Route path="livestock" element={<LivestockManagement />} />
                <Route path="crops" element={<CropManagement />} />
                <Route path="finances" element={<FinancialManagement />} />
                <Route path="prediction" element={<CropPrediction />} /> */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
