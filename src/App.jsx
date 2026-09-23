import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import CitizenLayout from './layouts/CitizenLayout';
import OfficerLayout from './layouts/OfficerLayout';

// Pages
import LandingPage from './pages/LandingPage';
import CitizenDashboard from './pages/CitizenDashboard';
import SearchLandPage from './pages/SearchLandPage';
import LandProfilePage from './pages/LandProfilePage';
import GisMapPage from './pages/GisMapPage';
import LandVerificationPage from './pages/LandVerificationPage';
import LandAlertsPage from './pages/LandAlertsPage';
import DigitalReportsPage from './pages/DigitalReportsPage';
import CitizenProfilePage from './pages/CitizenProfilePage';

import OfficerDashboard from './pages/OfficerDashboard';
import OfficerRecordsPage from './pages/OfficerRecordsPage';
import OfficerGisPage from './pages/OfficerGisPage';
import OfficerVerificationPage from './pages/OfficerVerificationPage';
import FlaggedPropertyPage from './pages/FlaggedPropertyPage';
import OfficerReportsPage from './pages/OfficerReportsPage';
import AuditTrailPage from './pages/AuditTrailPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      {/* Landing & Login Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LandingPage />} />

      {/* Citizen Portal Routes */}
      <Route path="/citizen" element={<CitizenLayout />}>
        <Route index element={<CitizenDashboard />} />
        <Route path="search" element={<SearchLandPage />} />
        <Route path="map" element={<GisMapPage />} />
        <Route path="properties" element={<CitizenDashboard />} />
        <Route path="property/:id" element={<LandProfilePage />} />
        <Route path="verification" element={<LandVerificationPage />} />
        <Route path="alerts" element={<LandAlertsPage />} />
        <Route path="reports" element={<DigitalReportsPage />} />
        <Route path="profile" element={<CitizenProfilePage />} />
      </Route>

      {/* Revenue Officer Portal Routes */}
      <Route path="/officer" element={<OfficerLayout />}>
        <Route index element={<OfficerDashboard />} />
        <Route path="records" element={<OfficerRecordsPage />} />
        <Route path="map" element={<OfficerGisPage />} />
        <Route path="verification" element={<OfficerVerificationPage />} />
        <Route path="flagged" element={<FlaggedPropertyPage />} />
        <Route path="reports" element={<OfficerReportsPage />} />
        <Route path="audit" element={<AuditTrailPage />} />
      </Route>

      {/* 404 Catch-All */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
