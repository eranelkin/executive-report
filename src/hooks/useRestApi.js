import { useState, useEffect, useMemo } from 'react';
import { env } from '../env';
import { getParamFromUrl } from 'utils';

// INFO: from now we are using ADMIN TOKEN with dynamic company name, do not change the admin token
const addHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const msspAccount = getParamFromUrl('account');
  if (msspAccount) {
    headers['X-Account-Name'] = msspAccount;
  }
  return headers;
};

export const APIsTypes = {
  COMPANY: 'company',
  ORG_ASSETS: 'org_assets',
  EXTERNAL_ASSETS: 'external_assets',
  LOGIN_ASSETS: 'login_assets',
  GRAPH_FQDN: 'graph_fqdn',
  GRAPH_CONNETCIONS: 'graph_connections',
  GRAPHS_CVES: 'graphs_cves',
  GRAPHS_CVES_EXTERNAL: 'graphs_cves_external',
  GRAPHS_APPS_EXTERNAL: 'graphs_apps_external',
  ASSET_TECHNOLOGY: 'asset_technology',
  ASSET_CERTIFICATES: 'asset_certificates',
  ASSET_CONNECTIONS: 'asset_connections',
  ASSET_TEST: 'asset_test',
  GRAPH_CONNECTIONS: 'graph_connections',
  GRAPHS_CONNECTION_SECURITY: 'graphs_connection_security',
  ORG_SCORE: 'org_score',
  ORG_SCORE_SUMMARY: 'org_score_summary',
  ASSET_OFAC: 'asset_ofac',
  ORG_VULNURABLE: 'org_vulnurable_components',
  ORG_VULNURABLE_EXTERNAL: 'org_vulnurable_components_external'
};

const getAPIs = (company, isBulk, reportType, globalFilter) => {
  const globalFilderUrl = !!globalFilter ? `/?global_filter=${globalFilter}` : '';
  const url = isBulk ? `internal/companies_data/${company}/` : '';
  const APIs = {
    poc: [
      { type: 'company', url: `${url}metadata/company${globalFilderUrl}` },
      { type: 'org_assets', url: `${url}metadata/asset/org_assets${globalFilderUrl}` },
      { type: 'external_assets', url: `${url}metadata/asset/external_assets${globalFilderUrl}` },
      { type: 'login_assets', url: `${url}metadata/asset/login_assets${globalFilderUrl}` },
      { type: 'graph_fqdn', url: `${url}metadata/graph/fqdn${globalFilderUrl}` },
      { type: 'asset_technology', url: `${url}metadata/asset/technology${globalFilderUrl}` },
      { type: 'asset_connections', url: `${url}metadata/asset/connections${globalFilderUrl}` },
      { type: 'asset_test', url: `${url}metadata/asset/test${globalFilderUrl}` },
      { type: 'graph_connections', url: `${url}metadata/graph/connections${globalFilderUrl}` },
      { type: 'org_score', url: `${url}metadata/org_score${globalFilderUrl}` },
      { type: 'org_score_summary', url: `${url}metadata/org_score/summary${globalFilderUrl}` },
      { type: 'asset_ofac', url: `${url}metadata/asset/ofac${globalFilderUrl}` },
      { type: 'graphs_cves', url: `${url}metadata/graph/cves${globalFilderUrl}` },
      { type: 'graphs_connection_security', url: `${url}metadata/graph/connection_security${globalFilderUrl}` },
      { type: 'graphs_cves_external', url: `${url}metadata/graph/cves_external${globalFilderUrl}` },
      {
        type: 'org_vulnurable_components',
        url: `${url}metadata/graph/org_vulnurable_components${globalFilderUrl}`
      },
      {
        type: 'org_vulnurable_components_external',
        url: `${url}metadata/graph/org_vulnurable_components_external${globalFilderUrl}`
      },
      { type: 'asset_certificates', url: `${url}metadata/asset/certificates${globalFilderUrl}` }
    ]
  };
  return APIs[reportType];
};

const useRestApi = (company, isBulk, globalFilter) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fetchedData, setFetchedData] = useState(null);
  const [isFetchedFailure, setIsFetchedFailure] = useState(false);

  const getPromises = (reportType) => {
    const reportAPIs = getAPIs(company, isBulk, reportType, globalFilter);
    const promises = reportAPIs.map(({ url }) =>
      fetch(`${env.REACT_APP_BASE_URL}${url}`, {
        method: 'GET',
        mode: 'cors',
        headers: addHeaders(),
        credentials: 'include'
      })
    );

    return promises;
  };

  const fetchPrtomiseAll = async (reportType) => {
    try {
      setIsLoading(true);
      const reportAPIs = getAPIs(company, isBulk, reportType, globalFilter);
      const promises = getPromises(reportType);
      const responses = await Promise.all(promises);
      let result = {};
      let index = 0;
      for (let response of responses) {
        const data = await response.json();
        result = { ...result, [reportAPIs[index].type]: data };
        index++;
      }
      setFetchedData(result);
      setIsLoading(false);
    } catch (err) {
      setIsFetchedFailure(true);
    }
  };

  return { isLoading, isFetchedFailure, fetchedData, getPromises, fetchPrtomiseAll };
};

export default useRestApi;
