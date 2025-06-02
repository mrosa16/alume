import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/appRoutes";
import AuthProvider from "./context/authContext/authContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
