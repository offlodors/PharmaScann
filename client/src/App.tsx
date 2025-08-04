
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/hooks/use-language";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import HowItWorks from "@/pages/how-it-works";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import MedicalDisclaimer from "@/pages/medical-disclaimer";
import HelpCenter from "@/pages/help-center";
import Contact from "@/pages/contact";
import ReportIssue from "@/pages/report-issue";
import ChatPage from "@/pages/chat";
import SettingsPage from "@/pages/settings";
import AdSenseScript from "@/components/ads/AdSenseScript";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/medical-disclaimer" component={MedicalDisclaimer} />
      <Route path="/help-center" component={HelpCenter} />
      <Route path="/contact" component={Contact} />
      <Route path="/report-issue" component={ReportIssue} />
      <Route path="/chat" component={ChatPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <AdSenseScript clientId={import.meta.env.VITE_ADSENSE_CLIENT_ID || "ca-pub-0000000000000000"} />
          <Toaster />
          <Router />
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
