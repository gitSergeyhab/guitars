import { Link } from 'react-router-dom';
import { APPRoute } from '../../const';


export default function NotFoundPage(): JSX.Element {
  return (
    <main className="page-content">
      <div style={{textAlign: 'center', fontSize: '1.7em', fontWeight: '700', paddingTop: '15%', paddingBottom: '15%'}}>
        Error 404
        <br/>
        Page Not Found
        <br/><br/>
        <Link to={APPRoute.Main} style={{color: 'orange', fontSize: '1.4em', paddingTop: '15%'}}>
          Main Page
        </Link>
      </div>
    </main>
  );
}
