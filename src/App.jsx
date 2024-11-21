import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Home } from "./components/Home";
import { Admin } from "./components/Admin";
import { Brain } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 w-screen">
        <nav className="bg-white shadow-lg w-full">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex items-center space-x-2">
                  <Brain className="h-8 w-8 text-indigo-600" />
                  <span className="text-xl font-bold text-gray-800">
                    Daily Quiz
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
