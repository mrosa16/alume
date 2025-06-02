import { useContext } from "react";
import { AuthContext } from "../context/authContext/authContext";

export const useAuth = () => useContext(AuthContext);
