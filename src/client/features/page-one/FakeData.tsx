import useSWR from 'swr';

type APIResponse = {
  id: number;
  name: string;
  job: string;
};

const useFakeData = () => {
  const { data } = useSWR<APIResponse[]>('/api/fake', {
    suspense: true,
    fallbackData: [],
  });

  return { data };
};

export const FakeData = () => {
  const { data } = useFakeData();

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
