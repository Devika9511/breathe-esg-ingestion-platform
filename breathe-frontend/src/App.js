import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import UploadPage from "./pages/UploadPage";

import Dashboard from "./pages/Dashboard";


function App() {

  return (

    <BrowserRouter>

      <div
        style={{
          background:
            "linear-gradient(to right, #0f172a, #1e3a8a)",
          padding: "18px 40px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >

        <h2
          style={{
            color: "white",
            margin: 0,
          }}
        >
          Breathe ESG
        </h2>

        <div>

          <Link
            to="/"
            style={linkStyle}
          >
            Upload Data
          </Link>

          <Link
            to="/dashboard"
            style={linkStyle}
          >
            Dashboard
          </Link>

        </div>

      </div>

      <Routes>

        <Route
          path="/"
          element={<UploadPage />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}


const linkStyle = {

  color: "white",

  marginLeft: "20px",

  textDecoration: "none",

  fontWeight: "bold",

  fontSize: "16px",
};


export default App;