import { useState } from "react";
import Login from "./Login";
import Register from "./Sign/Register";

function LoginRegister() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("register");

  return (
    <div className="d-flex justify-content-center align-items-start pt-5" style={{ minHeight: "100vh", backgroundColor: "#f6f6f6" }}>
      <div style={{ width: "100%", maxWidth: "300px", backgroundColor: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}>
        
        {/* Sekmeler */}
        <div className="d-flex mb-3">
          <button
            className={`btn w-50 ${activeTab === "login" ? "btn-warning text-white" : "btn-outline-warning"}`}
            onClick={() => setActiveTab("login")}
          >
            Giriş Yap
          </button>
          <button
            className={`btn w-50 ${activeTab === "register" ? "btn-warning text-white" : "btn-outline-warning"}`}
            onClick={() => setActiveTab("register")}
          >
            Üye Ol
          </button>
        </div>

        {/* Form */}
        {activeTab === "register" ? <Register /> : <Login />}
      </div>
    </div>

    
  );
}

export default LoginRegister;
