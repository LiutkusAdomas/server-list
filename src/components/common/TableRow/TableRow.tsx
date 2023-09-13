import { Server } from '../../../model/Server.type';

type TableRowPropsType = {
  item: Server;
};

export const TableRow: React.FC<TableRowPropsType> = ({ item }) => {
  return (
    <tr className="border-b">
      <td className="py-2 px-4">
        <img
          src={item.flag}
          alt={item.name}
          className="shadow-lg m-1"
          style={{ maxWidth: '80px', minWidth: '40px' }}
        />
      </td>
      <td className="py-2 px-4 text-center">{item.name}</td>
      <td className="py-2 px-4 text-center">{item.distance}</td>
    </tr>
  );
};
