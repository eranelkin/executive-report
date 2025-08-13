import React, { useState, useEffect, useMemo } from 'react';
import DiscoverySubsidiaries from './DiscoverySubsidiaries';
import { useReport, ReportContextType } from '../../ReportContext';
import pdf from '../../../pdf.config.json';

const key = '';
const {
  pages: {
    discovery_subsidiaries: { subsidiariesPerPage: perPage }
  }
} = pdf;

type SubsidiariesType = {
  [key: string]: object;
};

const DiscoverySubsidiariesContainer = () => {
  const { subsidiariesByPages } = useReport() as ReportContextType;
  // const [subsidiaries, setSubsidiaries] = useState<SubsidiariesType[] | null>(null);
  // const [subsidiariesByPages, setSubsidiariesByPages] = useState<SubsidiariesType[][] | null>(null);
  // const arr = useMemo(() => ['/assets/subsidiaries', '/applications/subsidiaries'], []);
  // const { subsidiaries, isLoading } = useFetchAPIs(arr);

  // useEffect(() => {
  //   if (subsidiaries && subsidiaries.length > 0) {
  //     let index = 0;
  //     let results: SubsidiariesType[][] = [];
  //     let cloneSubsidiaries = [...subsidiaries];
  //     while (cloneSubsidiaries.length > 0) {
  //       results = [...results, cloneSubsidiaries.splice(index, perPage)];
  //     }
  //     setSubsidiariesByPages(results);
  //   }
  // }, [subsidiaries]);

  // return subsidiaries && subsidiaries.length > 0 ? (
  //   <>{!isLoading ? <DiscoverySubsidiaries subsidiaries={subsidiaries} /> : <div>Loading...</div>}</>
  // ) : (
  //   <></>
  // );
  return (
    subsidiariesByPages &&
    subsidiariesByPages.length > 0 &&
    subsidiariesByPages.map((page, index) => <DiscoverySubsidiaries key={index} subsidiaries={page} />)
  );
};

export default DiscoverySubsidiariesContainer;
