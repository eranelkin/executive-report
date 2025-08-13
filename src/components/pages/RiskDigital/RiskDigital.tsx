import React from 'react';
import Divider from '@mui/material/Divider';
import TopDataPanel from './TopDataPanel';
import BottomDataPanel from './BottomDataPanel';
import ChartsPanel from './ChartsPanel';
import pdf from '../../../pdf.config.json';
import translations from '../../../translation/en';
import ServicesPanel from './ServicesPanel';

import './riskDigital.scss';

const {
  pages: { riskDigital: texts }
} = translations;

const RiskDigital = () => {
  const { width } = pdf.size;

  return (
    <div id="executive-report-risk-digital" style={{ margin: '30px 40px 0 48px' }}>
      <TopDataPanel data={{}} href={'https://www.google.com'} />
      <Divider sx={{ margin: '18px 0', position: 'relative', left: -48, width: width }} />
      <ChartsPanel />
      <Divider sx={{ margin: '0 0 24px 0', position: 'relative', left: -48, width: width }} />
      <ServicesPanel />
      <Divider sx={{ margin: '0px 0', position: 'relative', left: -48, width: width }} />
      <BottomDataPanel />
    </div>
  );
};

export default RiskDigital;
