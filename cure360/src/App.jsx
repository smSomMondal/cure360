import LandingPage from "./LandingPage";
import {
  BrowserRouter,
  Routes,
  Route,
  redirect,
  Navigate,
  Outlet,
} from "react-router-dom";
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
import HospitalLandingPage from "./pages/BookHospitalPage";
import HospitalSelection from "./pages/Hospitalselection";
import Signup from "./component/loging/Signup";
import Login from "./component/loging/Login";
import Doctor from "./doctor/Doctor";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContex";
import AddDoctor from "./doctor/AddDoctor";
import AddHospitalForm from "./hospital/AddHospital";
import BedManagement from "./pages/BedManagement";
import HospitalDashboard from "./pages/Hospitaldashboard";
import HospitalFront from "./hospital/HospitalDashboard";

import QueueManagement from "./pages/QueueManagement";

import AI from "./AI";
import UpdatedBedInfo from "./hospital/UpdateBedInfo";

const PrivetComponent = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? <Outlet /> : <Navigate to={"/login"} />;
};

function App() {
  const [user1, setUser] = useState();
  const { user } = useAuth();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser.role);
      console.log("User found in local storage:", parsedUser, user1);
    } else {
      console.log("No user1 found in local storage.");
      redirect("/signup");
    }
  }, [user]);

  return (
    <ChatProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/L" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/d" element={<Doctor />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivetComponent />}>
            <Route path="/" element={<LandingPage />} />
            {user1 === "patient" ? (
              <>
                <Route path="/home" element={<Dashboard />} />

                <Route path="/location" element={<Location />} />
                <Route path="/patientform" element={<PatientForm />} />
                <Route path="/hospital" element={<HospitalLandingPage />} />
                <Route path="/doctors" element={<BookDoctor />} />
                <Route path="/chatbot" element={<Home />} />
                <Route path="/book-appointment" element={<BookAppointment />} />
                <Route path="/appointments-confirmation" element={<AppointmentsConfirmation />} />
                <Route path="/chatbot/chat" element={<Chat />} />
                <Route path="/bookhospital" element={<HospitalSelection />} />
                <Route path="/hospitaldashboard" element={<HospitalDashboard />} />
                <Route path="/AI" element={<AI />} />
              </>
            ) : (
              <></>
            )}
            {user1 === "doctor" ? (
              <>
                <Route path="/home" element={<Doctor />} />
                <Route path="/addDoctor" element={<AddDoctor />} />
              </>
            ) : (
              <></>
            )}
            {user1 === "hospital" ? (
              <>
                <Route path="/home" element={<HospitalFront />} />
                <Route path="/bedmanagement" element={<BedManagement />} />
                <Route path="/queuemanagement" element={<QueueManagement />} />
                <Route path="/addhospital" element={<AddHospitalForm />} />
                <Route path="/updateBed" element={<UpdatedBedInfo/>}/>
              </>
            ) : (
              <></>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;
