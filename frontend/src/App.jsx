import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdminTypeSelector from "./components/AdminTypeSelector";
import LanguageSelector from "./components/LanguageSelector";
import FarmRegistration from "./pages/FarmRegistration";
import FarmerRegistration from "./pages/FarmerRegistration";
import MyFarms from "./pages/MyFarms";
import FarmDashboard from "./pages/FarmDashboard";
import GovernmentDashboard from "./pages/GovernmentDashboard";
import VetDashboard from "./pages/VetDashboard";
import NearbyFarms from "./pages/NearbyFarms";
import Govnearbyfarm from "./pages/Govnearbyfarm";
import DiseaseAlerts from "./pages/DiseaseAlerts";
import AdminFarmManagement from "./pages/AdminFarmManagement";
import AdminApprovals from "./pages/AdminApprovals";
import ScanFarmQR from "./pages/ScanFarmQR";
import RecentVisits from "./pages/RecentVisits";
import VetScanFarmQR from "./pages/VetScanFarmQR";
import VetAlert from "./pages/VetAlert";
import GovAlert from "./pages/GovAlert";
import Govfarmapproval from "./pages/Govfarmapproval";
import Govfarmdetails from "./pages/Govfarmdetails";
import GovScanFarmQR from "./pages/GovScanFarmQR";
import FarmDetails from "./pages/FarmDetails";
import FindSolution from "./pages/FindSolution";
import VisitorAlerts from "./pages/VisitorAlerts";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login/:role" element={<LoginPage />} />
          <Route path="/login/:role/:subtype" element={<LoginPage />} />
          <Route path="/dashboard/:role" element={<Dashboard />} />
          
          {/* Admin Routes */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/approvals" element={<AdminApprovals />} />
          <Route path="/admin/farms" element={<AdminFarmManagement />} />
          
          {/* Farmer Routes */}
          <Route path="/farmer/dashboard" element={<FarmDashboard />} />
          <Route path="/farmer/register" element={<FarmerRegistration />} />
          <Route path="/farmer/alerts" element={<DiseaseAlerts />} />
          <Route path="/farmer/solutions" element={<FindSolution />} />
          <Route path="/farms" element={<MyFarms />} />
          <Route path="/farms/:id" element={<FarmDashboard />} />
          <Route path="/farm-dashboard" element={<FarmDashboard />} />
          <Route path="/farm-details/:id" element={<FarmDetails />} />
          
          {/* Government Routes */}
          <Route path="/government/dashboard" element={<GovernmentDashboard />} />
          <Route path="/government/approvals" element={<Govfarmapproval />} />
          <Route path="/government/nearby-farms" element={<Govnearbyfarm />} />
          <Route path="/government/scan-farm" element={<GovScanFarmQR />} />
          <Route path="/government/alerts" element={<GovAlert />} />
          <Route path="/government/farm-details/:id" element={<Govfarmdetails />} />
          
          {/* Veterinarian Routes */}
          <Route path="/vet/dashboard" element={<VetDashboard />} />
          <Route path="/vet/alerts" element={<VetAlert />} />
          <Route path="/vet/scan" element={<VetScanFarmQR />} />
          <Route path="/vet/farms" element={<NearbyFarms />} />
          
          {/* Visitor Routes */}
          <Route path="/visitor/dashboard" element={<Dashboard />} />
          <Route path="/visitor/nearby" element={<NearbyFarms />} />
          <Route path="/visitor/recent" element={<RecentVisits />} />
          <Route path="/visitor/scan" element={<ScanFarmQR />} />
          <Route path="/visitor/alerts" element={<VisitorAlerts />} />
          
          {/* Legacy Routes for backward compatibility */}
          <Route path="/language-demo" element={<div className="p-8"><h1>Language Selector Test</h1><LanguageSelector variant="default" /></div>} />
          <Route path="/admin-type-selector" element={<AdminTypeSelector />} />
          <Route path="/language-selector" element={<LanguageSelector />} />
          <Route path="/farm-registration" element={<FarmRegistration />} />
          <Route path="/farmer-registration" element={<FarmerRegistration />} />
          <Route path="/my-farms" element={<MyFarms />} />
          <Route path="/nearby-farms" element={<NearbyFarms />} />
          <Route path="/gov-nearby-farm" element={<Govnearbyfarm />} />
          <Route path="/disease-alerts" element={<DiseaseAlerts />} />
          <Route path="/admin-farm-management" element={<AdminFarmManagement />} />
          <Route path="/admin-approvals" element={<AdminApprovals />} />
          <Route path="/scan-farm-qr" element={<ScanFarmQR />} />
          <Route path="/recent-visits" element={<RecentVisits />} />
          <Route path="/vet-scan-farm-qr" element={<VetScanFarmQR />} />
          <Route path="/vet-alert" element={<VetAlert />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;