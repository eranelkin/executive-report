// @ts-nocheck
import React from 'react';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { InfoPanel, DataPanel, Indicator, NA } from '@cyberpion/cyberpion-ui';
import { useReport } from 'components/ReportContext';
import translations from '../../../translation/en';

import './riskOrganizationRanks.scss';

const imageLegend =
  'https://res.cloudinary.com/cyberpion/image/upload/v1678785860/executive_report/legend_white_mezgys.svg';
const {
  pages: { riskOrganizationRisk: pageTexts }
} = translations;

const RiskOrganizationRanks: React.FC = () => {
  const {
    global: { isManaged },
    riskOrganizationRanks: { all, overall }
  } = useReport(); // as ReportContextType;

  // const mock = {
  //   Cloud: {
  //     risk: 'F+',
  //     value: 803
  //   },
  //   Network: {
  //     risk: 'A-',
  //     value: 850
  //   },
  //   DNS: {
  //     risk: 'B',
  //     value: 798
  //   },
  //   PKI: {
  //     risk: 'C-',
  //     value: 550
  //   },
  //   Web: {
  //     risk: 'C+',
  //     value: 650
  //   },
  //   Email: {
  //     risk: 'D-',
  //     value: 430
  //   },
  //   'Vulnerable Components': {
  //     risk: 'B-',
  //     value: 730
  //   },
  //   'Hijacked Assets': {
  //     risk: 'F',
  //     value: 240
  //   },
  //   'Unknown / Unmanaged': {
  //     risk: 'C-',
  //     value: 575
  //   },
  //   Connections: {
  //     risk: 'D+',
  //     value: 525
  //   },
  //   'Login Assets': {
  //     risk: 'B-',
  //     value: 738
  //   },
  //   'Input Filtering': {
  //     risk: 'A+',
  //     value: 1000
  //   }
  // };

  return all && overall && Object.keys(all).length > 0 ? (
    <Grid container sx={{ marginTop: 5 }} justifyContent="space-between" className="risk-organization-ranks">
      <Grid item sm={12} md={12}>
        <Grid container>
          <Grid item sm={12} md={12}>
            <Grid container alignItems={'center'} sx={{ marginBottom: 0, paddingLeft: 7 }}>
              <Grid item>
                {/* <Indicator letter={'C'} size={'b'} /> */}
                <Indicator letter={overall.risk} size={'b'} />
              </Grid>
              <Grid item sx={{ paddingLeft: 4 }}>
                <DataPanel
                  titleUpper
                  titleWeight={600}
                  textSize={40}
                  weight={600}
                  titleTextSize={13}
                  title={pageTexts.overall}
                  family="Rajdhani"
                >
                  {overall.value}
                  {/* 632 */}
                </DataPanel>
              </Grid>
              <Grid item sm={7} sx={{ marginLeft: 6 }}>
                <img src={imageLegend} alt="Score legend image" height="75px"></img>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sm={12} md={12} sx={{ marginLeft: 1, height: '645px' }}>
            <Grid container className="risk-score-all-wrapper" sx={{ paddingTop: 1.25 }}>
              {Object.keys(all).map((item: any, index) => (
                <React.Fragment key={index}>
                  <Grid
                    item
                    key={item}
                    className={index % 2 === 1 ? 'vertical-border' : ''}
                    sm={6}
                    md={6}
                    display="flex"
                    sx={{ padding: '14px 20px 10px 56px', alignItems: 'center' }}
                  >
                    <Indicator letter={all[item].risk} />
                    <DataPanel
                      titleUpper
                      titleTextSize={12}
                      titleWeight={600}
                      upper
                      textSize={36}
                      title={item}
                      family="Rajdhani"
                    >
                      {all[item].value}
                      {/* {mock[item].value} */}
                    </DataPanel>
                  </Grid>
                  {index % 2 === 1 && Object.keys(all).length !== index + 1 && (
                    <Grid item sm={12} md={12}>
                      <Divider />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={12} md={12} sx={{ marginLeft: 6 }}>
        <InfoPanel
          width={680}
          // bgColor="linear-gradient(180deg, #D63E3E 0%, #B41111 100%)"
          bgColor="linear-gradient(180deg, #1A90DE 0%, #103772 100%)"
          borderRadius="10px"
          style={{
            padding: '20px 20px 20px 25px'
          }}
        >
          {isManaged ? pageTexts.info : pageTexts.notCyberpionInfo}
        </InfoPanel>
      </Grid>
    </Grid>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', height: '850px', alignItems: 'center' }}>
      <NA textSize={56} weight={600} />
    </div>
  );
};

export default RiskOrganizationRanks;
