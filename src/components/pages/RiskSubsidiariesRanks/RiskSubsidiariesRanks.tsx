// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { DataPanel, Indicator, Text, getRandomHexColor } from '@cyberpion/cyberpion-ui';
import translations from '../../../translation/en';

import './riskSubsidiariesRanks.scss';

const {
  pages: { riskSubsidiariesRanks: texts }
} = translations;

const RiskSubsidiariesRanks: React.FC = () => {
  const [ranks, setRanks] = useState<object | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/risk/subsidiaries/ranks');
      const data = await response.json();
      setRanks(data);
    };
    fetchData();
  }, []);

  return ranks && Object.keys(ranks).length > 0 ? (
    <Grid container sx={{ marginTop: 5 }}>
      <Grid item sm={12} md={12} sx={{ margin: '0px 0 20px 5px' }}>
        <Grid container>
          {Object.keys(ranks).map((item, index) => {
            let randomColor;
            randomColor = !randomColor && getRandomHexColor();
            return (
              <Grid item key={index} sm={12} md={12}>
                <Grid container sx={{ padding: '32px 20px 15px 48px' }}>
                  <Grid item sm={1.25} md={1.25} display="flex">
                    {/* <Indicator value={ranks[item as keyof typeof ranks]['risk']} /> */}
                    <Indicator value={ranks[item]['risk']} />
                  </Grid>
                  <Grid item sm={3} md={3}>
                    <Grid container display={'flex'} flexDirection="column">
                      <Grid item display={'flex'} alignItems="center">
                        <Indicator type={'legend'} color={randomColor} />
                        <Text upper weight={600} textSize={11} style={{ paddingLeft: 5 }}>{`Subsidiary ${index}`}</Text>
                      </Grid>
                      <Grid item sx={{ borderRight: '1px solid #EAEAEA' }}>
                        <DataPanel
                          titleWeight={400}
                          upper
                          textSize={30}
                          family="Rajdhani"
                          rightText="Latest score August 2022"
                        >
                          {/* {ranks[item as keyof typeof ranks]['left']} */}
                          {ranks[item]['left']}
                        </DataPanel>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item sm={7.75} md={7.75}>
                    <DataPanel
                      titleWeight={400}
                      upper
                      textSize={30}
                      family="Rajdhani"
                      rightContentClassName="right-panel-right-text"
                      rightText={texts.open}
                      style={{ paddingTop: 12, paddingLeft: 30 }}
                    >
                      {/* {ranks[item as keyof typeof ranks]['right']} */}
                      {ranks[item]['right']}
                    </DataPanel>
                  </Grid>
                </Grid>
                <Grid item sm={12} md={12}>
                  <Divider />
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  ) : null;
};

export default RiskSubsidiariesRanks;
