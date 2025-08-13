// @ts-nocheck
import styled from 'styled-components';

const variantsColors = {
  discovery: '#4b7ae7',
  risk: '#4b7ae7', // '#D63E3E',
  remediation: '#1AA964'
};

interface StyledHeaderProps {
  bgColor: string;
}
// export const StyledHeader = styled(HeaderWrapper)`÷

const StyledHeader = styled.div<StyledHeaderProps>`
  display: flex;
  height: 115px;
  width: 816px;
  font-color: '#FFFFFF';
  background-color: ${(props) => props.bgColor};
  border-radius: 0 0 25px 25px;
`;

interface HeaderProps {
  variant: string;
}

const Header: React.FC<HeaderProps> = ({ variant, children }) => {
  // const bgColor = variantsColors[variant as keyof typeof variantsColors];
  const bgColor = variantsColors[variant];

  return <StyledHeader bgColor={bgColor}>{children}</StyledHeader>;
};

export default Header;
