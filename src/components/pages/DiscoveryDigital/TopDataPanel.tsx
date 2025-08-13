// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { Link } from '@mui/material';
import { Text, DataPanel, getFormatedNumber } from '@cyberpion/cyberpion-ui';
import translations from '../../../translation/en';
import { useReport, ReportContextType } from 'components/ReportContext';

const {
  pages: { discoveryDigital: texts }
} = translations;

interface TopDataPanelProps {
  href: string;
}
const TopDataPanel: React.FC<TopDataPanelProps> = ({ href }) => {
  const { discoveryDigital, displayAsLinks } = useReport(); // as ReportContextType;
  const { target } = discoveryDigital;
  const displayTotal = target.other > 0;
  const other = getFormatedNumber(target.other);

  return (
    <Grid container justifyContent="space-between" sx={{ margin: '40px 0px 24px 0' }}>
      {['asset_type_count', 'connections_types_count'].map((item: string) => (
        <Grid item key={item} sm={6} md={6} sx={{ marginBottom: 2.25 }}>
          <DataPanel
            // title={texts[item as keyof typeof texts]}
            title={texts[item]}
            upper
            weight={600}
            titleTextSize={13}
            titleWeight={600}
            textSize={40}
            family="Rajdhani"
            titleUpper
          >
            {discoveryDigital[item]}
          </DataPanel>
        </Grid>
      ))}
      <Grid item sm={12} md={12} sx={{ marginBottom: 2 }}>
        <Text textSize={12} upper weight={600}>
          {texts.assets}
        </Text>
      </Grid>
      {target.results.map((item: any, index: number) => (
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
        <Grid item sx={{ marginTop: 1 }}>
          <Link href={href} variant="body2" underline="hover" style={{ marginLeft: 5, fontSize: 10 }}>
            {`+ ${other} ${texts.linkAssets}`}
          </Link>
        </Grid>
      )}
      {displayTotal && !displayAsLinks && (
        <Grid item sx={{ marginTop: 1 }}>
          <Text style={{ marginLeft: 5, fontSize: 10, color: '#D1D2D3' }}>{`+ ${other} ${texts.linkAssets}`}</Text>
        </Grid>
      )}
    </Grid>
  );
};

export default TopDataPanel;
