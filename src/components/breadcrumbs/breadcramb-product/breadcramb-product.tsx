import { Link } from 'react-router-dom';
import { APPRoute, PageName } from '../../../const';


export default function BreadcrumbProduct(): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link className="link" to={APPRoute.Guitars}>
        {PageName.Product}
      </Link>
    </li>
  );
}
