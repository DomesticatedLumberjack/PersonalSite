import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import './custom.css'
import BlogDashboard from '../components/Blog/BlogDashboard';
import { AdminDashboard } from '../components/Admin/AdminDashboard';
import BlogForm from '../components/Form/BlogForm';
import Login from '../components/Login/Login';
import { ToastContainer } from 'react-toastify';
import { NavMenu } from '../components/NavMenu/NavMenu';
import { Container } from 'react-bootstrap';
import PrivateRoute from './PrivateRoute';
import Resume from '../components/Resume/Resume';
import { Register } from '../components/Register/Register';

const App = () => {
  return(
    <>
      <ToastContainer position='bottom-right' hideProgressBar />
      <NavMenu />
      <Container style={{ marginTop: '3em' }}>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/blog' component={BlogDashboard} />
          <PrivateRoute exact path='/admin' component={AdminDashboard}/>
          <Route path={['/admin/createpost', '/admin/managepost/:id'] } component={BlogForm}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/resume' component={Resume}/>
        </Switch>
      </Container>
    </>
  );
}

export default App;
