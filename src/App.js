import logo from './logo.svg'
import './App.css'
import Users from './components/Users'
import 'bootstrap/dist/css/bootstrap.min.css'
import * as type from '../src/redux/types'

function App() {
  return (
    <div className="App">
      <Users />
    </div>
  );
}

export default App;
