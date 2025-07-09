import { CircleAlert } from "lucide-react";

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => (
  <div className="flex items-center mt-2 space-x-2 text-sm text-red">
    <CircleAlert className="w-5 h-5 text-red" />
    <span className="font-medium">{errorMessage}</span>
  </div>
);

export default ErrorMessage;
