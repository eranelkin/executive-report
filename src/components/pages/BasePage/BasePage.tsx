// @ts-nocheck
import React from 'react';

import { useReport, ReportContextType, subsidiariesByPages } from 'components/ReportContext';
import PageHeader from 'components/PageHeader/PageHeader';
import PageFooter from 'components/PageFooter/PageFooter';
import FirstPage from 'components/pages/Cover/FirstPage/FirstPage';
import LastPage from 'components/pages/Cover/LastPage/LastPage';
import DiscoveryOrganization from 'components/pages/DiscoveryOrganization/DiscoveryOrganization';
// import DiscoverySubsidiaries from '../DiscoverySubsidiaries/DiscoverySubsidiaries';
import DiscoveryDigital from 'components/pages/DiscoveryDigital/DiscoveryDigital';
import RiskOrganizationRanks from 'components/pages/RiskOrganizationRanks/RiskOrganizationRanks';
import RiskOrganizationTechs from 'components/pages/RiskOrganizationTechs/RiskOrganizationTechs';
import RiskSubsidiariesRanks from 'components/pages/RiskSubsidiariesRanks/RiskSubsidiariesRanks';
import RiskDigital from 'components/pages/RiskDigital/RiskDigital';

import './base-page.scss';
// import DiscoverySubsidiariesContainer from '../DiscoverySubsidiaries/DiscoverySubsidiariesContainer';
interface BasePageProps {
  pageNumber: number;
  name: string;
}

// Dimension: 816 X 1056
const BasePage: React.FC<BasePageProps> = ({ pageNumber, name }) => {
  const { subsidiariesByPages } = useReport(); // as ReportContextType;
  let randomColor; // = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div style={{ height: 1056, width: 816, ...(randomColor ? { backgroundColor: randomColor } : {}) }}>
      {name === 'cover_first' && <FirstPage />}
      {name !== 'cover_first' && name !== 'cover_end' && <PageHeader name={name} />}
      {name === 'discovery_organization' && <DiscoveryOrganization />}
      {name === 'discovery_digital' && <DiscoveryDigital />}
      {name === 'risk_organization_ranks' && <RiskOrganizationRanks />}
      {name === 'risk_organization_techs' && <RiskOrganizationTechs />}
      {name === 'risk_subsidiaries' && <RiskSubsidiariesRanks />}
      {name === 'risk_digital' && <RiskDigital />}

      {name === 'cover_end' && <LastPage pageNumber={pageNumber} />}
      {name !== 'cover_end' && <PageFooter pageNumber={pageNumber} />}
      {/* {name === 'discovery_subsidiaries' && <DiscoverySubsidiaries subsidiaries={subsidiariesByPages[0]} />} */}
    </div>
  );
};

export default BasePage;
