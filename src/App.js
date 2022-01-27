import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "pages/login";
import Navbar from "components/General/Navbar";
import { AuthProvider } from "contexts/AuthContext";
import RequireAuth from "components/General/RequireAuth";

function App() {
  return (
    <div className="App">
      <BrowserRouter basename="/pagos_mykonos">
        <Navbar />
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/clientes"
              element={
                <RequireAuth>
                  <h1>Holla so CLientes</h1>
                </RequireAuth>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
