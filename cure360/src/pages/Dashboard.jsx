import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StethoscopeIcon, FlaskConicalIcon, FileTextIcon, BotIcon, ShoppingCartIcon, WalletIcon, MapPinIcon, CalendarIcon } from "lucide-react";
import ActionCard from "../component/Actioncard";
import AppointmentCard from "../component/AppointmentCard";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setUserName("Kai Hiwatari");
      setAppointments([
        {
          id: 1,
          title: "Consultation with Dr. Tsunade",
          type: "Doctor",
          date: "April 14, 2025",
          time: "10:30 AM",
          location: "Konoha,Japan",
        },
        {
          id: 2,
          title: "Blood Test - Complete Panel",
          type: "Lab",
          date: "April 15, 2025",
          time: "08:00 AM",
          location: "Tokyo,japan",
        },
        {
          id: 3,
          title: "consultation with Dr. Rangiku",
          type: "Doctor",
          date: "April 17, 2025",
          time: "08:00 AM",
          location: "Soul Society,Hogyo mundo",
        },

      ]);
    }, 700);
  }, []);

  const actions = [
    {
      title: "Book Doctor",
      icon: <StethoscopeIcon className="w-5 h-5" />,
      onClick: () => navigate("/doctors"),
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
    {
      title: "Billing",
      icon: <WalletIcon className="w-5 h-5" />,
      onClick: () => navigate("/billing"),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {userName} 👋</h1>
      <p className="text-gray-600">Thanks for trusting us</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {actions.map((action, idx) => (
          <ActionCard key={idx} title={action.title} icon={action.icon} onClick={action.onClick} />
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Upcoming Appointments</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <AppointmentCard key={appt.id} appointment={appt} />
            ))
          ) : (
            <p className="text-gray-500">No upcoming appointments</p>
          )}
        </div>
      </div>
    </div>
  );
}
