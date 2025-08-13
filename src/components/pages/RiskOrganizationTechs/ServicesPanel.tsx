// @ts-nocheck
import React from 'react';
import { Grid } from '@mui/material';
import { Text, ServiceInfo } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import translations from '../../../translation/en';

const {
  pages: { riskOrganizationTechs: texts }
} = translations;

const ServicesPanel = () => {
  const {
    riskOrganizationTechs: { apps }
  } = useReport(); // as ReportContextType;

  return (
    <Grid container flexDirection="column" sx={{ padding: '0px 48px' }}>
      <Grid item>
        <Text textSize={12} weight={600} upper>
          {texts.services}
        </Text>
      </Grid>
      <Grid item sx={{ marginTop: 3 }}>
        <Grid container justifyContent={'space-between'} sx={{ marginBottom: 3 }}>
          {apps.results.map((item: any, index: number) => (
            <Grid key={index} item sm={6} md={6} sx={{ marginBottom: 4 }}>
              <ServiceInfo appData={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServicesPanel;
