// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import { Text } from '@cyberpion/cyberpion-ui';
import legendTexts from '../../../../translation/en';
import pdf from '../../../../pdf.config.json';

const { pages } = legendTexts;
const { colors } = pdf;
const { cover_first: cover } = pdf.pages;

// FIX: map the block according to report type
// FIX: add fonts, page number

const CoverLegend = (): JSX.Element => {
  return (
    <Grid container flexDirection="column">
      <Grid item style={{ marginBottom: 15 }}>
        <Text weight={600} textSize={15} upper>
          {pages.cover_first.chapters}
        </Text>
      </Grid>

      <Grid item>
        {cover.legend.map(({ key, page }) => (
          <Grid container key={key} alignItems="center" style={{ marginBottom: 20 }}>
            <Grid item>
              {/* <div style={{ height: 70, width: 4, backgroundColor: colors[key as keyof typeof colors] }} /> */}
              <div style={{ height: 70, width: 4, backgroundColor: colors[key] }} />
            </Grid>
            <Grid item style={{ marginLeft: 20 }}>
              <Grid container flexDirection="column">
                <Grid item sx={{ paddingTop: '10px' }}>
                  <Text weight={600} textSize={14} upper>
                    {/* {pages.cover_first[key as keyof typeof pages.cover_first]} */}
                    {pages.cover_first[key]}
                  </Text>
                </Grid>
                <Grid item>
                  <Text family="Rajdhani" textSize={40}>
                    {`${pages.page} ${page}`}
                  </Text>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default CoverLegend;
