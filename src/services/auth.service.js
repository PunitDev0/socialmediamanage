// api/register.js
import axios from "axios";

export const registerUser = async (data) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await axios.post(
      `${apiUrl}/auth/register`,
      {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      },
      {
        // Only include withCredentials if your backend requires it
        // withCredentials: true,
      }
    );

    // Validate response data
    if (!response.data || !response.data.token) {
      throw new Error("Invalid response from server: Token missing");
    }

    // Store token securely
    localStorage.setItem("token", response.data.token);

    return response.data;
  } catch (error) {
    // Throw a structured error for the frontend to handle
    throw new Error(
      error.response?.data?.message || "Failed to register. Please try again."
    );
  }
};

export const loginUser = async (data) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${apiUrl}/auth/login`, // Fixed endpoint
        {
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );
  
      // Validate response data
      // if (!response.data || !response.data.token) {
      //   throw new Error("Invalid response from server: Token missing");
      // }
  
      // // Store token securely
      // localStorage.setItem("token", response.data.token);
  
      return response.data;
    } catch (error) {
      // Throw a structured error for the frontend to handle
      throw new Error(
        error.response?.data?.message || "Failed to log in. Please try again."
      );
    }
  };


