import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/Theme-provider";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Singup from "./pages/Singup";
import TeaGift from "./pages/TeaGift";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import AuthRoute from "./components/AuthRoute";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="dark">
        <main>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <Login />
                </AuthRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <AuthRoute>
                  <Singup />
                </AuthRoute>
              }
            />
            {/* private routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/tea-gift"
              element={
                <PrivateRoute>
                  <TeaGift />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
