import React, { useCallback, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
// import PDF from 'components/PDF/PDF';
import { GlobalStyle } from '../../styles/global';
// import { ReportProvider, useReport, ReportContextType } from '../ReportContext';
import Spinner from '../spinner/Spinner';
import generateTexts from '../../translation/en';

// Fix a @types/react BUG
const GlobalStyleProxy: any = GlobalStyle;
const { generatePDF } = generateTexts;

interface exportProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSuccess?: () => void;
  onFailure?: (err: any) => void;
  reportType: string;
  displayAsLinks?: boolean;
  displayLogo?: boolean;
}

type Ref = HTMLButtonElement;

const GeneratePDFAction = forwardRef<Ref, exportProps>(({ onClick, onSuccess, onFailure }, ref) => {
  const [isLoadingExport, setIsLoadingExport] = useState<any>(false);
  const [showExport, setShowExport] = useState<any>(true);
  // const { pages, isLoading, subsidiariesByPages } = useReport() as ReportContextType;

  const handleExportOnClick = useCallback(
    async (event) => {
      const createSaveAsLink = (fileName: string, blob: any) => {
        try {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          if (link.download !== undefined) {
            link.setAttribute('href', url);
            link.setAttribute('download', fileName);
            link.innerText = 'Export';
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            onSuccess && onSuccess();
            setShowExport(true);
            setIsLoadingExport(false);
          }
        } catch (err) {
          setShowExport(true);
          setIsLoadingExport(false);
          onFailure && onFailure(err);
          console.error('BlobToSaveAs error', err);
        }
      };

      try {
        console.log('fetch PDF');
        setShowExport(false);
        setIsLoadingExport(true);
        onClick && onClick(event);
        const response = await fetch('/downloadPDF?target=http://localhost:3005/');
        const pdfStream = await response.blob();
        const blob = new Blob([pdfStream], { type: 'application/pdf' });
        createSaveAsLink('POC', blob);
      } catch (err) {
        setShowExport(true);
        setIsLoadingExport(false);
        onFailure && onFailure(err);
        console.log('Error PDF Stream: ', err);
      }
    },
    [onClick, onFailure, onSuccess]
  );

  return (
    <div className="report">
      <GlobalStyleProxy />

      {showExport && !isLoadingExport && (
        <Button ref={ref} variant="contained" size="small" onClick={handleExportOnClick}>
          {generatePDF.btn}
        </Button>
      )}
      {isLoadingExport && (
        <div className="loading">
          <Spinner />
        </div>
      )}
    </div>
  );
});

export default GeneratePDFAction;
