import { Link } from 'react-router-dom';
import { APPRoute, PageName } from '../../../const';


export default function BreadcrumbCatalog(): JSX.Element {

  return (
    <li className="breadcrumbs__item">
      <Link className="link" to={APPRoute.Catalog}>
        {PageName.Catalog}
      </Link>
    </li>
  );
}
