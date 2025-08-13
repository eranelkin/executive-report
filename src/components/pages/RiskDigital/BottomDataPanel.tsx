// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { useReport, ReportContextType } from 'components/ReportContext';
import { DataPanel, Text, VerticalList } from '@cyberpion/cyberpion-ui';
import translations from '../../../translation/en';

const {
  pages: { riskDigital: texts }
} = translations;

const BottomDataPanel = () => {
  const { riskDigital, displayAsLinks } = useReport(); // as ReportContextType;
  const { org_assets: orgAssets, external_assets: externalAssets } = riskDigital;

  return (
    <Grid container justifyContent="space-between" sx={{ margin: '24px 16px 24px 0' }}>
      <Grid item sm={12} md={12}>
        <Text textSize={12} upper weight={600}>
          {texts.countries}
        </Text>
      </Grid>
      {['orgAssets', 'externalAssets'].map((item: string) => {
        const ofacData = item === 'orgAssets' ? orgAssets : externalAssets;
        return (
          <Grid item key={item} sm={6} md={6} sx={{ marginBottom: 0 }}>
            <Grid item sm={12} md={12} sx={{ marginBottom: 2 }}></Grid>
            <DataPanel
              // title={texts[item as keyof typeof texts]}
              title={texts[item]}
              titleUpper
              upper
              titleTextSize={12}
              titleWeight={600}
              textSize={36}
              family="Rajdhani"
            >
              {ofacData?.count}
            </DataPanel>
          </Grid>
        );
      })}

      {['orgAssets', 'externalAssets'].map((item: string) => {
        const ofacData = item === 'orgAssets' ? orgAssets : externalAssets;
        const items = ofacData.results.map((item: object) => ({
          name: Object.keys(item)[0],
          value: `${Object.values(item)[0]} Connections`
        }));
        const isOther = ofacData.other > 0;
        return (
          <Grid item key={item} className="risk-organization-techs" sm={6} md={6} sx={{ paddingRight: 6 }}>
            <VerticalList
              items={items}
              displayTotal={items.length > 0} //NEED TO SEE ZERO VALUE ALSO (NOT AS LINK)
              displayAsLinks={displayAsLinks && isOther} // ^^ (NOT AS LINK)
              totalText={`${isOther ? '+' : ''} ${ofacData.other} Other assets`}
              shouldDisplayDash={item !== 'orgAssets'}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};

export default BottomDataPanel;
