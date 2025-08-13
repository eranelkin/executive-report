import React from 'react';

interface PageContentProps {
  children: JSX.Element | JSX.Element[];
}

const PageContent: React.FC<PageContentProps> = ({ children }) => <div className="content">{children}</div>;

export default PageContent;
