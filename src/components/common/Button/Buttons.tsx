import { MouseEventHandler, ReactNode } from 'react';

type ButtonPropsType = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  disabled?: boolean;
  children?: ReactNode;
};

const Button: React.FC<ButtonPropsType> = ({ label, onClick, disabled, children }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
        disabled ? 'bg-gray-400 cursor-not-allowed hover:bg-gray-400' : ''
      }`}
    >
      {label}
      {children}
    </button>
  );
};

export default Button;
