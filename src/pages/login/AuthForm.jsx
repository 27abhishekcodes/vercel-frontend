import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AuthForm.css';


export function AuthForm({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate=useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    password: "",
    role: "",
    address:""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if(isLogin){
        const url="https://vercel-backend-new.onrender.com/api/auth/login";
        const response = await axios.post(url, formData, {
        withCredentials: true
      });
       if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        console.log(response.data.role);
        if(response.data.role==="buyer"){
          navigate("/home");
        }
        else{
          navigate("/sellerdash");
        }
      }else{
        setError(response.data.message);
      }

      }
      else{
        const url= "https://vercel-backend-new.onrender.com/api/auth/register";
        const response = await axios.post(url, formData, {
        withCredentials: true
      });
       if (response.data.success) {
        // ✅ Navigate to dashboard after successful login
        setIsLogin(!isLogin);
      } else {
        setError(response.data.message);
      }

      }
      

    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="text"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {!isLogin && (
          <div>
            <input
              type="text"
              name="role"
              placeholder="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {!isLogin && (
          <div>
            <input
              type="text"
              name="address"
              placeholder="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      <p style={{ marginTop: "10px" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <button onClick={toggleMode} style={{ marginLeft: "5px" }}>
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </div>
  );
}
