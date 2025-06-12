import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import SignUpCard from "./components/SignupCard/SignUpCard";
import Layout from "./components/layout/Layout";
import ProfilePage from "./components/profile/ProfilePage";
import LoginCard from "./components/LoginCard/LoginCard";
import Dashboard from "./components/Dashboard/Dashboard";
import ChatPage from "./components/Chatpage/ChatPage";
import { ToastContainer } from 'react-toastify';
import Problems from "./components/problems/Problems";
import AddProblem from "./components/AddProblem";
import ProblemDetails from "./components/ProblemDetails";
import ProfileDetails from "./components/ProfileDetails";
import ContactMe from "./components/ContactMe";
import AuthInitializer from "./components/AuthInitializer";

function App() {
    return (
        <>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />}></Route>
                        <Route path="/login" element={<LoginCard />}></Route>
                        <Route path="/signup" element={<SignUpCard />}></Route>
                        <Route
                            path="/profile"
                            element={<AuthInitializer><ProfilePage /></AuthInitializer>}
                        ></Route>
                        <Route path="/contactus" element={<ContactMe />}></Route>
                        <Route path="/profile/:userId" element={<AuthInitializer><ProfileDetails /> </AuthInitializer>}></Route>
                        <Route path="/problemDetails/:problemId" element={<AuthInitializer><ProblemDetails /></AuthInitializer>}></Route>
                        <Route path="/dashboard" element={<AuthInitializer><Dashboard /></AuthInitializer>}></Route>
                        <Route path="/problems" element={<AuthInitializer><Problems /></AuthInitializer>}></Route>
                        <Route path="/addproblem" element={<AuthInitializer><AddProblem /></AuthInitializer>}></Route>
                        <Route path="/chatpage" element={<AuthInitializer><ChatPage /></AuthInitializer>}></Route>
                        <Route path="*" element={<div className="text-center p-4">404 - Page Not Found</div>} />
                    </Routes>
                </Layout>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
