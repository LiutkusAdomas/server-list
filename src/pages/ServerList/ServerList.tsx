import { useGetServerListQuery } from '../../api/playgroundApiService';
import { Container } from '../../components/common/Container/Container';
import { Spinner } from '../../components/common/Spinner/Spinner';
import { ColumnHeader } from '../../components/common/ColumnHeader/ColumnHeader';
import { TableRow } from '../../components/common/TableRow/TableRow';
import { Heading } from '../../components/common/Heading/Heading';
import { useSortableData } from '../../hooks/useSortableData';

export const ServerList: React.FC = () => {
  const { data, error, isFetching } = useGetServerListQuery();
  const { sortedData, requestSort, sortConfig } = useSortableData(data);

  return (
    <Container additional="w-full sm:w-2/3 lg:w-1/2">
      {error && <Heading>Something went wrong...:(</Heading>}
      {isFetching && (
        <div className="h-12 w-12 m-auto">
          <Spinner />
        </div>
      )}
      {sortedData && (
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b w-1/4"></th>
              <th className="py-2 px-4 border-b w-2/4">
                <ColumnHeader
                  label="Name"
                  sortKey="name"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
              </th>
              <th className="py-2 px-4 border-b w-1/4">
                <ColumnHeader
                  label="Distance"
                  sortKey="distance"
                  sortConfig={sortConfig}
                  requestSort={requestSort}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((item) => (
              <TableRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
};
