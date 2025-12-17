import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../Context/UserContext";
import Auth from "../components/Auth";

const LoginModal = () => {
  const { toggleUser } = useUser();
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSuccess = () => {
    setSuccess(true);

    setTimeout(() => {
      toggleUser();           // Close modal
      navigate("/workspace"); // Redirect to Workspace
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center">
      <div className="bg-white py-8 px-8 rounded relative shadow-lg w-[350px]">

        {/* SUCCESS BANNER */}
        {success && (
          <div className="bg-green-600 text-white p-2 rounded text-center mb-4">
            Login Successful!
          </div>
        )}

        {/* LOGIN / SIGNUP FORM */}
        <Auth onSuccess={handleSuccess} />

        {/* CLOSE BUTTON */}
        <FaTimes
          size={18}
          className="absolute top-2 right-2 cursor-pointer"
          onClick={toggleUser}
        />
      </div>
    </div>
  );
};

export default LoginModal;
