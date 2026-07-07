import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import BuilderPage from './pages/BuilderPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
