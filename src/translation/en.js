const translations = {
  header: {
    discovery: 'Attack Surface Discovery',
    organization: 'Organization',
    subsidiaries: 'Subsidiaries Discovery',
    subsidiariesRisk: 'Subsidiaries',
    digital: 'Digital Supply Chain',
    risk: 'Attack Surface Risk',
    remediation: 'Remediation'
  },
  footer: {
    title: 'Any questions? Contact us at ',
    support: 'support@ionix.io'
  },
  generatePDF: {
    btn: 'Export PDF'
  },
  pages: {
    page: 'Page',
    domains: 'Domains',
    subdomains: 'SubDomains',
    total_ip_addresses: 'Total IPs',
    mobile_apps: 'Mobile Apps',
    open_ports_count: 'Open Ports',
    login_types_count: 'Login Pages',
    certificate_authorities_count: 'Certificates',
    active_ip_addresses: 'Active IP Addresses',
    web_apps: 'Web Apps',
    managed_domains: 'Managed Domains',
    cloud_hosting_provider: 'Cloud Hosting Provider',
    domain_registrars: 'Domain Registrars',
    cdns: 'CDNS',
    wafs: 'WAFS',
    fqdn: 'Cloud & On-premises',
    public_cloud: 'cloud instance type distribution',
    certificate_authorities: 'Certificate Authorities',
    domain_registrars_link: 'Providers',
    cdns_link: 'CDNS',
    wafs_link: 'WAFS',
    domain_registrars_link: 'Registrars',
    certificate_authorities_link: 'Authorities',
    cover_first: {
      executiveReport: 'Executive Report',
      chapters: 'Chapters',
      discovery: 'Attack surface discovery',
      risk: 'Attack Surface Risk',
      remediation: 'Remediation',
      info: 'Ionix is on a mission to transform the way organizations see, manage, and secure their External Attack Surface. With the explosion of cloud infrastructure and services, consumerization of IT and new open and distributed system architectures are creating an everchanging, unknown and uncontrolled external attack surface. As enterprises become increasingly Internet exposed, their invisible external attack surface poses an unparalleled challenge for security teams. This report provides you a view of the Continuous Protection process implemented in your organization',
      notCyberpionInfo:
        'This report summarizes the security exposure of organizational assets. The report provides statistics about the organizational assets and summarizes the security analysis conducted on them.',
      ourMission: 'Our Mission',
      notCyberpionTitle: 'External Attack Surface Analysis'
    },
    discoveryOrganization: {
      info: 'Ionix operates a continuous and iterative asset discovery process to identify the Internet exposed assets an organization owns and depends on including on premises, in the Public Cloud, and managed services. The solution iterates the process for the organization’s subsidiaries, its different trademarks, products, and services and providing a comprehensive view of the organization Attack Surface Discovery. ',
      notCyberpionInfo:
        'The discovery process maps organizational domains, subdomains, and IP addresses. It identifies the Internet-exposed assets an organization owns and depends on. This includes on-premises, Cloud assets, and managed services.'
    },
    riskOrganizationRisk: {
      overall: 'Overall Score',
      network: 'Network',
      pki: 'PKI',
      hijacked: 'Hijacked Assets',
      input: 'Input Filtering',
      dns: 'DNS',
      login: 'Login Pages',
      cloud: 'Cloud',
      web: 'WEB',
      unknown: 'Unknown/Unmanaged',
      vulnerable: 'Vulnerable Components',
      mail: 'Mail',
      internal_connections: 'Internal Connections',
      info: 'Attack Surface Risk present the detailed assessment of the organizational Attack Surface Discovery. Risk analysis is performed on organizational assets, digital supply chain, partners, and service providers, and takes the scale of the organization, the asset importance and the security issue into account, when defining the Risk score. The above graph presents the organizational Risk score against the organizational proposed Risk score goal, to verify progress in reducing the risk, while the organization environment is changing and evolving.',
      notCyberpionInfo:
        'Attack Surface Risk presents a detailed assessment of the organizational Attack Surface Discovery. Risk analysis is performed on corporate assets, digital supply-chain, partners, and service providers. The Risk Score considers the scale of the organization, the importance of the assets, and the security issues into account. The above graph represents the organizational Risk Score compared to thousands of other organizations.'
    },
    discoveryDigital: {
      linkAssets: 'Other connected assets',
      assets: 'Top 3rd party connected Assets',
      asset_type_count: 'Number of 3rd party connected Assets',
      connections_types_count: 'Number of 3rd party connections',
      top: 'Top 3rd party connected Assets',
      managed: 'Managed Domains found',
      managedDomainsLink: 'Connected organizations',
      connections_types: '3rd Party Connections By Type',
      hosting_provider: 'Connected Infrastructure By Hosting Provider',
      org_country: 'Org assets by Geo',
      external_country: 'External Assets by Geo'
    },
    riskOrganizationTechs: {
      exposed_system_remote_access: 'Exposed services and protocols at risk',
      open_ports: 'Non-web Open Ports',
      onlyHttp: 'Only over HTTP',
      httpAndHttpsInvalidCert: 'Over HTTP and HTTPS with an invalid certificate',
      httpAndHttpsValidCert: 'Over HTTP and HTTPS with a valid certificate ',
      httpsOnlyInvalidCert: 'Only over HTTPS with an invalid certificate',
      httpsOnlyValidCert: 'Only over HTTPS with a valid certificate',
      login: 'Login Pages',
      services: 'Top Vulnerable Components ',
      CVES: 'CVEs found by CVSS'
    },
    riskSubsidiariesRanks: {
      open: 'Open critical action items'
    },
    riskDigital: {
      title: 'external connected assets.',
      directly: 'Connected 3rd party at critical risk',
      connected: 'Connected 4th+ party',
      countries: 'Sanctioned Countries OFAC',
      orgAssets: 'Org assets',
      externalAssets: '3rd party connected assets',
      linkTop: 'Other 3rd party connected assets',
      linkBottom: 'Other 4th party connected Orgs',
      risky: 'Risky Connections',
      safe: 'Safe Connections',
      CVES: 'CVEs found by CVSS'
    }
  }
};

export default translations;
