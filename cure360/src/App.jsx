import LandingPage from './LandingPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home'; 
import Chat from './pages/Chat';
import { ChatProvider } from './context/UserContext'; 

function App() {
  return (
    <ChatProvider> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chatbot" element={<Home />} />
          <Route path="/chatbot/chat" element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </ChatProvider>
  );
}

export default App;




