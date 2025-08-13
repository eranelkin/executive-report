// @ts-nocheck
import React, { useMemo } from 'react';
import { default as Page } from 'components/pages/BasePage/BasePage';
import { useReport, ReportContextType } from 'components/ReportContext';

import './pdf.scss';

interface PDFProps {
  reportType: string;
}

// TODO: render report according to reportType and pdf.config.
const PDF = () => {
  const { pages, isLoading, subsidiariesByPages } = useReport(); // as ReportContextType;
  // const pages = appContext?.pages;
  // const arr = useMemo(() => ['/assets/subsidiaries', '/applications/subsidiaries'], []);
  // const { subsidiaries, isLoading } = useFetchAPIs(arr);

  return !isLoading ? (
    <div id="executive-report-pdf" className="executive-report-pdf">
      {!!pages && pages.map((name, index) => <Page key={index} pageNumber={index + 1} name={name} />)}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default PDF;
