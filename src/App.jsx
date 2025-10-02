import { PortfolioProvider } from "./PortfolioContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Portfolio from "./Portfolio";
import Dashboard from "./Dashboard";
import PublicPortfolio from "./PublicPortfolio";

export default function App() {
  return (
    <PortfolioProvider>
      <Router>
        <nav className="bg-brown-600 text-cream-50 px-6 py-4 flex gap-4 items-center shadow">
          <Link className="font-bebas text-2xl tracking-widest" to="/">Resonance Vault</Link>
          <Link to="/portfolio" className="uppercase px-3 py-1 rounded hover:bg-teal-600 hover:text-white transition">Portfolio</Link>
          <Link to="/dashboard" className="uppercase px-3 py-1 rounded hover:bg-teal-600 hover:text-white transition">Dashboard</Link>
          <Link to="/public" className="uppercase px-3 py-1 rounded hover:bg-teal-600 hover:text-white transition">Public Portfolio</Link>
        </nav>
        <Routes>
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/public" element={<PublicPortfolio />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </PortfolioProvider>
  );
}