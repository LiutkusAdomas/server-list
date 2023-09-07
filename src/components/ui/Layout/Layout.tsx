import { ReactNode } from 'react';
import Header from '../Header/Header';

type LayoutPropsType = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutPropsType> = ({ children }) => {
  return (
    <>
      <Header />
      <div className="p-0 m-0">{children}</div>
    </>
  );
};

export default Layout;
