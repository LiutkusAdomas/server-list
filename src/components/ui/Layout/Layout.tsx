import { ReactNode } from 'react';
import Header from '../Header/Header';

type LayoutPropsType = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="min-h-screen flex flex-col flex-grow bg-gray-300 text-black p-4">
        {children}
      </main>
    </>
  );
};

export default Layout;
