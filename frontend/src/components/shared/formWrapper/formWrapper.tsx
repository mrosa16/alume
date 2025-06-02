import type { FormWrapperProps } from "./formWrapperTypes";

function FormWrapper({
  title,
  description,
  onSubmit,
  children,
  buttonLabel,
}: FormWrapperProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-16 rounded-lg shadow-md w-full max-w-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-center">{title}</h2>
      {description && (
        <p className="ttext-sm text-gray-500 text-center">{description}</p>
      )}
      <div className="space-y-3">{children}</div>
      <button
        type="submit"
        className="bg-teal text-white rounded-full py-2 w-full hover:bg-highlight transition"
      >
        {buttonLabel}
      </button>
    </form>
  );
}

export default FormWrapper;
