import { useDispatch } from 'react-redux';
import {  useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { APPRoute } from '../../const';
import { setGuitarsLoadingStatus } from '../../store/actions';
import { StyledLink } from '../_common/common';


const NavLink = styled(StyledLink)`
display: block;
margin-top: 10px;
margin-left: 37px;
${({ $isCurrent = false } : { $isCurrent?: boolean }) => $isCurrent ? css`pointer-events: none;` : ''}
`;

const NavList = styled.ul`
display: flex;
flex-wrap: wrap;
width: 390px;
margin: -10px 0 0 -37px;
padding: 0;
list-style: none;`;

const Nav = styled.nav`
display: block;
margin-right: 27px;
font-size: 14px;
line-height: 20px;
text-align: left;
letter-spacing: 1px;`;


export default function HeaderNav(): JSX.Element {

  const location = useLocation();
  const dispatch = useDispatch();

  const handleCatalogClick = () => dispatch(setGuitarsLoadingStatus(true));

  return (
    <Nav>
      <NavList>
        <li>
          <NavLink
            onClick={handleCatalogClick}
            $isCurrent={location.pathname === APPRoute.Catalog}
            to={APPRoute.Catalog}
          >Каталог
          </NavLink>
        </li>
        <li>
          <NavLink to={APPRoute.Contacts}>
            Где купить?
          </NavLink>
        </li>
        <li>
          <NavLink to={APPRoute.Info}>
            О компании
          </NavLink>
        </li>
      </NavList>
    </Nav>
  );
}
