// @ts-nocheck
import React from 'react';
import Divider from '@mui/material/Divider';
import { ChipsPanel } from '@cyberpion/cyberpion-ui';
import pdf from '../../../pdf.config.json';
import translations from '../../../translation/en';
import TopDataPanel from 'components/pages/DiscoveryDigital/TopDataPanel';
import BarsPanel from 'components/pages/DiscoveryDigital/BarsPanel';
import GEOPanel from 'components/pages/DiscoveryDigital/GEOPanel';
import { useReport, ReportContextType } from 'components/ReportContext';

import './discoveryDigital.scss';

const {
  pages: { discoveryDigital: texts }
} = translations;
interface DiscoveryDigitalProps {}

const DiscoveryDigital: React.FC<DiscoveryDigitalProps> = () => {
  const { width, height } = pdf.size;
  const {
    discoveryDigital: { service_provider: serviceProvider },
    displayAsLinks
  } = useReport(); // as ReportContextType;

  return (
    <div style={{ marginLeft: 48, marginRight: 40 }}>
      <TopDataPanel href={'https://www.google.com'} />
      <Divider sx={{ margin: '22px 0', position: 'relative', left: -48, width: width }} />
      <ChipsPanel
        data={serviceProvider}
        displayAsLinks={displayAsLinks}
        href={'https://www.google.com'}
        title={texts.managed}
      />
      <Divider sx={{ margin: '22px 0', position: 'relative', left: -48, width: width }} />
      <BarsPanel />
      <Divider sx={{ margin: '22px 0', position: 'relative', left: -48, width: width }} />
      <GEOPanel />
    </div>
  );
};

export default DiscoveryDigital;
