import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
import AuthProvider from "./context/authContext/authContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
