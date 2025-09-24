import { FC, ReactNode } from "react";

export const InfoBlock: FC<{
  icon: ReactNode;
  label: string;
  children: ReactNode;
}> = ({ icon, label, children }) => (
  <div className="flex items-center text-sm text-gray-600">
    <span className="mr-2 text-gray-400">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="ml-2">{children}</span>
  </div>
);
