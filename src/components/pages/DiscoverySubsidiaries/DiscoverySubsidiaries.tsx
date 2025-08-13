import React from 'react';
import { VerticalList } from '@cyberpion/cyberpion-ui';
import Divider from '@mui/material/Divider';
import pdf from '../../../pdf.config.json';

import './discoverySubsidiaries.scss';

const key = '';
const {
  pages: {
    discovery_subsidiaries: { subsidiariesPerPage: perPage }
  }
} = pdf;

interface DiscoverySubsidiariesProps {
  subsidiaries: object[];
}
const DiscoverySubsidiaries: React.FC<DiscoverySubsidiariesProps> = ({ subsidiaries }) => {
  return (
    <>
      {subsidiaries.map((item, index) => {
        const [items] = Object.values(item);
        const [title] = Object.keys(item);
        return (
          <div key={`${index}-content`} style={{ marginTop: 10 }}>
            <VerticalList
              title={title}
              items={items}
              isMultiColumns={true}
              itemClassName="discovery-subsidiaries-item"
            />
            <Divider />
          </div>
        );
      })}
      ;
    </>
  );
};

export default DiscoverySubsidiaries;
