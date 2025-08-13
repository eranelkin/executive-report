// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { useReport, ReportContextType } from 'components/ReportContext';
import { Text, VerticalList, Chart, CHART_TYPES } from '@cyberpion/cyberpion-ui';
import { normalizeItemsPercentage } from 'utils';
import { calcPrecentage } from 'utils';
import translations from '../../../translation/en';

const {
  pages: { riskDigital: texts }
} = translations;

const pieColors = ['#9A1E13', '#EB3323', '#EF827F', '#F6BDBB'];
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
    riskDigital: { connections, cves_by_cvss: CVES, apps }
  } = useReport(); // as ReportContextType;
  const chartOptions = {
    chart: { width: 270, height: 130, marginLeft: 25 }
  };
  let items: any = connections.results.map((item: any, index: number) => ({
    name: item.label,
    value: calcPrecentage(connections.count, item.y),
    color: pieColors[index]
  }));
  const totalItems = items.reduce((all: number, curr: any) => all + curr.value, 0);
  if (connections.other > 0 && totalItems < 100) {
    items = [
      ...items,
      {
        name: 'Other',
        value: 100 - totalItems,
        color: pieColors[pieColors.length - 1]
      }
    ];
  }
  items = normalizeItemsPercentage(items);

  return (
    <Grid container alignItems={'center'} sx={{ paddingRight: 6 }}>
      <Grid item sm={4.5} md={4.5}>
        <Grid container flexDirection="column">
          <Grid item sx={{ marginBottom: 2 }}>
            <Text textSize={12} weight={600} upper>
              {texts.CVES}
            </Text>
          </Grid>
          <Grid item id="executive-report-risk-digital-charts" >
            <Chart series={CVES?.results} chartOptions={chartOptions} chartType={CHART_TYPES.BAR} colors={barsColors} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={7.5} md={7.5} sx={{ paddingLeft: 4 }}>
        <Grid container flexDirection="row">
          <Grid item sm={4} md={4}>
            <Chart series={items.map((item: any) => ({ y: item.value }))} colors={pieColors} />
          </Grid>
          <Grid item sm={8} md={8} alignSelf="center">
            <Grid container flexDirection="column" sx={{ paddingLeft: 2 }}>
              <Grid item sx={{ position: 'relative', top: '-28px' }}>
                <Text textSize={12} weight={600} upper>
                  {texts.risky}
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
