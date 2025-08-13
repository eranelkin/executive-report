// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import { Text, DataPanel } from '@cyberpion/cyberpion-ui';
import { useReport, ReportContextType } from 'components/ReportContext';
import translations from '../../../translation/en';

const {
  pages: { riskDigital: texts }
} = translations;

interface TopDataPanelProps {
  data: object;
  href: string;
}
const TopDataPanel: React.FC<TopDataPanelProps> = ({ data, href }) => {
  const { riskDigital, displayAsLinks } = useReport(); // as ReportContextType;
  const { target_critical } = riskDigital;
  const displayTotal = target_critical.other > 0;

  return (
    <Grid container justifyContent="space-between" sx={{ margin: '20px 16px 0px 0' }}>
      <Grid item sx={{ marginBottom: 1.5 }} sm={12} md={12}>
        <DataPanel
          title={texts.directly}
          titleUpper
          upper
          weight={600}
          titleTextSize={13}
          titleWeight={600}
          textSize={40}
          family="Rajdhani"
        >
          {target_critical?.count}
        </DataPanel>
      </Grid>

      {target_critical.results.map((item: any, index: number) => (
        <Grid item key={index} sm={3} md={3}>
          <DataPanel
            title={Object.keys(item)[0]}
            weight={400}
            titleWeight={400}
            titleTextSize={11}
            textSize={36}
            family="Rajdhani"
            rightText={`${Object.values(item)[0] === 1 ? 'Connection Found' : 'Connections Found'}`}
            titleStyle={{
              whiteSpace: 'nowrap',
              width: '175px',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {Object.values(item)[0]}
          </DataPanel>
        </Grid>
      ))}
      {displayTotal && displayAsLinks && (
        <Grid item sx={{ marginTop: 0.5 }}>
          <Link href={href} variant="body2" underline="hover" style={{ marginLeft: 5, fontSize: 10 }}>
            {`+ ${target_critical.other} ${texts.linkTop}`}
          </Link>
        </Grid>
      )}
      {displayTotal && !displayAsLinks && (
        <Grid item sx={{ marginTop: 0.5 }}>
          <Text style={{ marginLeft: 5, fontSize: 10, color: '#D1D2D3' }}>
            {`+ ${target_critical.other} ${texts.linkTop}`}
          </Text>
        </Grid>
      )}
    </Grid>
  );
};

export default TopDataPanel;
