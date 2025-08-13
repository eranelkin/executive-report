// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import pdf from '../../../../pdf.config.json';
import { Logo } from 'styles/global';
import { Text, InfoPanel, getPDFFormatedDate } from '@cyberpion/cyberpion-ui';
import firstTexts from '../../../../translation/en';
import { useReport, ReportContextType } from 'components/ReportContext';
import CoverLegend from 'components/pages/Cover/CoverLegend/CoverLegend';

import './FirstPage.scss';

const rightImage =
  'https://res.cloudinary.com/cyberpion/image/upload/v1675244834/executive_report/first_page_bzzt3m.svg';

const {
  pages: { cover_first: cover }
} = firstTexts;

const FirstPage = () => {
  const { width, height } = pdf.size;
  const date = getPDFFormatedDate();
  const {
    displayLogo,
    globalFilter,
    global: { isManaged, companyName, logoMain }
  } = useReport(); // as ReportContextType;

  return (
    <Grid container>
      <Grid item sm={6}>
        <Grid container flexDirection={'column'} sx={{ paddingTop: 10, paddingLeft: 5.5 }}>
          <Grid item sx={{ paddingRight: 2.5, height: 50 }}>
            {/* {displayLogo && <Logo src={logo} width="300px" height="50px" />} */}
            {/* {isManaged && displayLogo && (
              <Logo src={logoMain} width="245px" height="50px" style={{ paddingLeft: 10 }} />
            )}
            {!isManaged && displayLogo && (
              <Logo src={logoMain} width="270px" height="40px" style={{ paddingLeft: 14 }} />
            )} */}
            {displayLogo && <Logo src={logoMain} />}
          </Grid>
          <Grid item sx={{ paddingTop: 5 }}>
            <Text weight={600} textSize={20} textColor="#000000" upper>
              {cover.executiveReport}
            </Text>
            <Text weight={600} textSize={25} family="Rajdhani" textColor="#000000" upper style={{ paddingTop: 3 }}>
              {companyName}
            </Text>
            <Text weight={600} textSize={22} family="Rajdhani" textColor="#000000" upper style={{ paddingTop: 3 }}>
              人人有權享有生命 發布這一世界人權宣言
              {/* {globalFilter} */}
            </Text>
            {!!globalFilter && (
              <Text weight={600} textSize={22} family="Rajdhani" textColor="#000000" upper style={{ paddingTop: 3 }}>
                市は橋氏は獅子橋橋橋橋ははきはき
                {/* {globalFilter} */}
              </Text>
            )}
          </Grid>
          <Grid item sx={{ marginTop: 4 }}>
            <CoverLegend />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={6}>
        <img src={rightImage} alt="cover page image" width={width / 2} height={height}></img>
      </Grid>
      <Grid item sx={{ position: 'absolute', top: 30, left: width - 170 }}>
        <Text textColor="#FFFFFF">{date}</Text>
      </Grid>
      <Grid item sx={{ position: 'absolute', top: 230, left: width - 370 }}>
        <InfoPanel textColor="#FFFFFF" title={isManaged ? cover.ourMission : cover.notCyberpionTitle} width={300}>
          {isManaged ? cover.info : cover.notCyberpionInfo}
        </InfoPanel>
      </Grid>
    </Grid>
  );
};

export default FirstPage;
