// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';

import { Text, VerticalList, Chart, CHART_TYPES } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import { normalizeItemsPercentage, calcPrecentage } from 'utils';
import translations from '../../../translation/en';

import './chartsPanel.scss';

const {
  pages: { riskOrganizationTechs: texts }
} = translations;

const pieColors = ['#9A1E13', '#EB3323', '#EF827F', '#F6BDBB', '#FFE2E1'];
const barsColors = [
  '#FFE2E1',
  '#FFE2E1',
  '#F6BDBB',
  '#F6BDBB',
  '#EF827F',
  '#EF827F',
  '#EB3323',
  '#EB3323',
  '#9A1E13',
  '#9A1E13',
  '#9A1E13'
];

const ChartsPanel = () => {
  const {
    riskOrganizationTechs: { secure_connection: secureConnection, cves_by_cvss: CVES }
  } = useReport(); // as ReportContextType;
  const chartOptions = {
    chart: { width: 270, height: 130, marginLeft: 35 }
  };
  let items: any = Object.keys(secureConnection)
    .filter((item: any) => item !== 'count')
    .map((item: any, index: number) => ({
      // name: texts[item as keyof typeof texts],
      name: texts[item],
      value: calcPrecentage(secureConnection.count, secureConnection[item]),
      color: pieColors[index]
    }));

  items = normalizeItemsPercentage(items);

  return (
    <Grid container alignItems={'center'} sx={{ padding: '0 48px' }}>
      <Grid item sm={4} md={4}>
        <Grid container flexDirection="column">
          <Grid item sx={{ marginBottom: 2 }}>
            <Text textSize={12} weight={600} upper>
              {texts.CVES}
            </Text>
          </Grid>
          <Grid item>
            <Chart series={CVES?.results} chartOptions={chartOptions} chartType={CHART_TYPES.BAR} colors={barsColors} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={8} md={8} sx={{ paddingLeft: 4 }}>
        <Grid container flexDirection="row">
          <Grid item sm={4} md={4}>
            <Chart series={items.map((item: any) => ({ y: item.value }))} colors={pieColors} />
          </Grid>
          <Grid item sm={8} md={8}>
            <Grid container flexDirection="column">
              <Grid item sx={{ position: 'relative', top: '-15px' }}>
                <Text textSize={12} weight={600} upper>
                  {texts.login}
                </Text>
              </Grid>
              <Grid item sm={12} md={12}>
                <VerticalList isLegend={true} items={items} formatType="%" />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChartsPanel;
