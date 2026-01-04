import { useState } from "react";
import Login from "./Sign/Login";
import Register from "./Sign/Register";

function LoginRegister() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");

  return (
    // .form-container ve dış kapsayıcı
    <div className="min-h-screen bg-[#f6f6f6] flex justify-center items-start pt-20 font-sans">
      <div className="w-full max-w-[400px] bg-white p-5 rounded-md shadow-md border border-gray-200">
        
        {/* .form-tabs */}
        <div className="flex justify-center mb-5 gap-0 rounded overflow-hidden border border-gray-200">
          <button
            className={`
              flex-1 py-3 text-sm font-medium transition-all duration-200 ease-in-out
              ${activeTab === "login" 
                ? "bg-yellow-400 text-white"  // .active stili (#ffa500 karşılığı)
                : "bg-gray-50 text-gray-600 hover:bg-gray-100" // Pasif buton
              }
            `}
            onClick={() => setActiveTab("login")}
          >
            Giriş Yap
          </button>
          <button
            className={`
              flex-1 py-3 text-sm font-medium transition-all duration-200 ease-in-out
              ${activeTab === "register" 
                ? "bg-yellow-400 text-white" 
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
              }
            `}
            onClick={() => setActiveTab("register")}
          >
            Üye Ol
          </button>
        </div>

        {/* Form Bileşenleri */}
        <div className="mt-4">
          {activeTab === "register" ? <Register /> : <Login />}
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;