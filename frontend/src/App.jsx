import { Route, Routes } from "react-router-dom";
import Home from "./pages/main/Home";
import GroupPage from "./pages/group/GroupPage";
import Profile from "./pages/profile/Profile";
import Layout from "./layout/Layout";
function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/:id" element={<GroupPage />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
