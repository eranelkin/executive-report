// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { DataPanel } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import translations from '../../../translation/en';

const BottomDataPanel = () => {
  const { discoveryOrganization } = useReport(); // as ReportContextType;

  return (
    <Grid container justifyContent="space-between" sx={{ marginTop: 5, paddingLeft: 6, paddingRight: 6 }}>
      {['managed_domains', 'web_apps', 'certificate_authorities_count', 'open_ports_count', 'login_types_count'].map(
        (item: string) => (
          <Grid item key={item} sx={{ paddingBottom: 2.5 }}>
            <DataPanel
              // title={translations.pages[item as keyof typeof translations.pages]}
              title={translations.pages[item]}
              upper
              textSize={36}
              titleTextSize={12}
              weight={400}
              titleWeight={600}
              family="Rajdhani"
              titleUpper
            >
              {discoveryOrganization[item]}
            </DataPanel>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default BottomDataPanel;
