// @ts-nocheck
import React from 'react';
import { Grid } from '@mui/material';
import { BarsPanel as Bars } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import translations from '../../../translation/en';
import { calcPrecentage, normalizeItemsPercentage } from 'utils';

const {
  pages: { discoveryDigital: texts }
} = translations;

const BarsPanel = () => {
  const {
    discoveryDigital: { hosting_provider: hostingProvider, connections_types: connectionsTypes }
  } = useReport(); // as ReportContextType;

  return (
    <Grid container sx={{ marginTop: 2 }}>
      {['hosting_provider', 'connections_types'].map((bar: string) => {
        const barData = bar === 'hosting_provider' ? hostingProvider : connectionsTypes;
        let items = barData.results.map((item: object) => ({
          name: Object.keys(item)[0],
          value: calcPrecentage(barData.count, Object.values(item)[0])
        }));
        const totalValues = items.reduce((sum: number, item: any) => sum + item.value, 0);
        if (totalValues < 100) {
          items = [
            ...items,
            {
              name: 'Other',
              value: 100 - totalValues
            }
          ];
        }
        items = normalizeItemsPercentage(items);

        return (
          <Grid key={bar} item sm={6} md={6}>
            <Bars
              // title={texts[bar as keyof typeof texts]}
              title={texts[bar]}
              barsData={items}
              itemsClassName="discovery-digital-bars-items"
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BarsPanel;
