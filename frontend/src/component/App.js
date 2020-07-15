import React from 'react';
import './App.css';
import { Switch, Route, BrowserRouter, Link, Redirect } from 'react-router-dom'
import LandingPage from './LandingPage/LandingPage'
import Register from './LandingPage/Register'
import Login from './LandingPage/Login'
import Body from './BodyPage/Body'
import PeopleSub from './BodyPage/PeopleSub/PeopleSub'
import General from './BodyPage/PeopleSub/General'
import Information from './BodyPage/PeopleSub/Information'
import Compensation from './BodyPage/PeopleSub/Compensation'
import People from './BodyPage/People'
import TimeStamp from './BodyPage/Timestamp'
import Leaves from './BodyPage/Leaves'
import RegisterAdmin from './LandingPage/RegisterAdmin'
import BodyAdmin from './AdminBodyPage/BodyAdmin'
import Department from './AdminBodyPage/Department'
import TimestampAdmin from './AdminBodyPage/TimestampAdmin'
import CreateDepartment from './AdminBodyPage/CreateDepartment'
import LeavesAdmin from './AdminBodyPage/LeavesAdmin'
import * as Scroll from 'react-scroll'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/home" component={LandingPage} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/People" component={People} />
          <Route exact path="/TimeStamp" component={TimeStamp} />
          <Route exact path="/Leaves" component={Leaves} />
          <Route exact path="/people/general" component={General} />
          <Route exact path="/people/Compensation" component={Compensation} />
          <Route exact path="/people/Information" component={Information} />
          <Route exact path="/register/admin" component={RegisterAdmin} />
          <Route exact path="/admin" component={BodyAdmin} />
          <Route exact path="/admin/Department" component={Department} />
          <Route exact path="/admin/Timestamp" component={TimestampAdmin} />
          <Route exact path="/admin/CreateDepartment" component={CreateDepartment} />
          <Route exact path="/admin/Leaves" component={LeavesAdmin} />
          <Redirect to="/home" />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}

export default App;