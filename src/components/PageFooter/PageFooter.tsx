// @ts-nocheck
import React from 'react';
import { useReport, ReportContextType } from 'components/ReportContext';
import Contact from 'components/Contact/Contact';
import { Text } from '@cyberpion/cyberpion-ui';
import './pageFooter.scss';

interface PageFooterProps {
  pageNumber: number;
}

const PageFooter: React.FC<PageFooterProps> = ({ pageNumber }) => {
  const {
    pagesAmount,
    global: { isManaged }
  } = useReport(); // as ReportContextType;

  return (
    <div
      className="footer"
      style={{
        top: pageNumber * 1056 - 50,
        width: 816
      }}
    >
      {isManaged ? (
        <div style={{ paddingLeft: 45 }}>
          <Contact />
        </div>
      ) : (
        <div></div>
      )}
      <Text textSize={10} style={{ paddingRight: 50, ...(pageNumber === 1 ? { color: '#FFFFFF' } : {}) }}>
        {`${pageNumber} of ${pagesAmount}`}
      </Text>
    </div>
  );
};

export default PageFooter;
