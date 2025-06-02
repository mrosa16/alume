import type { FormEventHandler, ReactNode } from "react";

export interface FormWrapperProps {
  title: string;
  description?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  children: ReactNode;
  buttonLabel: string;
}
