import { ReactNode } from 'react';
import { Header } from '../Header/Header';

type LayoutPropsType = {
  children?: ReactNode;
};

export const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex justify-center bg-gray-300 p-4 pt-20">{children}</main>
    </>
  );
};
