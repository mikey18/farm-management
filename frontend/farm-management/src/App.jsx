import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import InventoryManagement from "./pages/InventoryManagement";
import LivestockManagement from "./pages/LivestockManagement";
import CropManagement from "./pages/CropManagement";
import FinancialManagement from "./pages/FinancialManagement";
import CropPrediction from "./pages/CropPrediction";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/inventory" element={<InventoryManagement />} />
            <Route path="/livestock" element={<LivestockManagement />} />
            <Route path="/crops" element={<CropManagement />} />
            <Route path="/finances" element={<FinancialManagement />} />
            <Route path="/prediction" element={<CropPrediction />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
