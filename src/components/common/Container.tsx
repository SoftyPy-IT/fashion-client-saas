import { PropsWithChildren } from "react";

const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
  );
};

export default Container;
