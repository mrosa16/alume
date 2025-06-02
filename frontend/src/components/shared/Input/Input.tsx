import type { InputProps } from "./inputTypes";

function Input({ label, error, register, ...rest }: InputProps) {
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <input
        {...register}
        {...rest}
        className={`w-full rounded-full px-4 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } focus:outline-none focus:ring-2 focus:ring-cyan`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export default Input;
