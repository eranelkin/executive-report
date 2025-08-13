import React, { useState, useEffect } from 'react';
type SubsidiariesType = {
  [key: string]: object;
};

const useFetchAPIs = (urls: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<unknown | null>(null);
  const [subsidiaries, setSubsidiaries] = useState<SubsidiariesType[] | null>(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setIsLoading(true);
        const promises = urls.map((url: string) => fetch(url));
        const responses: any = await Promise.all(promises);
        let result: any = [];
        for (let response of responses) {
          const data = await response.json();
          result.push(data);
        }
        // setSubsidiaries(mergeArrayObjects(result[0], result[1]));
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(urls);
        const data = await response.json();
        setSubsidiaries(data);
      } catch (err) {
        setFetchError(err);
      } finally {
        setIsLoading(false);
      }
    };

    Array.isArray(urls) ? fetchAllData() : fetchData();
  }, [urls]);

  return { isLoading, subsidiaries, fetchError };
};

export default useFetchAPIs;
