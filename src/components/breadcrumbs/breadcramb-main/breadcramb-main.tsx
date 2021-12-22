import { Link } from 'react-router-dom';
import { APPRoute, PageName } from '../../../const';


export default function BreadcrumbMain(): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link className="link" to={APPRoute.Main}>
        {PageName.Main}
      </Link>
    </li>
  );
}
