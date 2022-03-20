import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { APPRoute } from '../../const';

const TitleRoute: {[key: string]: string} = {
  [APPRoute.Cart]: 'Корзина',
  [APPRoute.Main]: 'Главная',
  [APPRoute.Catalog]: 'Каталог',
};


const BreadCrumbLi = styled.li`
  display: flex;
  align-items: center;
  margin-right: 12px;
  & a:focus {
    outline: 1px solid #c90606;
    outline-offset: 1px;
  }
  &:not(:last-child)::after {
    display: block;

    width: 15px;
    height: 9px;
    margin-left: 12px;

    background-image: url("data:image/svg+xml,%3Csvg width='16' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M10.6825.807518c.058-.058204.127-.104383.2029-.135891.076-.031508.1574-.047726.2396-.047726s.1636.016218.2395.047726c.076.031508.1449.077687.203.135891l3.75 3.750002a.625017.625017 0 0 1 .1359.20296.625106.625106 0 0 1 .0477.23954c0 .08221-.0162.16361-.0477.23954a.625017.625017 0 0 1-.1359.20296l-3.75 3.75c-.1174.11736-.2765.18329-.4425.18329-.166 0-.3252-.06593-.4425-.18329-.1174-.11736-.1833-.27653-.1833-.4425s.0659-.32514.1833-.4425l3.3087-3.3075-3.3087-3.3075a.625017.625017 0 0 1-.1359-.20296.625106.625106 0 0 1-.0477-.23954c0-.08221.0162-.16361.0477-.23954a.62494.62494 0 0 1 .1359-.202962z' fill='%23131212'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M.5 5c0-.16576.065848-.32473.183058-.44194C.800269 4.44085.95924 4.375 1.125 4.375H14.25c.1658 0 .3247.06585.4419.18306.1173.11721.1831.27618.1831.44194 0 .16576-.0658.32473-.1831.44194a.624819.624819 0 0 1-.4419.18306H1.125c-.16576 0-.324731-.06585-.441942-.18306C.565848 5.32473.5 5.16576.5 5z' fill='%23131212'/%3E%3C/svg%3E");
    background-position: center;

    content: "";
  }
  &:last-child {
    color: #585757;
  }
  &:last-child a {
    pointer-events: none;
  }
`;


const BreadcrumbLink = styled(Link)`
  font: inherit;
  color: inherit;
  cursor: pointer;
  transition: color 0.3s ease;
  &:hover {
    color: #c90606;
  }
`;

type BreadCrumbProps = {
  type: string,
  name?: string,
}


export default function Breadcrumb({type, name = ''} : BreadCrumbProps): JSX.Element {
  const title = name ? name : TitleRoute[type];
  const to = name ? `${type}/${name}` : type;
  return (
    <BreadCrumbLi>
      <BreadcrumbLink to={to}>
        {title}
      </BreadcrumbLink>
    </BreadCrumbLi>
  );
}
