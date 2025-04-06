import api from "./api";

async function signup(
  first_name,
  last_name,
  email,
  password,
  country,
  phone_number
) {
  try {
    // Make the API request
    const response = await api.post("/auth/register", {
      first_name,
      last_name,
      email,
      password,
      country,
      phone_number,
    });

    return response.data;
  } catch (error) {
    // It’s usually helpful to re-throw so the caller can hand
    throw error;
  }
}

export default signup;
