// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import pdf from '../../../../pdf.config.json';
import { Logo } from 'styles/global';
import Contact from 'components/Contact/Contact';
import { useReport, ReportContextType } from 'components/ReportContext';

import './lastPage.scss';

const imageBG = 'https://res.cloudinary.com/cyberpion/image/upload/v1675244834/executive_report/end_page_ftdmjb.svg';

interface LastPageProps {
  pageNumber: number;
}
const LastPage: React.FC<LastPageProps> = ({ pageNumber }) => {
  const { width, height } = pdf.size;
  const {
    displayLogo,
    global: { isManaged, logoSecondary }
  } = useReport(); // as ReportContextType;

  return (
    <Grid container>
      <Grid item sm={12} md={12} id="executive-report-last-page">
        <img src={imageBG} alt="end cover page image" width={width} height={height}></img>
        <div className="content" style={{ top: height * (pageNumber - 1) + 500, left: 300 }}>
          {displayLogo && <Logo src={logoSecondary} />}
          {/* {isManaged && displayLogo && <Logo src={logoSecondary} width="260px" height="50px" />}
          {!isManaged && displayLogo && (
            <Logo src={logoSecondary} width="300px" height="50px" className="other-logo" />
          )} */}
          {isManaged && <Contact textColor="#FFFFFF" style={{ paddingTop: 20 }} />}
        </div>
      </Grid>
    </Grid>
  );
};

export default LastPage;
