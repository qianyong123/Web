import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import loadable from './util/loadable'
import './App.less';
import router from './router'
import Headers from '@/components/Header'
import Footers from '@/components/Footer'

const Home = loadable(() => import('./pages/Home'))
const Error = loadable(() => import('./pages/Error'))
const Login = loadable(() => import('./pages/Login'))

const { Footer, Content } = Layout;


class App extends React.Component {


  componentDidMount() {
    const token = '11'
    console.log('首次渲染', this.props)
    // this.props.history('/login')
  }



  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          {
            router.map(r => {
              return (
                <Route key={r.path} path={r.path} component={r.component} />
              )
            })
          }
          {/* <Route path="/Admin" component={Admin} /> */}
          <Route path="/error" component={Error} />
          <Redirect form="*" to="/" />
        </Switch>

      </Router>



    )
  }
}



export default App;
