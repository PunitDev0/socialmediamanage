import axios from "axios";

export const loginUser = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/login',
      data,
      { withCredentials: true }
    );
    console.log('Login response:', {
      status: response.status,
      headers: response.headers,
      data: response.data,
    });
    return response.data;
  } catch (error) {
    console.error('Login error:', {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message,
    });
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const registerUser = async (data) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await axios.post(
      `${apiUrl}/api/auth/register`,
      {
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true, // Required for cookies
      }
    );

    return response.data; // { success: true, user: { id, email, name } }
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to register. Please try again."
    );
  }
};

// Example function for scheduling a post
export const schedulePost = async (formData) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
    const response = await axios.post(`${apiUrl}/api/schedule`, formData, {
      withCredentials: true, // Send cookie with request
    });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to schedule post."
    );
  }
};