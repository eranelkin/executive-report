// @ts-nocheck
import { createContext, useContext, useState, useEffect } from 'react';
import pdf from '../pdf.config.json';
import useRestApi, { APIsTypes } from '../hooks/useRestApi';

// FIX: any
type IObject = {
  [key: string]: any; // object | number;
};

export type ReportContextType = {
  reportType: string;
  displayAsLinks?: boolean;
  displayLogo?: boolean;
  pagesAmount: number;
  pages: string[];
  isLoading: boolean;
  subsidiariesByPages: IObject[][] | null;
  fetchError: unknown | null;
  global: IObject;
  discoveryOrganization: any;
  discoveryDigital: any;
  riskOrganizationTechs: IObject;
  riskOrganizationRanks: IObject;
  riskDigital: IObject;
};
interface ReportProviderProps {
  reportType: string;
  company: string;
  isBulk?: boolean;
  globalFilter?: string;
  displayAsLinks?: boolean;
  displayLogo?: boolean;
  handlerLoadingData?: () => void;
  handlerOnFailure?: () => void;
  children: JSX.Element | JSX.Element[];
}

const {
  pages: {
    discovery_subsidiaries: { subsidiariesPerPage: perPage }
  },
  pagesByTypes: pages
} = pdf;

const ReportContext = createContext<ReportContextType | null>(null);

export const ReportProvider: React.FC<ReportProviderProps> = ({
  reportType,
  company,
  isBulk,
  globalFilter,
  displayAsLinks,
  displayLogo,
  handlerLoadingData,
  handlerOnFailure,
  children
}) => {
  // const { pagesByTypes: pages } = pdf;
  const [subsidiaries, setSubsidiaries] = useState<IObject[] | null>(null);
  const [subsidiariesByPages, setSubsidiariesByPages] = useState<IObject[][] | null>(null);
  // const [companyName, setCompanyName] = useState<string>('');
  const [global, setGlobal] = useState<any>(null);
  const [discoveryOrganization, setDiscoveryOrganization] = useState<any>(null);
  const [discoveryDigital, setDiscoveryDigital] = useState<any>(null);
  const [riskOrganizationTechs, setRiskOrganizationTechs] = useState<any>(null);
  const [riskOrganizationRanks, setRiskOrganizationRanks] = useState<any>(null);
  const [riskDigital, setRiskDigital] = useState<any>(null);
  const [fetchError, setFetchError] = useState<unknown | null>(null);
  // const [reportPages, setReportPages] = useState<string[]>(pages[reportType as keyof typeof pages]);
  const [reportPages, setReportPages] = useState<string[]>(pages[reportType]);
  const { isLoading, isFetchedFailure, fetchedData, getPromises, fetchPrtomiseAll } = useRestApi(
    company,
    isBulk,
    globalFilter
  );

  if (!isLoading) {
    handlerLoadingData();
  }
  if (isFetchedFailure) {
    handlerOnFailure();
  }
  // const fetchDiscoverySubsidiariesData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const promises = ['/assets/subsidiaries', '/applications/subsidiaries'].map((url: string) => fetch(url));
  //     const responses: any = await Promise.all(promises);
  //     let result = [];
  //     for (let response of responses) {
  //       const data = await response.json();
  //       result.push(data);
  //     }
  //     setSubsidiaries(mergeArrayObjects(result[0], result[1]));
  //   } catch (err) {
  //     setFetchError(err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const fetchOrgAssets = async () => {
  //   try {
  //     const path = 'metadata/asset/org_assets';
  //     const url = `${env.REACT_APP_BASE_URL}${path}`;
  //     const assets = await fetch (url, {
  //       method: 'GET',
  //       mode: "cors",
  //       headers: addHeaders(),
  //       credentials: 'include'
  //     });
  //     const responses = await assets.json();

  //     console.log(responses)
  //   } catch (error) {
  //     console.log("Error request org_assets")
  //   }
  // }

  // useEffect(() => {
  //   if (subsidiaries && subsidiaries.length > 0) {
  //     let index = 0;
  //     let results: SubsidiariesType[][] = [];
  //     let cloneSubsidiaries = [...subsidiaries];
  //     while (cloneSubsidiaries.length > 0) {
  //       results = [...results, cloneSubsidiaries.splice(index, perPage)];
  //     }
  //     setSubsidiariesByPages(results);
  //     setReportPages((pages) => {
  //       const updatedPages = [...pages];
  //       const subsidiariesPages = new Array(results.length).fill('discovery_subsidiaries');
  //       updatedPages.splice(updatedPages.indexOf('discovery_subsidiaries'), 1, ...subsidiariesPages);
  //       return updatedPages;
  //     });
  //   }
  // }, [subsidiaries]);

  // useEffect(() => {
  //   const areSubsidiaries = reportPages.includes("discovery_subsidiaries") || reportPages.includes("risk_subsidiaries");
  //   if (areSubsidiaries) {
  //     fetchDiscoverySubsidiariesData();
  //   } else {
  //     setIsLoading(false);
  //   }
  //   fetchOrgAssets()
  // }, []);

  useEffect(() => {
    fetchPrtomiseAll(reportType);
  }, []);

  const parseReportGlobalData = (data: IObject) => {
    const { display_name } = data[APIsTypes.COMPANY];
    const { display_name, is_cyberpion_managed, is_ionix_managed, main_logo, secondary_logo } = data[APIsTypes.COMPANY];
    setGlobal({
      companyName: display_name,
      isManaged: is_cyberpion_managed || is_ionix_managed,
      logoMain: main_logo,
      logoSecondary: secondary_logo
    });
  };

  const parseDiscoveryOrganization = (data: IObject) => {
    const orgAssets = data[APIsTypes.ORG_ASSETS];
    const loginAssets = data[APIsTypes.LOGIN_ASSETS];
    const graphFQDN = data[APIsTypes.GRAPH_FQDN];
    const assetCertificate = data[APIsTypes.ASSET_CERTIFICATES];

    const {
      domains,
      subdomains,
      active_ip_addresses,
      total_ip_addresses,
      managed_domains,
      open_ports,
      domain_registrars,
      web_apps,
      certificates_count = 0, // FIX: from assetCertificate.count
      cdns,
      wafs
    } = orgAssets;
    const { login_types } = loginAssets;
    const { fqdn, public_cloud } = graphFQDN;
    const { certificate_authorities, certificates } = assetCertificate; // FIX: open when ready

    setDiscoveryOrganization({
      domains,
      subdomains,
      active_ip_addresses,
      total_ip_addresses,
      managed_domains,
      open_ports_count: open_ports?.count,
      login_types_count: login_types?.count,
      domain_registrars: {
        other: domain_registrars.results.length > 2 ? domain_registrars.results.length - 3 : 0,
        results: domain_registrars.results.slice(0, 3)
      },
      web_apps,
      certificates_count,
      cdns: {
        other: cdns.results?.length > 2 ? cdns.results?.length - 3 : 0,
        results: cdns?.results?.slice(0, 3)
      },
      wafs: {
        other: wafs.results?.length > 2 ? wafs.results?.length - 3 : 0,
        results: wafs.results?.slice(0, 3)
      },
      fqdn: {
        count: fqdn?.count,
        other: fqdn.results?.length > 2 ? fqdn.results?.length - 3 : 0,
        results: fqdn.results?.slice(0, fqdn.results?.length !== 4 ? 3 : 4)
      },
      public_cloud: {
        count: public_cloud?.count,
        results: public_cloud.results?.slice(0, public_cloud.results?.length !== 4 ? 3 : 4)
      },
      certificate_authorities_count: certificates, //certificate_authorities?.count,
      certificate_authorities: {
        other: certificate_authorities.results?.length > 2 ? certificate_authorities.results?.length - 3 : 0,
        results: certificate_authorities.results?.slice(0, 3)
      }
    });
  };

  const parseDiscoveryDigital = (data: IObject) => {
    const { service_provider, country: org_country } = data[APIsTypes.ORG_ASSETS];
    const {
      total_assets,
      hosting_provider,
      connections_types,
      country: external_country
    } = data[APIsTypes.EXTERNAL_ASSETS];
    const { target } = data[APIsTypes.ASSET_CONNECTIONS];

    setDiscoveryDigital({
      asset_type_count: total_assets,
      connections_types_count: connections_types?.count,
      service_provider: {
        other: service_provider.results.length > 17 ? service_provider.results.length - 17 : 0,
        results: service_provider.results.slice(0, 17).map((item: object) => Object.keys(item)[0])
      },
      org_country,
      external_country,
      geo_countries: {
        org: [...org_country.results.map((item: any) => Object.keys(item)[0])],
        external: [...external_country.results.map((item: any) => Object.keys(item)[0])]
      },
      target: {
        other: target.results?.length > 3 ? target.results?.length - 4 : 0,
        results: target.results?.slice(0, 4)
      },
      hosting_provider: {
        count: hosting_provider.count,
        results: hosting_provider.results?.slice(0, 4)
      },
      connections_types: {
        count: connections_types.count,
        results: connections_types.results?.slice(0, 4)
      }
    });
  };

  const getSecureConnections = (connection_security: any) => {
    const connectionSecurity = connection_security.results.reduce(
      (all, curr) => ({
        ...all,
        [curr.label]: curr.y
      }),
      {}
    );

    return {
      ...connectionSecurity,
      count: connection_security?.count
    };
  };

  const parseRiskOrganizationTechs = (data: IObject) => {
    const assetTest = data[APIsTypes.ASSET_TEST];
    const orgAssets = data[APIsTypes.ORG_ASSETS];
    const securedConnection = data[APIsTypes.GRAPHS_CONNECTION_SECURITY];
    const barCVES = data[APIsTypes.GRAPHS_CVES];
    const orgVulnurable = data[APIsTypes.ORG_VULNURABLE]; // FIX: open when ready

    const { exposed_system_remote_access } = assetTest;
    const { open_ports } = orgAssets;
    const { connection_security } = securedConnection;
    const { apps } = orgVulnurable; // FIX: open when ready

    const openPorts = {
      ...open_ports,
      results: open_ports.results.filter(
        (item: object) => Object.keys(item)[0] !== '80' && Object.keys(item)[0] !== '443'
      )
    };
    setRiskOrganizationTechs({
      exposed_system_remote_access: {
        other: exposed_system_remote_access.results.length > 3 ? exposed_system_remote_access.results.length - 4 : 0,
        results: exposed_system_remote_access.results.slice(0, 4)
      },
      open_ports: {
        other: openPorts.results.length > 3 ? openPorts.results.length - 4 : 0,
        results: openPorts.results.slice(0, 4)
      },
      secure_connection: getSecureConnections(connection_security),
      apps_count: 1, // apps?.count,
      apps: {
        count: apps.count,
        results: apps.results.slice(0, 6)
      },
      cves_by_cvss: barCVES
    });
  };

  const parseRiskOrganizationRanks = (data: IObject) => {
    const orgScore = data[APIsTypes.ORG_SCORE];
    const overallScore = data[APIsTypes.ORG_SCORE_SUMMARY];

    const scoreKeys = [
      'Cloud',
      'Network',
      'DNS',
      'PKI',
      'Web',
      'Email',
      'Vulnerable Components',
      'Hijacked Assets',
      'Potentially Unmanaged Assets',
      'External Connections',
      'Login Assets',
      'Input Filtering',
      'TLS'
    ];

    const allScores = orgScore.results
      .filter((item: any) => scoreKeys.includes(item[0].label) && item[0].sections[0].value !== null)
      .reduce(
        (all: any, curr: any) => ({
          ...all,
          [curr[0].label]: {
            risk: curr[0].sections[0].label,
            value: curr[0].sections[0].value
          }
        }),
        {}
      );
    // const overall = overallScore.data
    //   .filter((item: any) => item.sections[0].type === 'score_arrow')
    //   .reduce(
    //     (all: any, curr: any) => ({
    //       ...all,
    //       risk: curr.sections[0].label,
    //       value: curr.sections[0].value
    //     }),
    //     {}
    //   );

    const overall = {
      risk: overallScore.overall_rank,
      value: overallScore.overall_score
    };

    setRiskOrganizationRanks({ overall: { ...overall }, all: { ...allScores } });
  };

  const parseRiskDigital = (data: IObject) => {
    const garphConnections = data[APIsTypes.GRAPH_CONNECTIONS];
    const assetConnections = data[APIsTypes.ASSET_CONNECTIONS];
    const assetOfac = data[APIsTypes.ASSET_OFAC];
    const orgVulnurableExternal = data[APIsTypes.ORG_VULNURABLE_EXTERNAL];
    const barCVESExternal = data[APIsTypes.GRAPHS_CVES_EXTERNAL];

    const { connections } = garphConnections;
    const { target_critical } = assetConnections;
    const { org_assets, external_assets } = assetOfac;
    const { apps } = orgVulnurableExternal; // FIX: open when ready

    setRiskDigital({
      connections: {
        ...connections,
        other: connections.results.length > 2 ? connections.results.length - 3 : 0,
        results: connections.results.slice(0, 3)
      },
      cves_by_cvss: barCVESExternal,
      apps_count: 1, // apps?.count,
      apps: {
        count: apps.count,
        results: apps.results.slice(0, 4)
      },
      org_assets: {
        ...org_assets,
        other: org_assets.results.length > 1 ? org_assets.results.length - 2 : 0,
        results: org_assets.results.slice(0, 2)
      },
      external_assets: {
        ...external_assets,
        other: external_assets.results.length > 1 ? external_assets.results.length - 2 : 0,
        results: external_assets.results.slice(0, 2)
      },
      target_critical: {
        ...target_critical,
        other: target_critical.results?.length > 3 ? target_critical.results?.length - 4 : 0,
        results: target_critical?.results.slice(0, 4)
      }
    });
  };

  const parseFetchedData = (fetchedData: IObject) => {
    parseReportGlobalData(fetchedData);
    parseDiscoveryOrganization(fetchedData);
    parseDiscoveryDigital(fetchedData);
    parseRiskOrganizationTechs(fetchedData);
    parseRiskOrganizationRanks(fetchedData);
    parseRiskDigital(fetchedData);
  };

  useEffect(() => {
    if (fetchedData) {
      parseFetchedData(fetchedData);
    }
  }, [fetchedData]);

  // discoveryOrganization && console.log('discoveryOrganization: ', discoveryOrganization);
  // discoveryDigital && console.log('discoveryDigital', discoveryDigital);
  // riskOrganizationTechs && console.log('riskOrganizationTechs', riskOrganizationTechs);
  // riskOrganizationRanks && console.log('riskOrganizationRanks', riskOrganizationRanks);
  // riskDigital && console.log('riskDigital', riskDigital);

  return (
    <ReportContext.Provider
      value={{
        reportType,
        displayAsLinks,
        displayLogo,
        global,
        pages: reportPages,
        pagesAmount: reportPages.length,
        isLoading,
        discoveryOrganization,
        discoveryDigital,
        riskOrganizationTechs,
        riskOrganizationRanks,
        riskDigital,
        subsidiariesByPages,
        fetchError,
        globalFilter
      }}
    >
      {children}
    </ReportContext.Provider>
  );
};

export const useReport = () => {
  return useContext(ReportContext);
};
