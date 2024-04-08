import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import GroupPage from "./pages/group/GroupPage";
import Profile from "./pages/profile/Profile";
import Layout from "./layout/Layout";
import UnauthenticatedOnly from "./protected-routes/UnauthenticatedOnly";
import AuthenticatedOnly from "./protected-routes/AuthenticatedOnly";
import Login from "./pages/login";
import Register from "./pages/register";
import Reset from "./pages/login/RecRest/inedexReset";
import Recovery from "./pages/login/RecRest/indexRecover";
import Resend from "./pages/login/RecRest/Resend";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/groups/:groupId" element={<GroupPage />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route element={<UnauthenticatedOnly />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/reset/" element={<Recovery />} />
            <Route path="/resend" element={<Resend />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<Reset />}
            />
          </Route>
          <Route element={<AuthenticatedOnly />}>
            <Route path="/users/:userId" element={<Profile />} />
          </Route>
        </Routes>
      </Layout>
    </>
  );
}

export default App;
