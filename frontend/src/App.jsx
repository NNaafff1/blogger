import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import GroupPage from "./pages/group/GroupPage";
import Profile from "./pages/profile/Profile";
import Layout from "./layout/Layout";
import UnauthenticatedOnly from "./protected-routes/UnauthenticatedOnly";
import AuthenticatedOnly from "./protected-routes/AuthenticatedOnly";
import Login from "./pages/login";
import Register from "./pages/register";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route element={<UnauthenticatedOnly />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route element={<AuthenticatedOnly />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
