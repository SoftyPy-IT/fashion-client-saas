import { Textarea } from "@heroui/react";
import { Controller, useFormContext } from "react-hook-form";

type ITextAreaProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
};

const AppTextArea = ({
  name,
  label,
  disabled,
  placeholder,
  required = true,
}: ITextAreaProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            {...field}
            id={name}
            size="lg"
            disabled={disabled}
            placeholder={placeholder}
            isInvalid={!!error}
            label={label}
            errorMessage={error?.message}
            isMultiline
            isRequired={required}
            labelPlacement="outside"
            radius="sm"
            className="z-0"
            variant="bordered"
            color="default"
          />
        )}
      />
    </div>
  );
};

export default AppTextArea;
