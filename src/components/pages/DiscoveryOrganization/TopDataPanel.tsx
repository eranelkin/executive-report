// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { DataPanel } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import translations from '../../../translation/en';

const TopDataPanel = () => {
  const { discoveryOrganization } = useReport(); // as ReportContextType;

  return (
    <Grid container justifyContent="space-between" sx={{ marginTop: 5, paddingLeft: 6, paddingRight: 6 }}>
      {['domains', 'subdomains', 'active_ip_addresses', 'total_ip_addresses'].map((item: string) => (
        <Grid item key={item}>
          <DataPanel
            // title={translations.pages[item as keyof typeof translations.pages]}
            title={translations.pages[item]}
            upper
            weight={600}
            titleWeight={600}
            textSize={40}
            family="Rajdhani"
            titleTextSize={13}
            titleUpper
          >
            {discoveryOrganization[item]}
          </DataPanel>
        </Grid>
      ))}
    </Grid>
  );
};

export default TopDataPanel;
