import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  StethoscopeIcon, 
  FlaskConicalIcon, 
  FileTextIcon, 
  BotIcon, 
  ShoppingCartIcon, 
  WalletIcon, 
  MapPinIcon, 
  CalendarIcon,
  HeartPulse,
  Clock,
  Activity,
  Bell,
  TriangleAlertIcon
} from "lucide-react";
import ActionCard from "../component/Actioncard";
import AppointmentCard from "../component/AppointmentCard";
import StatsCard from "../component/StatsCard";
export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setIsLoading(true);
    setTimeout(() => {
      setUserName("Kai Hiwatari");
      setAppointments([
        {
          id: 1,
          title: "Consultation with Dr. Tsunade",
          type: "Doctor",
          date: "April 14, 2025",
          time: "10:30 AM",
          location: "Konoha, Japan",
        },
        {
          id: 2,
          title: "Blood Test - Complete Panel",
          type: "Lab",
          date: "April 15, 2025",
          time: "08:00 AM",
          location: "Tokyo, Japan",
        },
        {
          id: 3,
          title: "Consultation with Dr. Rangiku",
          type: "Doctor",
          date: "April 17, 2025",
          time: "08:00 AM",
          location: "Soul Society, Hueco Mundo",
        },
      ]);
      setIsLoading(false);
    }, 700);
  }, []);

  const actions = [
    {
      title: "Book Doctor",
      icon: <StethoscopeIcon className="w-5 h-5" />,
      onClick: () => navigate("/doctors"),
    },
    {
      title: "Hospital",
      icon: <StethoscopeIcon className="w-5 h-5" />,
      onClick: () => navigate("/hospital"),
    },
    {
      title: "Health Check",
      icon: <HeartPulse className="w-5 h-5" />,
      onClick: () => navigate("/health-score"),
    },
    {
      title: "access Risk",
      icon: <TriangleAlertIcon className="w-5 h-5" />,
      onClick: () => navigate("/riskassessment"),
    },
    {
      title: "AI POWERRED SELF DIAGNOSIS",
      icon: <Activity className="w-5 h-5" />,
      
      onClick: () => navigate("/AI"),
    },
    {
      title: "Book Lab Test",
      icon: <FlaskConicalIcon className="w-5 h-5" />,
      onClick: () => navigate("/labs"),
    },
    {
      title: "Prescriptions",
      icon: <FileTextIcon className="w-5 h-5" />,
      onClick: () => navigate("/prescriptions"),
    },
    {
      title: "Chatbot",
      icon: <BotIcon className="w-5 h-5" />,
      onClick: () => navigate("/chatbot"),
    },
    {
      title: "Medical Shop",
      icon: <ShoppingCartIcon className="w-5 h-5" />,
      onClick: () => navigate("/shop"),
    },
    
    
  ];

  const stats = [
    {
      label: "Upcoming Appointments",
      value: appointments.length,
      icon: <Clock className="w-5 h-5" />
    },
    {
      label: "Prescriptions",
      value: "3",
      icon: <FileTextIcon className="w-5 h-5" />
    },
    {
      label: "Health Score",
      value: "85%",
      icon: <HeartPulse className="w-5 h-5" />
    }

  ];

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Welcome, {userName} 👋</h1>
              <p className="text-gray-600 mt-1">Thanks for trusting us with your health</p>
            </div>
            <button className="relative p-2 rounded-full bg-white shadow hover:bg-gray-100">
              <Bell className="w-6 h-6 text-gray-600" />
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <StatsCard key={idx} icon={stat.icon} label={stat.label} value={stat.value} />
            ))}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Quick Actions</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {actions.map((action, idx) => (
                <ActionCard key={idx} title={action.title} icon={action.icon} onClick={action.onClick} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Upcoming Appointments</h2>
            {appointments.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {appointments.map((appt) => (
                  <AppointmentCard key={appt.id} appointment={appt} />
                ))}
              </div>
            ) : (
              <div className="bg-white p-8 rounded-xl shadow text-center">
                <CalendarIcon className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-600">No upcoming appointments</p>
                <button 
                  onClick={() => navigate("/doctors")}
                  className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  Book Appointment
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}