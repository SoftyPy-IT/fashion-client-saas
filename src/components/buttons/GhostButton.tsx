import { FC, forwardRef } from "react";

type Props = {
  extraClass?: string;
  size?: "sm" | "normal" | "lg";
  inverted?: boolean;
  noBorder?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};

const GhostButton: FC<Props> = ({
  onClick,
  size,
  extraClass,
  noBorder = false,
  inverted = true,
  children,
}) => {
  let btnSize = "";
  if (size === "sm") {
    btnSize = "py-1 sm:py-2 px-5";
  } else if (size === "lg") {
    btnSize = "py-3 sm:py-4 px-7  text-xl";
  } else {
    btnSize = "py-2 sm:py-3 px-6";
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`bg-white text-center cursor-pointer text-base sm:text-xl tracking-widest text-gray500 ${
        !noBorder && "border border-gray500"
      } ${
        inverted ? "hover:bg-gray500 hover:text-gray100" : "hover:text-gray400"
      } ${btnSize} ${extraClass}`}
    >
      {children}
    </button>
  );
};

export default GhostButton;
