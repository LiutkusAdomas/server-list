import { ChangeEventHandler } from 'react';

type InputPropsType = {
  label: string;
  control: string;
  type: string;
  required: boolean;
  autocomplete: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  errorMesage?: string;
};

const Input: React.FC<InputPropsType> = ({
  label,
  control,
  type,
  required,
  autocomplete,
  onChange,
  errorMesage,
}) => {
  return (
    <div className="relative">
      <input
        name={control}
        type={type}
        required={required}
        autoComplete={autocomplete}
        className={`appearance-none relative block w-full px-3 py-2 my-4 border placeholder-gray-500 text-gray-900 rounded-lg shadow-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm ${
          errorMesage ? 'border-red-500 mb-6' : 'border-gray-300'
        }`}
        placeholder={label}
        onChange={onChange}
      />
      {errorMesage && (
        <span className="absolute -bottom-5 text-xs text-red-500">{errorMesage}</span>
      )}
    </div>
  );
};

export default Input;
