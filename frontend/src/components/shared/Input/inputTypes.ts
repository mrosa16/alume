import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  register: UseFormRegisterReturn;
}
