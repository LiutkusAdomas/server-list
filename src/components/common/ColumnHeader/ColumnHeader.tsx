import up from '../../../assets/up.svg';
import down from '../../../assets/down.svg';
import { ASCENDING } from '../../../helpers/sorting';

type ColumnHeaderPropsType = {
  label: string;
  sortKey: string;
  sortConfig: { key: string; direction: string };
  requestSort: (key: string) => void;
};

export const ColumnHeader: React.FC<ColumnHeaderPropsType> = ({
  label,
  sortKey,
  sortConfig,
  requestSort,
}) => {
  return (
    <button type="button" onClick={() => requestSort(sortKey)} className="text-gray-800">
      {label}
      {sortConfig.key === sortKey && (
        <img
          className="h-6 w-6 inline-block -mt-1"
          alt="Direction"
          src={sortConfig.direction === ASCENDING ? up : down}
        />
      )}
    </button>
  );
};
