import { useGetServerListQuery } from '../../api/playgroundApiService';

const ServerList: React.FC = () => {
  const { data, error } = useGetServerListQuery();

  return (
    <>
      {error && <div>Error!</div>}
      {data?.map((item) => (
        <div key={item.name}>
          <div>{item.name}</div>
          <div>{item.distance}</div>
        </div>
      ))}
    </>
  );
};

export default ServerList;
