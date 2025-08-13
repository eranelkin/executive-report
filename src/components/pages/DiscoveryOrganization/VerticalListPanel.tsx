// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { useReport, ReportContextType } from 'components/ReportContext';
import { VerticalList } from '@cyberpion/cyberpion-ui';
import translations from '../../../translation/en';

const VerticalListPanel = () => {
  const { discoveryOrganization, displayAsLinks } = useReport(); // as ReportContextType;

  return (
    <Grid container justifyContent="space-between" sx={{ marginTop: 3, padding: '0 48px' }}>
      {['certificate_authorities', 'domain_registrars', 'cdns', 'wafs'].map((item: string, index: number) => {
        const items = discoveryOrganization[item].results.map((subItem: string) => ({
          name: Object.keys(subItem)[0],
          value: Object.values(subItem)[0]
        }));
        const isOther = discoveryOrganization[item]?.other > 0;

        return (
          <Grid
            item
            key={item}
            sm={6}
            md={6}
            sx={{ paddingBottom: 2.5, ...(index === 1 || index === 3 ? { paddingLeft: 5 } : {}) }}
          >
            <VerticalList
              // title={translations.pages[item as keyof typeof translations.pages]}
              title={translations.pages[item]}
              items={items}
              displayTotal={items.length > 0} // NEED TO SEE ZERO VALUE ALSO
              displayAsLinks={displayAsLinks && isOther}
              // totalText={`${isOther ? '+' : ''} ${discoveryOrganization[item]?.other} Other ${
              //   translations.pages[`${item}_link` as keyof typeof translations.pages]
              // }`}
              totalText={`${isOther ? '+' : ''} ${discoveryOrganization[item]?.other} Other ${
                translations.pages[`${item}_link`]
              }`}
              titleTextSize={12}
              upperTitle
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default VerticalListPanel;
