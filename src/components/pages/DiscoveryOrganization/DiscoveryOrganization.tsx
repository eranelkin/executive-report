// @ts-nocheck
import React from 'react';
import Divider from '@mui/material/Divider';
import { InfoPanel } from '@cyberpion/cyberpion-ui';
import TopDataPanel from './TopDataPanel';
import BottomDataPanel from './BottomDataPanel';
import VerticalListPanel from './VerticalListPanel';
import ChartsPanel from './ChartsPanel';
import translations from '../../../translation/en';
import { useReport } from 'components/ReportContext';

const DiscoveryOrganization = () => {
  const {
    global: { isManaged }
  } = useReport();

  return (
    <>
      <TopDataPanel />
      <Divider sx={{ marginTop: 4 }} />
      <BottomDataPanel />
      <InfoPanel
        bgColor="linear-gradient(180deg, #1A90DE 0%, #103772 100%)  "
        width={680}
        borderRadius="10px"
        style={{
          padding: '20px 20px 20px 25px',
          marginLeft: 48,
          marginTop: 10
        }}
      >
        {isManaged
          ? translations.pages.discoveryOrganization.info
          : translations.pages.discoveryOrganization.notCyberpionInfo}
      </InfoPanel>
      <VerticalListPanel />
      <Divider sx={{ marginTop: 1 }} />
      <ChartsPanel />
    </>
  );
};

export default DiscoveryOrganization;
