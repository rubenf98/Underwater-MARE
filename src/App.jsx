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
import ReportPage from "./views/Dashboard/ReportPage/ReportPage";
import 'mapbox-gl/dist/mapbox-gl.css';
import ProjectList from "./views/Dashboard/ProjectList/ProjectList";

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
                            path="/dashboard/project/:id/reports"
                            element={
                                <PrivateRoute>
                                    <ReportPage />
                                </PrivateRoute>
                            }
                        />
                        <Route
                            path="/dashboard/projects"
                            element={
                                <PrivateRoute>
                                    <ProjectList />
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
