import LandingPage from "./LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import { ChatProvider } from "./context/UserContext";
import Location from "./Location";
import BookDoctor from "./pages/BookDoctor";
import BookAppointment from "./pages/BookAppointment";
import AppointmentsConfirmation from "./pages/AppointmentsConfirmation";
import { Book } from "lucide-react";
import PatientForm from "./pages/patientform";
function App() {
  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/location" element={<Location />} />
          <Route path="/patientform" element={<PatientForm />} /> 
          <Route path="/dashboard" element={<Dashboard />} />   
          <Route path="/doctors" element={<BookDoctor />} />
          <Route path="/chatbot" element={<Home />} />
          <Route path="/chatbot/chat" element={<Chat />} />
          <Route path="/book-appointment" element={<BookAppointment />} />
          <Route path="/appointments-confirmation" element={<AppointmentsConfirmation />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
