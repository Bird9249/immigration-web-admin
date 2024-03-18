import { useAxios } from "../axios/AxiosContext";

export type AuthResponseType = {
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
  roles: string[];
  permissions: string[];
  session: {
    id: string;
    created_at: string;
  };
};

export default async () => {
  const { axios } = useAxios();

  const token = localStorage.getItem("token");

  return await axios.get<AuthResponseType>("auth/me", {
    headers: { Authorization: "Bearer " + token },
  });
};
