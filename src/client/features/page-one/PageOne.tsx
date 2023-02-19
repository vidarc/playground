import { Suspense } from 'react';

import { FakeData } from './FakeData';

const PageOne = () => {
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
