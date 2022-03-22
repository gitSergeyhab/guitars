import { Link } from 'react-router-dom';

import HeaderCart from '../header-cart/header-cart';
import HeaderNav from '../header-nav/header-nav';
import HeaderSearch from '../header-search/header-search';
import { APPRoute } from '../../const';
import styled from 'styled-components';
import { containerCss } from '../_common/common';

const HeaderImg = styled.img.attrs({ width: '70', height: '70', src: '/img/svg/logo.svg', alt: 'Логотип' })`
width: 70px;
height: 70px;

-o-object-fit: contain;
   object-fit: contain;`;

const LogoLink = styled(Link).attrs({ to: APPRoute.Main })`
margin-right: 110px;
display: flex;
align-items: start;
`;

const HeaderContainer = styled.div`
  ${containerCss}
  display: flex;
  align-content: center;
  align-items: center;
  width: 100%;
  padding-right: 66px;
  background: inherit;`;

const HeaderBlock = styled.header.attrs({ id: 'header' })`
display: flex;

min-height: 110px;
padding-top: 22px;
padding-bottom: 12px;

color: #ffffff;
background-color: #131212;
`;

export default function Header(): JSX.Element {

  return (
    <HeaderBlock>
      <HeaderContainer>

        <LogoLink>
          <HeaderImg/>
        </LogoLink>

        <HeaderNav/>
        <HeaderSearch/>
        <HeaderCart/>

      </HeaderContainer>
    </HeaderBlock>
  );
}
