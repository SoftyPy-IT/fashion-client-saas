import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Select, SelectItem } from "@heroui/react";
import countryList from "react-select-country-list";

type TSelectCountryProps = {
  name: string;
  label?: string;
  required?: boolean;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
};

const countryOptions = countryList()
  .getData()
  .map((country) => ({
    label: country.label,
    value: country.value,
  }));

const AppSelectCountry: React.FC<TSelectCountryProps> = ({
  name,
  label,
  required,
  variant = "bordered",
  size = "md",
}) => {
  const { control } = useFormContext();
  return (
    <div className="mb-4">
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Select
            {...field}
            id={name}
            placeholder={label}
            isRequired={required}
            isInvalid={!!error}
            errorMessage={error?.message}
            label={label}
            radius="sm"
            variant={variant}
            labelPlacement="outside"
            size={size}
            className="w-full"
          >
            {countryOptions.map((country) => (
              <SelectItem key={country.value} textValue={country.value}>
                {country.label}
              </SelectItem>
            ))}
          </Select>
        )}
      />
    </div>
  );
};

export default AppSelectCountry;
