// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { Chart, VerticalList, Text } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import translations from '../../../translation/en';
import { calcPrecentage, normalizeItemsPercentage } from 'utils';

import './chartsPanel.scss';

const colors = ['#245293', '#5598D6', '#80D0F6', '#C2EAFE'];

const ChartsPanel = () => {
  const {
    discoveryOrganization: { public_cloud: publicCloud, fqdn }
  } = useReport(); // as ReportContextType;

  return (
    <Grid container alignItems={'center'} sx={{ paddingLeft: 5, paddingTop: 4, paddingRight: 6 }}>
      <Grid item sx={{ paddingLeft: 1 }}>
        <Text upper textSize={12} weight={600}>
          fqdn hosting statistics
        </Text>
      </Grid>
      <Grid item sx={{ paddingTop: 2.5 }}>
        <Grid container alignItems={'center'}>
          {['fqdn', 'public_cloud'].map((item: string) => {
            const chart = item === 'fqdn' ? fqdn : publicCloud;
            let items = chart.results.map((item: any, index: number) => ({
              name: item.label,
              value: calcPrecentage(chart.count, item.y),
              color: colors[index]
            }));
            const totalValues = items.reduce((sum: number, item: any) => sum + item.value, 0);

            if (totalValues < 100) {
              items = [
                ...items,
                {
                  name: 'Other',
                  value: 100 - totalValues,
                  color: colors[colors.length - 1]
                }
              ];
            }
            items = normalizeItemsPercentage(items);

            return (
              <React.Fragment key={item}>
                <Grid item sm={2.2} md={2.2}>
                  <Chart series={items.map((item: any) => ({ y: item.value }))} colors={colors} />
                </Grid>
                <Grid item sm={3.8} md={3.8}>
                  <VerticalList
                    // title={translations.pages[item as keyof typeof translations.pages]}
                    title={translations.pages[item]}
                    isLegend={true}
                    items={items}
                    containerClassName="discovery-charts-legend"
                    formatType="%"
                    titleTextSize={12}
                    upperTitle
                  />
                </Grid>
              </React.Fragment>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChartsPanel;
