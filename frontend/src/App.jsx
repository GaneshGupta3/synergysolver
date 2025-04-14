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
                            element={<ProfilePage />}
                        ></Route>
                        <Route path="/profile/:userId" element={<ProfileDetails />}></Route>
                        <Route path="/problemDetails/:problemId" element={<ProblemDetails />}></Route>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                        <Route path="/problems" element={<Problems />}></Route>
                        <Route path="/addproblem" element={<AddProblem />}></Route>
                        <Route path="/chatpage" element={<ChatPage />}></Route>
                    </Routes>
                </Layout>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
