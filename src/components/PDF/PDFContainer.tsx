import React from 'react';
import { ReportProvider } from '../ReportContext';
import PDF from './PDF';

interface IContainer {
  reportType: string;
  company: string;
  isBulk?: boolean;
  globalFilter?: string;
  displayAsLinks?: boolean;
  displayLogo?: boolean;
  onSuccess?: () => void;
  onFailure?: () => void;
}
const PDFContainer: React.FC<IContainer> = ({
  reportType,
  company,
  isBulk = false,
  globalFilter,
  displayAsLinks = false,
  displayLogo = true,
  onSuccess,
  onFailure
}) => {
  const handlerLoadingData = () => {
    if (onSuccess) {
      setTimeout(() => onSuccess(), 1000);
    }
  };

  const handlerOnFailure = () => {
    if (onFailure) {
      setTimeout(() => onFailure(), 1000);
    }
  };

  return (
    <ReportProvider
      reportType={reportType}
      company={company}
      isBulk={isBulk}
      globalFilter={globalFilter}
      displayAsLinks={displayAsLinks}
      displayLogo={displayLogo}
      handlerLoadingData={handlerLoadingData}
      handlerOnFailure={handlerOnFailure}
    >
      <PDF />
    </ReportProvider>
  );
};

export default PDFContainer;
