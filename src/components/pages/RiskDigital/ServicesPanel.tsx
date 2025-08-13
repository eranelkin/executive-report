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
  const { riskDigital } = useReport(); // as ReportContextType;
  const { apps } = riskDigital;

  return (
    <Grid container flexDirection="column">
      <Grid item>
        <Text textSize={12} weight={600} upper>
          {texts.services}
        </Text>
      </Grid>
      <Grid item sx={{ marginTop: 3 }} sm={12} md={12}>
        <Grid container justifyContent={'space-between'} sx={{ marginBottom: 0 }}>
          {apps?.results.map((item: any, index: number) => (
            <Grid key={index} item sm={6} md={6} sx={{ marginBottom: 3.5 }}>
              <ServiceInfo appData={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ServicesPanel;
