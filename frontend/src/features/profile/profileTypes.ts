import type { User } from "../../context/authContext/interface/userTypes";

export interface ProfileEditFormProps {
  user: User;
  onCancel: () => void;
}

export interface EditFormValues {
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
}
