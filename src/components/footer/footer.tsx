import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { APPRoute } from '../../const';
import { containerCss, styledLink } from '../_common/common';


const FooterInfo = {
  Facebook: {name: 'facebook', href: 'https://www.facebook.com/', xlink: '#icon-facebook'},
  Instagram: {name: 'instagram',  href: 'https://www.instagram.com/', xlink: '#icon-instagram'},
  Twitter: {name: 'twitter', href: 'https://www.twitter.com/', xlink: '#icon-twitter'},
} as const;


const SocialLink = styled.a`
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  color: #ffffff;
  -webkit-transition: color 0.3s ease;
          transition: color 0.3s ease;
  fill: currentColor;
  &::before {
    top: 50%;
    left: 50%;
    position: absolute;

    width: 40px;
    height: 40px;

    content: "";
    -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
  }
  &:hover {
    color: #c90606;
  }
  &:focus {
    color: #dddada;
  }
`;

const SocialLi = styled.li`
margin-top: 20px;
margin-left: 20px;`;

const SocialSvg = styled.svg.attrs({ width: 24, height: 24 })`
width: 24px;
height: 24px;
`;


function Social({social}: {social: {name: string, href: string, xlink: string}}): JSX.Element {
  const {href, name, xlink} = social;
  return (
    <SocialLi>
      <SocialLink href={href} aria-label={name}>
        <SocialSvg aria-hidden="true">
          <use xlinkHref={xlink}></use>
        </SocialSvg>
      </SocialLink>
    </SocialLi>
  );
}


const FooterLogo = styled(Link)`
margin-right: auto;
margin-bottom: 55px;
grid-area: logo;
display: flex;
align-items: start;`;

const Img = styled.img.attrs({ width: 70, height: 70, src: '/img/svg/logo.svg', alt: 'Логотип'})``;

const SocialList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: -20px 0 0 -20px;
  padding: 0;
  list-style: none;`;

const NavList = styled.ul`
margin: 0;
padding: 0;

list-style: none;

font-size: 10px;
line-height: 20px;

color: #ffffff;

letter-spacing: 0.1em;`;

const SVGIcon = styled.svg`
align-self: center;
width: 9px;
height: 9px;
margin-right: 3px;`;

const SVGIconWrapper = styled.span`
display: flex;
align-items: center;
flex-wrap: wrap;`;

const SocialsWrapper = styled.div`grid-area: socials;`;
const StyledATel = styled.a.attrs({ href: 'tel:88125005050'})`${styledLink}`;

const StyledA = styled.a.attrs({ href:  '#top'})`${styledLink}`;

const NavContent = styled.p`
  margin: 6px 0 0;
  font-family: "Open Sans", "Arial", sans-serif;
  font-size: 10px;
  line-height: 12px;
  color: #ffffff;
  letter-spacing: 0.1em;
`;

const NavContent2 = styled(NavContent)`
font-family: "Droid Sans", "Arial", sans-serif;
letter-spacing: 0.03em;
`;


const NavTitle = styled.h2`
margin: 0;
font-family: "Droid Sans", "Arial", sans-serif;
font-size: 14px;
font-weight: 400;
line-height: 44px;
color: #ffffff;
letter-spacing: 0.13em;
`;

const NavSectionInfo = styled.section`grid-area: info;`;
const NavSectionLinks = styled.section`grid-area: links;`;
const NavSectionContacts = styled.section`grid-area: contacts;`;

const Container = styled.div`
  ${containerCss}
  display: grid;
  grid-column-gap: 25px;
  grid-template-areas: "logo info links contacts" "socials info links contacts";
  grid-template-columns: 220px 145px 283px 150px;
  grid-template-rows: 125px auto;
  `;

const FooterBlock = styled.footer`
min-height: 275px;
padding-top: 66px;
padding-bottom: 15px;
background-color: #131212;
`;


export default function Footer(): JSX.Element {

  const socials = Object.values(FooterInfo).map((social) => <Social key={social.name} social={social} />);
  return (
    <FooterBlock>
      <Container>
        <FooterLogo to={APPRoute.Main}>
          <Img/>

        </FooterLogo>
        <SocialsWrapper>
          <SocialList>

            {socials}

          </SocialList>
        </SocialsWrapper>
        <NavSectionInfo>
          <NavTitle>О нас</NavTitle>
          <NavContent2>Магазин гитар, музыкальных инструментов и гитарная мастерская <br/> в Санкт-Петербурге.<br/><br/>Все инструменты проверены, отстроены <br/> и доведены до идеала!</NavContent2>
        </NavSectionInfo>
        <NavSectionLinks>
          <NavTitle>Информация</NavTitle>
          <NavList>
            <li><StyledA>Где купить?</StyledA></li>
            <li><StyledA>Блог</StyledA></li>
            <li><StyledA>Вопрос - ответ</StyledA></li>
            <li><StyledA>Возврат</StyledA></li>
            <li><StyledA>Сервис-центры</StyledA></li>
          </NavList>
        </NavSectionLinks>
        <NavSectionContacts>
          <NavTitle>Контакты</NavTitle>
          <NavContent>
            г. Санкт-Петербург,<br/>
            м. Невский проспект, <br/>
            ул. Казанская 6.
          </NavContent>
          <NavContent>
            <SVGIcon width="8" height="8" aria-hidden="true">
              <use xlinkHref="#icon-phone"></use>
            </SVGIcon>
            <StyledATel> 8-812-500-50-50</StyledATel>
          </NavContent>
          <NavContent>Режим работы:<br/>
            <SVGIconWrapper>
              <SVGIcon width="13" height="13" aria-hidden="true">
                <use xlinkHref="#icon-clock"></use>
              </SVGIcon>
              <span> с 11:00 до 20:00</span>
              <span>без выходных</span>
            </SVGIconWrapper>
          </NavContent>
        </NavSectionContacts>
      </Container>
    </FooterBlock>
  );
}
