import { Link, useLocation } from 'react-router-dom';
import { APPRoute } from '../../const';


const CLASS_CURRENT = 'link--current';


export default function HeaderNav(): JSX.Element {

  const location = useLocation();

  return (
    <nav className="main-nav">
      <ul className="main-nav__list">
        <li>
          <Link className={`link main-nav__link ${location.pathname === APPRoute.Catalog ? CLASS_CURRENT : ''}`} to={APPRoute.Catalog}>Каталог</Link>
        </li>
        <li>
          <Link className="link main-nav__link" to={APPRoute.Contacts}>Где купить?</Link>
        </li>
        <li>
          <Link className="link main-nav__link" to={APPRoute.Info}>О компании</Link>
        </li>
      </ul>
    </nav>
  );
}
