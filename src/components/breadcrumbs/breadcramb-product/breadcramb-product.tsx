import { Link } from 'react-router-dom';
import { APPRoute } from '../../../const';


export default function BreadcrumbProduct({name} : {name: string}): JSX.Element {
  return (
    <li className="breadcrumbs__item">
      <Link className="link" to={APPRoute.Guitars}>
        {name}
      </Link>
    </li>
  );
}
