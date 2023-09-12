import { ReactNode } from 'react';

type ContainerPropsType = {
  additional?: string;
  children?: ReactNode;
};

const Container: React.FC<ContainerPropsType> = ({ additional = '', children }) => {
  return (
    <section
      className={`bg-gray-50 py-12 h-fit px-4 sm:px-6 lg:px-8 rounded shadow-md ${additional}`}
    >
      <div className="w-full space-y-8">{children}</div>
    </section>
  );
};

export default Container;
