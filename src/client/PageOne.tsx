import { useEffect, useState } from 'react';

import { fetcher } from './fetcher';

type APIResponse = {
  id: number;
  name: string;
};

const PageOne: React.FunctionComponent = () => {
  const [data, setData] = useState<APIResponse[]>([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetcher(
        'https://jsonplaceholder.typicode.com/users'
      );
      const json = await response.json();
      setData(json);
    };
    getData();
  }, []);

  return (
    <>
      <div>This is page one</div>
      <br />
      {data.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
    </>
  );
};

export default PageOne;
