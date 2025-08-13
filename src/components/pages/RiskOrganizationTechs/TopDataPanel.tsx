// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { useReport, ReportContextType } from 'components/ReportContext';
import { VerticalList } from '@cyberpion/cyberpion-ui';
import translations from '../../../translation/en';

const {
  pages: { riskOrganizationTechs: texts }
} = translations;

const TopDataPanel = () => {
  const {
    riskOrganizationTechs: { exposed_system_remote_access: exposedSystem, open_ports: openPorts },
    displayAsLinks
  } = useReport(); // as ReportContextType;

  return (
    <Grid container justifyContent="space-between" sx={{ marginTop: 5, paddingLeft: 6 }}>
      {['exposed_system_remote_access', 'open_ports'].map((item: string) => {
        const data = item === 'open_ports' ? openPorts : exposedSystem;
        const displayTotal = data?.other > 0;

        const items = data.results.map((it: object) => ({
          name: item === 'exposed_system_remote_access' ? `${Object.keys(it)[0]} found exposed` : Object.keys(it)[0],
          value: `${Object.values(it)[0]} assets`
        }));

        return (
          <Grid item key={item} className="risk-organization-techs" sm={6} md={6} sx={{ paddingRight: 6 }}>
            <VerticalList
              upperTitle
              title={texts[item]}
              titleTextSize={12}
              items={items}
              displayTotal={displayTotal}
              displayAsLinks={displayAsLinks}
              totalText={`+ ${data?.other} Other exposed ${item === 'open_ports' ? 'ports' : 'assets'}`}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default TopDataPanel;
