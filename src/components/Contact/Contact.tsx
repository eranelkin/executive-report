import React from 'react';
import Link from '@mui/material/Link';
import { Text } from '@cyberpion/cyberpion-ui';
import translations from '../../translation/en';

const { footer: footerText } = translations;

interface ContactProps {
  textColor?: string;
  style?: React.CSSProperties;
}
const Contact: React.FC<ContactProps> = ({ textColor, style }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', ...(style ? { ...style } : {}) }}>
      <Text textSize={10} textColor={textColor}>
        {footerText.title}
      </Text>
      <Link
        sx={{ color: textColor ? textColor : '', fontSize: 10, fontFamily: 'Rubik' }}
        style={{ paddingLeft: 5 }}
        underline="none"
        variant="body2"
        href={'mailto:support@ionix.io'}
      >
        {footerText.support}
      </Link>
    </div>
  );
};

export default Contact;
