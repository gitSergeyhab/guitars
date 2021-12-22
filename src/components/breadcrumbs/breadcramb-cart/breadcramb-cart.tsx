import { Link } from 'react-router-dom';
import { APPRoute, PageName } from '../../../const';


export default function BreadcrumbCart(): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link className="link" to={APPRoute.Cart}>
        {PageName.Cart}
      </Link>
    </li>
  );
}
