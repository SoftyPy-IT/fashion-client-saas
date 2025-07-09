import { BadgeCheck } from "lucide-react";

const SuccessMessage = ({ successMessage }: { successMessage: string }) => (
  <div className="flex items-center mt-2 space-x-2 text-sm text-green">
    <BadgeCheck className="w-5 h-5 text-green" />
    <span className="font-medium">{successMessage}</span>
  </div>
);

export default SuccessMessage;
