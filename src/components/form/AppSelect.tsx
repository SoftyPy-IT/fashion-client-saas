import { useFormContext } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface Option {
  value: string;
  label: string;
}

interface AppSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  options: Option[];
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  onChange?: (value: string) => void;
}

const AppSelect = ({
  name,
  label,
  placeholder = "Select an option",
  options,
  required = false,
  disabled = false,
  className,
  error,
  onChange,
}: AppSelectProps) => {
  const { register, formState } = useFormContext();
  const { errors } = formState;
  const errorMessage = error || errors[name]?.message?.toString();

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        {...register(name)}
        className={twMerge(
          "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2 px-3",
          disabled && "bg-gray-100 cursor-not-allowed",
          errorMessage &&
            "border-red-500 focus:border-red-500 focus:ring-red-500",
          className,
        )}
        disabled={disabled}
        onChange={(e) => {
          register(name).onChange(e);
          onChange?.(e.target.value);
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      )}
    </div>
  );
};

export default AppSelect;
