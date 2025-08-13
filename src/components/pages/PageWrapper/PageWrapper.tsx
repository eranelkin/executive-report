import React from 'react';

import './pageWrapper.scss';

interface PageWrapperProps {
  children: JSX.Element | JSX.Element[];
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => <div className="wrapper">{children}</div>;

export default PageWrapper;
