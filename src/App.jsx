import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./views/Footer/Footer";
import Homepage from "./views/Homepage/Homepage";
import Navbar from "./views/Navbar/Navbar";
import Dashboard from "./views/Dashboard/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";
import ProjectPage from "./views/Dashboard/ProjectPage/ProjectPage";
import Report from "./views/Dashboard/ReportPage/Report";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Homepage />} />
                </Routes>
                <div className="mainContent">
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard/projects/:id"
                            element={
                                <PrivateRoute>
                                    <ProjectPage />
                                </PrivateRoute>
                            }
                        />

                        <Route
                            path="/dashboard/reports/:id"
                            element={
                                <PrivateRoute>
                                    <Report />
                                </PrivateRoute>
                            }
                        />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </div>
    );
}

export default App;
