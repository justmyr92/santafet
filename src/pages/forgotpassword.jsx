import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display loading state
    setLoading(true);

    try {
      // TODO: Make API call to your backend for password reset
      // Example: const response = await resetPassword(email);

      // Assuming the resetPassword function returns a success message
      // You should handle different scenarios based on your backend response
      // Example: setMessage(response.message);
      setMessage("Password reset link sent to your email. Check your inbox.");
    } catch (error) {
      // Handle error
      console.error("Password reset failed:", error);
      setMessage("Password reset failed. Please try again.");
    } finally {
      // Reset loading state
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Reset Password"}
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ForgotPassword;
