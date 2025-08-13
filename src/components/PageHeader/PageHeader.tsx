// @ts-nocheck
import React from 'react';
import Grid from '@mui/material/Grid';
import translations from '../../translation/en';
import Header from 'components/PageHeader/Header';
import { useReport, ReportContextType } from 'components/ReportContext';
import { Text, getPDFFormatedDate } from '@cyberpion/cyberpion-ui';
import pdf from '../../pdf.config.json';
import { Logo } from 'styles/global';

interface PageHeaderProps {
  name: string;
}
interface PageKeys {
  titleKey?: string;
  subtitleKey?: string;
}
const PageHeader: React.FC<PageHeaderProps> = ({ name }) => {
  const {
    displayLogo,
    global: { isManaged, companyName, logoSecondary }
  } = useReport(); // as ReportContextType;
  // const page = pdf.pages[name as keyof typeof pdf.pages];
  const page = pdf.pages[name];
  const { titleKey, subtitleKey }: PageKeys = page;
  const date = getPDFFormatedDate();
  const group = name.split('_')[0];
  const logoProps = !isManaged ? { width: 210 } : {};

  return (
    <Header variant={group}>
      <Grid container sx={{ padding: '20px 44px' }} spacing={1}>
        {displayLogo && (
          <>
            <Grid item sm={9} md={9}>
              <Logo src={logoSecondary} {...logoProps} />
              {/* {isManaged && <Logo src={logoSecondary} width={'134px'} height={'28px'} />}
              {!isManaged && <Logo src={logoSecondary} width={'200px'} height={'30px'} />} */}
            </Grid>
            <Grid item sm={3} md={3}>
              <Text textColor="#ffffff">{`${companyName}, ${date}`}</Text>
            </Grid>
          </>
        )}
        <Grid item sm={10} md={10}>
          <Text textColor="#ffffff" upper textSize={14} weight={600} family="Arial">
            {/* {translations.header[titleKey as keyof typeof translations.header]} */}
            {translations.header[titleKey]}
          </Text>
        </Grid>
        {!displayLogo && (
          <Grid item sm={2} md={2}>
            <Text textColor="#ffffff">{date}</Text>
          </Grid>
        )}
        <Grid item sm={12} md={12} sx={{ paddingTop: '4px !important' }}>
          <Text textColor="#ffffff" upper textSize={12} weight={600} family="Arial" style={{ marginTop: 0 }}>
            {/* {translations.header[subtitleKey as keyof typeof translations.header]} */}
            {translations.header[subtitleKey]}
          </Text>
        </Grid>
        {!displayLogo && <Grid item sx={{ height: '40px' }}></Grid>}
      </Grid>
    </Header>
  );
};

export default PageHeader;
