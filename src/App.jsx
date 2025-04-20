import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { UseScrollTop } from "./hooks/useScrolltoTop";
import Login from "./components/pages/accounts/login/index";
import Signup from "./components/pages/accounts/signup/index";
import ForgotPassword from "./components/pages/accounts/forgot-password/index";
import Dashboard from "./components/pages/dashboard/index";
import Invoice from "./components/pages/invoice/index";
import ClientPage from "./components/pages/client/index";
import CreateClient from "./components/pages/client/CreateClient";
import Account from "./components/pages/user-account/index";
import BusinessInfo from "./components/pages/business-info/index";
import Reports from "./components/pages/reports/index";
import EditClient from "./components/pages/client/EditClient";
import InvoicePreview from "./components/pages/invoice/InvoicePreview";
import ShareInvoice from "./components/pages/invoice/ShareInvoice";
import CreateInvoice from "./components/pages/invoice/CreateInvoice";
import EditInvoice from "./components/pages/invoice/EditInvoice";
import InvoiceanMarketing from "./components/pages/marketing-website/index";
import AboutInvoicean from "./components/pages/marketing-website/AboutInvoicean";
import ServiceInvoicean from "./components/pages/marketing-website/ServiceInvoicean";
import TourInvnoicean from "./components/pages/marketing-website/TourInvnoicean";
import Privacy from "./components/pages/marketing-website/Privacy";
import TermsAndConditions from "./components/pages/marketing-website/TermsAndConditions";
import DataDeletionInstructions from "./components/pages/marketing-website/DataDeletionInstructions";
import Cookies from "./components/pages/marketing-website/Cookies";
import ContactPage from "./components/pages/marketing-website/ContactPage";
import FeedbackPage from "./components/pages/marketing-website/FeedbackPage";
import AOS from "aos";
import DuplicateInvoice from "./components/pages/invoice/DuplicateInvoice";
import ConfirmAccount from "./components/pages/accounts/ConfirmAccount";
import { usePageTracking } from "./hooks/usePageTracking";
import ChangePassword from "./components/pages/user-account/ChangePassword";
import SetPassword from "./components/pages/user-account/SetPassword";
import ProtectedRoute from "./components/routes/ProtectedRoute"
import PlansPage from "./components/pages/subscription/PlansPage";
import TrialPage from "./components/pages/subscription/TrialPage";
import CheckoutPage from "./components/pages/subscription/CheckoutPage";
import ManageSubscriptionPage from "./components/pages/subscription/ManageSubscriptionPage";

const App = () => {
  usePageTracking();
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <UseScrollTop />
      <Routes>
        <Route path="/" element={<InvoiceanMarketing />} />
        <Route path="/aboutus" element={<AboutInvoicean />} />
        <Route path="/features" element={<ServiceInvoicean />} />
        <Route path="/invoicean-tour" element={<TourInvnoicean />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/legal/privacy-policy" element={<Privacy />} />
        <Route
          path="/legal/terms-and-conditions"
          element={<TermsAndConditions />}
        />
        <Route
          path="/legal/data-deletion-instruction"
          element={<DataDeletionInstructions />}
        />
        <Route path="/legal/cookies-policy" element={<Cookies />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/confirm-account" element={<ConfirmAccount />} />
        <Route path="/business-info" element={<BusinessInfo />} />
        <Route path="/subscription" element={<TrialPage />} />
        <Route path="/subscription-plans" element={<PlansPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        {/* Protected Routes */}
        <Route
          element={<ProtectedRoute requireSubscription={true} />}
        >
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/invoices" element={<Invoice />} />
          <Route
            path="/invoices/duplicate-invoice/:id"
            element={<DuplicateInvoice />}
          />
          <Route path="/invoices/create-invoice" element={<CreateInvoice />} />
          <Route path="/invoices/preview/:id" element={<InvoicePreview />} />
          <Route path="/invoices/edit-invoice/:id" element={<EditInvoice />} />
          <Route path="/invoices/:id/share" element={<ShareInvoice />} />
          <Route path="/clients" element={<ClientPage />} />
          <Route path="/clients/add-client" element={<CreateClient />} />
          <Route path="/clients/edit-client/:id" element={<EditClient />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/manage-subscription" element={<ManageSubscriptionPage />} />
          <Route path="/accounts" element={<Account />} />
          <Route path="/accounts/change-password" element={<ChangePassword />} />
          <Route path="/accounts/set-password" element={<SetPassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <ToastContainer />
    </>
  );
};

export default App;
