import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../../assets/logo.png";
import RegisterForm from "../../features/auth/registerForm";
import LoginForm from "../../features/auth/loginForm";

function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  useEffect(() => {
    if (location.pathname.includes("register")) {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
  }, [location.pathname]);

  const handleTabClick = (tab: "login" | "register") => {
    setActiveTab(tab);
    navigate(`/${tab}`);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-teal  flex justify-center h-60">
        <div className=" h-36 flex justify-center items-center text-4xl font-normal">
          <img className=" w-44 h-auto mx-auto" src={logo} alt="Logo" />
        </div>
      </header>
      <main className="flex justify-center items-center mt-[-3rem] px-4">
        <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-center gap-6 mb-6 ">
            <button
              className={`pb-2 font-medium ${
                activeTab === "register"
                  ? "border-b-2 border-dark-cyan text-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("register")}
            >
              Criar Conta
            </button>

            <button
              className={`pb-2 font-medium ${
                activeTab === "login"
                  ? "border-b-2 border-dark-cyan text-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick("login")}
            >
              Login
            </button>
          </div>

          {activeTab === "register" ? <RegisterForm /> : <LoginForm />}
        </div>
      </main>
    </div>
  );
}

export default AuthPage;
