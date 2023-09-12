import { ReactNode } from 'react';

type HeadingPropsType = {
  children?: ReactNode;
};

export const Heading: React.FC<HeadingPropsType> = ({ children }) => {
  return <h2 className="text-center text-2xl font-extrabold text-gray-900">{children}</h2>;
};
