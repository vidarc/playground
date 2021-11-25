import { Suspense } from 'react';
import useSWR from 'swr';

import fetcher from './fetcher';

type APIResponse = {
  id: number;
  name: string;
  job: string;
};

const FakeData: React.FunctionComponent = () => {
  const { data } = useSWR<APIResponse[]>('/api/fake', fetcher, {
    suspense: true,
  });

  return (
    <>
      {data
        ? data.map((item) => (
            <div key={item.id}>
              {item.name} - {item.job}
            </div>
          ))
        : null}
    </>
  );
};

const PageOne: React.FunctionComponent = () => {
  return (
    <>
      <div>This is page one</div>
      <br />
      <Suspense fallback={<div>loading...</div>}>
        <FakeData />
      </Suspense>
    </>
  );
};

export default PageOne;
