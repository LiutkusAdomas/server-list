import { useMemo, useState } from 'react';
import { useGetServerListQuery } from '../../api/playgroundApiService';
import Container from '../../components/common/Container/Container';
import { Server } from '../../model/Server.type';
import Spinner from '../../components/common/Spinner/Spinner';
import up from '../../assets/up.svg';
import down from '../../assets/down.svg';

const ASCENDING = 'ascending';
const DESCENDING = 'descending';

const ServerList: React.FC = () => {
  const { data, error, isFetching } = useGetServerListQuery();
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: string }>({
    key: 'name',
    direction: ASCENDING,
  });

  const sortedData = useMemo(() => {
    if (data) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key as keyof Server] < b[sortConfig.key as keyof Server]) {
          return sortConfig.direction === ASCENDING ? -1 : 1;
        }
        if (a[sortConfig.key as keyof Server] > b[sortConfig.key as keyof Server]) {
          return sortConfig.direction === ASCENDING ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const requestSort = (key: string) => {
    let direction = ASCENDING;
    if (sortConfig && sortConfig.key === key && sortConfig.direction === ASCENDING) {
      direction = DESCENDING;
    }
    setSortConfig({ key, direction });
  };

  return (
    <Container>
      {error && <div>Something went wrong...:(</div>}
      {isFetching && (
        <div className="h-12 w-12">
          <Spinner />
        </div>
      )}
      {sortedData && (
        <table className="min-w-full bg-gray-50">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b w-1/4"></th>
              <th className="py-2 px-4 border-b w-2/4">
                <button type="button" onClick={() => requestSort('name')} className="text-gray-800">
                  Name
                  {sortConfig.key === 'name' && (
                    <img
                      className="h-6 w-6 inline-block -mt-1"
                      alt="Direction"
                      src={sortConfig.direction === ASCENDING ? up : down}
                    />
                  )}
                </button>
              </th>
              <th className="py-2 px-4 border-b w-1/4">
                <button
                  type="button"
                  onClick={() => requestSort('distance')}
                  className="text-gray-800"
                >
                  Distance
                  {sortConfig.key === 'distance' && (
                    <img
                      className="h-6 w-6 inline-block -mt-1"
                      alt="Direction"
                      src={sortConfig.direction === ASCENDING ? up : down}
                    />
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">
                  <img
                    src={item.flag}
                    alt={item.name}
                    className="border-2 border-gray-300"
                    style={{ maxWidth: '80px', minWidth: '40px' }}
                  />
                </td>
                <td className="py-2 px-4 text-center">{item.name}</td>
                <td className="py-2 px-4 text-center">{item.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};

export default ServerList;
