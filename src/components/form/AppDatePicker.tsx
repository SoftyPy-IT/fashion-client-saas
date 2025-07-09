import { DatePicker } from "@heroui/date-picker";
import { parseDate } from "@internationalized/date";
import { Controller, useFormContext } from "react-hook-form";

const formatDate = (value?: any) => {
  if (!value) return undefined;

  if (value instanceof Date) {
    return parseDate(value.toISOString().split("T")[0]);
  }

  if (typeof value === "string" && value.includes("T")) {
    return parseDate(value.split("T")[0]);
  }

  if (typeof value === "string") {
    return parseDate(value);
  }

  return undefined;
};

type TDatePickerProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  description?: string;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  defaultValue?: string;
};

const AppDatePicker = ({
  name,
  label,
  disabled,
  required = true,
  placeholder,
  description,
  size = "md",
  variant = "bordered",
  defaultValue,
}: TDatePickerProps) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => {
          return (
            <DatePicker
              {...field}
              id={name}
              size={size}
              isInvalid={!!error}
              defaultValue={formatDate(field?.value || defaultValue)}
              isRequired={required}
              label={label}
              errorMessage={error?.message}
              labelPlacement="outside"
              variant={variant}
              radius="sm"
              onChange={(date: any) => field.onChange(date)} // Handle date change
              description={description}
            />
          );
        }}
      />
    </div>
  );
};

export default AppDatePicker;
