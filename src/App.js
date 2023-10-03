// import { Login } from './page/Login';
import { ViewSpecificReport } from './Components/ViewSpecificReport';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

function App() {
  return (
   <Router>
    <div>
   <ViewSpecificReport />
   {/* < Login /> */}
    </div>
   </Router>
  );
}

export default App;
