import { Link } from 'react-router-dom';
import styled, {css} from 'styled-components';


// Rate
export const RateCount = styled.span`
  margin-right: auto;
  color: #585757;`;

export const RateMessage = styled.span`
  bottom: -17px;
  left: 7px;
  position: absolute;
  width: 100px;
  margin: 0;
  font-size: 10px;
  font-weight: normal;
  font-style: normal;
  line-height: 15px;
  color: #eb5555;
  letter-spacing: 0.02em;`;

export const Rate = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  color: #c90606;
  & svg {
    margin-right: 3px;
  }
  & label {
    position: relative;
  }
  &:not(:checked) > label {
    float: right;
    overflow: hidden;
    width: 18px;
    height: 20px;
    font-size: 30px;
    color: #ffffff;
    cursor: pointer;
    white-space: nowrap;
  }
  &:not(:checked) > label::before {
    position: absolute;
    width: 24px;
    height: 20px;
    background: url("../img/sprite/icon-star.svg") no-repeat top 0 left 0;
    background-size: 18px 20px;
    content: "";
    &  > input:checked ~ label {
      background: url("../img/sprite/icon-full-star.svg") no-repeat top 0 left 0;
      background-size: 18px 20px;
    }
    &:not(:checked) > label:hover,
    &:not(:checked) > label:hover ~ label {
      background: url("../img/sprite/icon-full-star.svg") no-repeat top 0 left 0;
      background-size: 18px 20px;
    }
    & > input:focus + label {
      outline: 1px solid #000000;
      outline-offset: -1px;
    }
  }
  align-items: flex-start;

  width: 100%;
  margin: 2px 0 0 0;

  font-size: 10px;
  line-height: 15px;

  color: #585757;

  letter-spacing: 0.1em;
  `;


// Breadcrumbs

export const BreadcrumbsList = styled.ul`
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 14px;
  line-height: 19px;
  margin: 20px 0 43px;
`;

// Form

export const visuallyHidden = css`
position: absolute;
clip: rect(0 0 0 0);
width: 1px;
height: 1px;
margin: -1px;
`;

export const HiddenLabel = styled.label`${visuallyHidden}`;


export const FormInputContainer = styled.div`
  & input {
    padding-left: 9px;
    font-size: 14px;
    line-height: 28px;
    color: #000000;
    border: 0.7px solid #585757;
    border-radius: 2px;
    transition: border-color 0.3s ease;
    letter-spacing: 0.05em;
  }
  & input[type="number"]::-webkit-inner-spin-button {
    appearance: none;
  }
  & input[type="number"]:invalid {
    border: 2px solid #eb5555;
    outline: none;
  }
  & input::-webkit-input-placeholder {
    opacity: 0.6;
    color: #000000;
  }
  & input::-moz-placeholder {
    opacity: 0.6;
    color: #000000;
  }
  & input:-ms-input-placeholder {
    opacity: 0.6;
    color: #000000;
  }
  & input::-ms-input-placeholder {
    opacity: 0.6;
    color: #000000;
  }
  & input::placeholder {
    opacity: 0.6;
    color: #000000;
  }
  & input:hover {
    border-color: rgba(84, 77, 77, 0.65);
  }
  & input:focus {
    outline-color: #c90606;
  }
`;

export const FilterLegend = styled.legend`
  float: left;
  width: 100%;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
  line-height: 25px;
`;


export const FilterFieldset = styled.legend`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0;
  padding: 31px 0 29px;
  border: none;
  &::before {
    top: 0;
    left: -2px;
    position: absolute;
    width: 215px;
    height: 1px;
    background-color: #dddada;
    content: "";
  }

  &:last-child::after {
    bottom: 0;
    left: -2px;
    position: absolute;
    width: 205px;
    height: 1px;
    background-color: #dddada;
    content: "";
  `;

export const FormCheckBox = styled.div`
  display: flex;
  overflow: hidden;
  align-items: flex-start;
  flex-direction: column;

  & label {
    display: flex;
    overflow: hidden;
    align-items: center;

    font-size: 16px;
    line-height: 23px;

    cursor: pointer;
    -webkit-transition: color 0.3s ease;
            transition: color 0.3s ease;
  }

  & label::before {
    display: block;
    flex-shrink: 0;

    width: 25px;
    height: 25px;
    margin-right: 14px;

    border: 0.7px solid #585757;
    border-radius: 2px;

    content: "";
    cursor: pointer;
    -webkit-transition: border-color 0.3s ease;
            transition: border-color 0.3s ease;
  }
  &  label:hover {
    color: #c90606;
  }
  & input:hover + label::before {
    border-color: #c90606;
  }
  & input:focus + label::before {
    border-color: #c90606;
  }
  & input:active + label {
    color: #c90606;
  }
  & input:checked + label::before {
    background-image: url("data:image/svg+xml,%3Csvg width='13' height='9' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4.71128 8.86588L.649596 4.82698a.250656.250656 0 0 1 0-.35547L1.67499 3.44498c.09798-.09798.25634-.09798.35433 0l2.67399 2.65804c.09798.09798.25748.09684.35547-.00114L10.9673.136389c.098-.099121.2575-.099121.3566-.00114l1.0265 1.026531c.098.09798.098.25635.0012.35433L5.91441 8.01139l.00114.00114-.8488.85335c-.09798.09798-.25749.09798-.35547 0z' fill='%23585757'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: center;
  }
  & input:disabled + label {
    color: #dddddd;
    pointer-events: none;
  }

  & input:disabled + label::before {
    border-color: #dddddd;
    background: #f6f3f3;
    pointer-events: none;
  }
  & input:disabled:hover + label {
    pointer-events: none;
  }
  & input:disabled:hover + label::before {
    border-color: #dddddd;
    background: #f6f3f3;
    pointer-events: none;
  }
`;

export const FormCheckBoxItem = styled(FormCheckBox)`
  margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CheckBoxInput = styled.input.attrs({ type: 'checkbox' })`
${visuallyHidden}`;

// Title

export const title = css`
  padding: 0;
  font-family: "Open Sans", "Arial", sans-serif;
  font-weight: 700;
  line-height: 1.2;
  color: inherit;
`;

export const titleBigger = css`
  ${title}
  font-size: 22px;
  line-height: 30px;
`;

export const titleBig = css`
  ${title}
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.05em;
`;

export const titleMedium20 = css`
  ${title}
  font-size: 18px;
  line-height: 20px;
  letter-spacing: 0.05em;
`;

export const titleLittle = css`
  ${title}
  font-size: 16px;
  letter-spacing: 0.05em;
`;

export const titleLesser = css`
  ${title}
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
`;

export const titleUpper = css`
  text-transform: uppercase;
`;

export const titleRed = css`
  color: #c90606;
`;

export const TitleBiggerPC = styled.h1`
  ${titleBigger}
  margin-top: 0;
  margin-bottom: 0;
`;

// wrappers

export const containerCss = css`
width: 100%;
min-width: 1020px;
max-width: 1020px;
margin: 0 auto;
padding: 0 40px;
`;

export const PageContainer = styled.div`
  width: 100%;
  min-width: 1020px;
  max-width: 1020px;
  margin: 0 auto;
  padding: 0 40px;
`;

export const Main = styled.main`
  position: relative;
  padding: 215px 0 139px;

  &::before, &::after {
    position: absolute;
    width: 100%;
    content: "";
  }
  &::before {
    top: 0;
    height: 251px;
    background-image: url("../img/content/bg_header.png"), url("data:image/svg+xml,%3Csvg width='1020' height='74' viewBox='0 0 1020 74' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='28' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='56' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='14' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='42' width='1020' height='4' fill='%233F3F3F'/%3E%3Crect y='70' width='1020' height='4' fill='%233F3F3F'/%3E%3C/svg%3E%0A");
    background-repeat: no-repeat, repeat-x;
    background-position: top -38px right, top 24px center;
    background-size: 825px, 1020px;
  }
  &::after {
    bottom: 0;
    height: 139px;
    background-image: url("data:image/svg+xml,%3Csvg width='1020' height='5' viewBox='0 0 1020 5' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='1020' height='5' fill='%23131212'/%3E%3C/svg%3E%0A"), url("../img/content/bg_header.png");
    background-repeat: repeat-x, no-repeat;
    background-position: bottom 129px center, bottom -31% left 103%;
    background-size: 1020px, 825px;
    transform: rotate(180deg);
  }
`;

// link

export const styledLink = css`
font: inherit;
color: inherit;
cursor: pointer;
transition: color 0.3s ease;
&:hover {
  color: #c90606;
}
&:active {
  color: #545454;
}
`;

export const StyledLink = styled(Link)`${styledLink}`;

// Button

export const buttonCss = css`
  display: block;
  padding: var(--button-vertical-padding) var(--button-horizontal-padding);
  font-family: "Open Sans", "Arial", sans-serif;
  font-size: 14px;
  font-weight: 700;
  line-height: 19px;
  color: #ffffff;
  border: 2px solid #131212;
  border-radius: 2px;
  background-color: #131212;
  cursor: pointer;
  -webkit-transition: background-image 0.3s ease, background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
          transition: background-image 0.3s ease, background-color 0.3s ease, color 0.3s ease, border 0.3s ease;
  text-align: center;
  letter-spacing: 0.05em;
  --button-horizontal-padding: 18px;
  --button-vertical-padding: 12px;
  &:hover {
    color: #131212;
    background-color: #ffffff;
  }
  `;

export const Button = styled.button`
${buttonCss}
`;

export const ButtonMini = styled(Button)`
  font-size: 12px;
  letter-spacing: 0.02em;
  --button-horizontal-padding: 8px;
  --button-vertical-padding: 1px;
`;

export const ButtonSmall = styled(Button)`
  font-size: 12px;
  --button-horizontal-padding: 12px;
`;

export const ButtonMedium = styled(Button)`
  font-size: 14px;
  --button-horizontal-padding: 28px;
`;

export const ButtonMedium20 = styled(Button)`
  font-size: 14px;
  --button-horizontal-padding: 20px;
`;

export const ButtonBig = styled(Button)`
  font-size: 16px;
  --button-horizontal-padding: 20px;
`;

export const buttonRed = css`
  border-color: #c90606;
  background-color: #c90606;
  &:hover {
    color: #c90606;
    background-color: #ffffff;
  }
`;

export const buttonRedBorder = css`
  color: #c90606;
  border-color: #c90606;
  background-color: #ffffff;
  &:hover {
    color: #ffffff;
    background-color: #c90606;
  }
`;

export const buttonBlackBorder = css`
  color: #201f1f;
  border: 1px solid #131212;
  background-color: #ffffff;
  &:hover {
    color: #ffffff;
    background-color: #131212;
  }
`;

export const buttonTransparent = css`
  background-color: transparent;
`;

export const buttonFontNormal = css`
  background-color: transparent;
`;

export const buttonAddToCard = css`
  padding-right: calc(var(--button-horizontal-padding) + 7px);
  padding-left: calc(var(--button-horizontal-padding) + 26px);

  background-image: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 3.67853H9.469L9.719 2.67853H3.5V1.67853H10.36C10.436 1.67853 10.511 1.69586 10.5793 1.7292C10.6476 1.76253 10.7074 1.811 10.7542 1.87092C10.8009 1.93084 10.8334 2.00063 10.8491 2.07498C10.8649 2.14934 10.8635 2.2263 10.845 2.30003L9.595 7.30003C9.56791 7.40815 9.50548 7.50412 9.4176 7.5727C9.32973 7.64128 9.22146 7.67852 9.11 7.67853H2C1.86739 7.67853 1.74021 7.62585 1.64645 7.53208C1.55268 7.43831 1.5 7.31114 1.5 7.17853V1.17853H0.5V0.178528H2C2.13261 0.178528 2.25978 0.231206 2.35355 0.324974C2.44732 0.418743 2.5 0.54592 2.5 0.678528V3.67853ZM2.5 10.6785C2.23478 10.6785 1.98043 10.5732 1.79289 10.3856C1.60536 10.1981 1.5 9.94374 1.5 9.67853C1.5 9.41331 1.60536 9.15896 1.79289 8.97142C1.98043 8.78388 2.23478 8.67853 2.5 8.67853C2.76522 8.67853 3.01957 8.78388 3.20711 8.97142C3.39464 9.15896 3.5 9.41331 3.5 9.67853C3.5 9.94374 3.39464 10.1981 3.20711 10.3856C3.01957 10.5732 2.76522 10.6785 2.5 10.6785ZM8.5 10.6785C8.23478 10.6785 7.98043 10.5732 7.79289 10.3856C7.60536 10.1981 7.5 9.94374 7.5 9.67853C7.5 9.41331 7.60536 9.15896 7.79289 8.97142C7.98043 8.78388 8.23478 8.67853 8.5 8.67853C8.76522 8.67853 9.01957 8.78388 9.20711 8.97142C9.39464 9.15896 9.5 9.41331 9.5 9.67853C9.5 9.94374 9.39464 10.1981 9.20711 10.3856C9.01957 10.5732 8.76522 10.6785 8.5 10.6785Z' fill='white'/%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: left 15px center;
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.5 4H9.469L9.719 3H3.5V2H10.36C10.436 2 10.511 2.01733 10.5793 2.05067C10.6476 2.08401 10.7074 2.13248 10.7542 2.19239C10.8009 2.25231 10.8334 2.3221 10.8491 2.39645C10.8649 2.47081 10.8635 2.54778 10.845 2.6215L9.595 7.6215C9.56791 7.72962 9.50548 7.8256 9.4176 7.89417C9.32973 7.96275 9.22146 8 9.11 8H2C1.86739 8 1.74021 7.94732 1.64645 7.85355C1.55268 7.75978 1.5 7.63261 1.5 7.5V1.5H0.5V0.5H2C2.13261 0.5 2.25978 0.552678 2.35355 0.646447C2.44732 0.740215 2.5 0.867392 2.5 1V4ZM2.5 11C2.23478 11 1.98043 10.8946 1.79289 10.7071C1.60536 10.5196 1.5 10.2652 1.5 10C1.5 9.73478 1.60536 9.48043 1.79289 9.29289C1.98043 9.10536 2.23478 9 2.5 9C2.76522 9 3.01957 9.10536 3.20711 9.29289C3.39464 9.48043 3.5 9.73478 3.5 10C3.5 10.2652 3.39464 10.5196 3.20711 10.7071C3.01957 10.8946 2.76522 11 2.5 11ZM8.5 11C8.23478 11 7.98043 10.8946 7.79289 10.7071C7.60536 10.5196 7.5 10.2652 7.5 10C7.5 9.73478 7.60536 9.48043 7.79289 9.29289C7.98043 9.10536 8.23478 9 8.5 9C8.76522 9 9.01957 9.10536 9.20711 9.29289C9.39464 9.48043 9.5 9.73478 9.5 10C9.5 10.2652 9.39464 10.5196 9.20711 10.7071C9.01957 10.8946 8.76522 11 8.5 11Z' fill='%23c90606'/%3E%3C/svg%3E%0A");
  }
`;

export const buttonInCard = css`
padding-left: calc(var(--button-horizontal-padding) + 13px);

background-image: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.404 3.51942C10.368 3.46952 10.3232 3.42947 10.2727 3.40201C10.2223 3.37454 10.1675 3.36032 10.112 3.36033H7.80614V1.54216C7.80614 1.1805 7.68467 0.833655 7.46846 0.577925C7.25225 0.322195 6.959 0.178528 6.65323 0.178528H4.3474C4.04163 0.178528 3.74838 0.322195 3.53217 0.577925C3.31595 0.833655 3.19448 1.1805 3.19448 1.54216V3.36033H0.888656C0.83295 3.35958 0.777772 3.37317 0.726946 3.40015C0.676121 3.42713 0.630862 3.46686 0.594306 3.51658C0.557751 3.5663 0.530772 3.62483 0.515239 3.68811C0.499707 3.75139 0.495992 3.81791 0.504352 3.88305L1.22684 9.40575C1.25464 9.62252 1.34773 9.82011 1.48898 9.96211C1.63022 10.1041 1.81009 10.1809 1.99545 10.1785H9.01286C9.19822 10.1809 9.37809 10.1041 9.51933 9.96211C9.66058 9.82011 9.75367 9.62252 9.78147 9.40575L10.4963 3.88305C10.504 3.81816 10.4997 3.75206 10.4838 3.6893C10.4679 3.62654 10.4407 3.56858 10.404 3.51942V3.51942ZM3.96309 1.54216C3.96309 1.4216 4.00358 1.30599 4.07565 1.22075C4.14773 1.1355 4.24547 1.08761 4.3474 1.08761H6.65323C6.75515 1.08761 6.8529 1.1355 6.92497 1.22075C6.99704 1.30599 7.03753 1.4216 7.03753 1.54216V3.36033H3.96309V1.54216ZM9.01286 9.26938H1.98777L1.33829 4.26941H9.66233L9.01286 9.26938Z' fill='%23C90606'/%3E%3C/svg%3E%0A");
background-repeat: no-repeat;
background-position: left 5px center;
&:hover {
  background-image: url("data:image/svg+xml,%3Csvg width='11' height='11' viewBox='0 0 11 11' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.404 3.51942C10.368 3.46952 10.3232 3.42947 10.2727 3.40201C10.2223 3.37454 10.1675 3.36032 10.112 3.36033H7.80614V1.54216C7.80614 1.1805 7.68467 0.833655 7.46846 0.577925C7.25225 0.322195 6.959 0.178528 6.65323 0.178528H4.3474C4.04163 0.178528 3.74838 0.322195 3.53217 0.577925C3.31595 0.833655 3.19448 1.1805 3.19448 1.54216V3.36033H0.888656C0.83295 3.35958 0.777772 3.37317 0.726946 3.40015C0.676121 3.42713 0.630862 3.46686 0.594306 3.51658C0.557751 3.5663 0.530772 3.62483 0.515239 3.68811C0.499707 3.75139 0.495992 3.81791 0.504352 3.88305L1.22684 9.40575C1.25464 9.62252 1.34773 9.82011 1.48898 9.96211C1.63022 10.1041 1.81009 10.1809 1.99545 10.1785H9.01286C9.19822 10.1809 9.37809 10.1041 9.51933 9.96211C9.66058 9.82011 9.75367 9.62252 9.78147 9.40575L10.4963 3.88305C10.504 3.81816 10.4997 3.75206 10.4838 3.6893C10.4679 3.62654 10.4407 3.56858 10.404 3.51942V3.51942ZM3.96309 1.54216C3.96309 1.4216 4.00358 1.30599 4.07565 1.22075C4.14773 1.1355 4.24547 1.08761 4.3474 1.08761H6.65323C6.75515 1.08761 6.8529 1.1355 6.92497 1.22075C6.99704 1.30599 7.03753 1.4216 7.03753 1.54216V3.36033H3.96309V1.54216ZM9.01286 9.26938H1.98777L1.33829 4.26941H9.66233L9.01286 9.26938Z' fill='white'/%3E%3C/svg%3E%0A");
}
`;

export const buttonUp = css`
  padding-top: 9px;
  padding-bottom: 9px;
  padding-left: calc(var(--button-horizontal-padding) + 13px);

  background-image: url("data:image/svg+xml,%3Csvg width='21' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.30749 7.31736a.62483.62483 0 0 1-.13589-.20296.624948.624948 0 0 1 0-.47908.62483.62483 0 0 1 .13589-.20296l3.75001-3.75c.058-.0582.127-.10438.2029-.13589.076-.03151.1574-.04773.2396-.04773s.1636.01622.2395.04773c.076.03151.1449.07769.203.13589l3.75 3.75c.1173.11736.1833.27653.1833.4425s-.066.32514-.1833.4425c-.1174.11736-.2765.18329-.4425.18329-.166 0-.3252-.06593-.4425-.18329L10.5 4.00861 7.19249 7.31736a.625148.625148 0 0 1-.20296.13589.624948.624948 0 0 1-.47908 0 .624935.624935 0 0 1-.20296-.13589z' fill='%23C90606'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 17.5c-.1658 0-.3247-.0658-.4419-.1831a.62469.62469 0 0 1-.1831-.4419V3.75a.62487.62487 0 0 1 .1831-.44194A.624819.624819 0 0 1 10.5 3.125c.1658 0 .3247.06585.4419.18306.1173.11721.1831.27618.1831.44194v13.125c0 .1658-.0658.3247-.1831.4419-.1172.1173-.2761.1831-.4419.1831z' fill='%23C90606'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: left 5px center;
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='21' height='20' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M6.30749 7.31736a.62483.62483 0 0 1-.13589-.20296.624948.624948 0 0 1 0-.47908.62483.62483 0 0 1 .13589-.20296l3.75001-3.75c.058-.0582.127-.10438.2029-.13589.076-.03151.1574-.04773.2396-.04773s.1636.01622.2395.04773c.076.03151.1449.07769.203.13589l3.75 3.75c.1173.11736.1833.27653.1833.4425s-.066.32514-.1833.4425c-.1174.11736-.2765.18329-.4425.18329-.166 0-.3252-.06593-.4425-.18329L10.5 4.00861 7.19249 7.31736a.625148.625148 0 0 1-.20296.13589.624948.624948 0 0 1-.47908 0 .624935.624935 0 0 1-.20296-.13589z' fill='%23ffffff'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.5 17.5c-.1658 0-.3247-.0658-.4419-.1831a.62469.62469 0 0 1-.1831-.4419V3.75a.62487.62487 0 0 1 .1831-.44194A.624819.624819 0 0 1 10.5 3.125c.1658 0 .3247.06585.4419.18306.1173.11721.1831.27618.1831.44194v13.125c0 .1658-.0658.3247-.1831.4419-.1172.1173-.2761.1831-.4419.1831z' fill='%23ffffff'/%3E%3C/svg%3E");
  }
`;

export const HiddenSpan = styled.span`${visuallyHidden}`;

// close BTN

export const DeleteBtn = styled.button.attrs({ type: 'button' })`
  position: relative;
  grid-area: button;
  width: 14px;
  height: 14px;
  padding: 0;
  color: #585757;
  border: none;
  background-color: transparent;
  cursor: pointer;
  transition: outline-color 0.3s ease;
  transition: color 0.3s ease;
  &:hover {
    color: #c90606;
  }
  &:focus {
    color: #c90606;
    outline: none;
  }
`;

export const IconBtn = styled.span`
  &::before,
  &::after {
    top: 6.5px;
    left: -1.5px;
    position: absolute;
    width: 17px;
    height: 1px;
    background-color: currentColor;
    content: "";
  }

  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }`;

export const IconBtnInteractive = styled.span`
  position: relative;
  ::before {
  top: 50%;
  left: 50%;
  position: absolute;

  width: 50px;
  height: 50px;

  content: "";
  transform: translate(-50%, -50%);
}`;
