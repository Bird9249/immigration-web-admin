import axios from "axios";
import { LoginForm } from "./login.schema";

export default async (form: LoginForm) => {
  const res = await axios.post<{
    access_token: string;
    refresh_token: string;
    user: {
      id: number;
      email: string;
      created_at: string;
      updated_at: string;
      profile: {
        id: number;
        first_name: string;
        last_name: string;
        image: string;
        created_at: string;
        updated_at: string;
      };
    };
    permissions: string[];
  }>(`${import.meta.env.VITE_BASE_API_URL}auth/login`, form);

  localStorage.setItem("token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);

  return res.data;
};
