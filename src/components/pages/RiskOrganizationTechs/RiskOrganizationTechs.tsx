import React from 'react';
import Divider from '@mui/material/Divider';
import TopDataPanel from './TopDataPanel';
import ChartsPanel from './ChartsPanel';
import ServicesPanel from './ServicesPanel';

import './riskOrganizationTechs.scss';

const RiskOrganizationTechs = () => {
  return (
    <>
      <TopDataPanel />
      <Divider sx={{ margin: '18px 0 32px 0' }} />
      <ChartsPanel />
      <Divider sx={{ margin: '18px 0 32px 0' }} />
      <ServicesPanel />
    </>
  );
};

export default RiskOrganizationTechs;
