import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import { RootState, Dispatch } from '@/store';

function RouterComponent(): JSX.Element {
  const dispatch = useDispatch<Dispatch>();
  const userInModel = useSelector((state: RootState) => state.global.userInfo);
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo && Object.keys(userInModel).length === 0) {
      dispatch.global.updateState({
        userInfo: JSON.parse(userInfo),
      });
    }
  }, [dispatch.global, userInModel]);

  const handleEnter = useCallback((Component, props) => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      return <Component {...props} />;
    }
    return <Redirect to="/user/login" />;
  }, []);

  return (
    <Router>
      <Route
        render={(): JSX.Element => {
          return (
            <Switch>
              <Route path="/user" component={UserLayout} />
              <Route path="/" render={(props): JSX.Element => handleEnter(BasicLayout, props)} />
            </Switch>
          );
        }}
      />
    </Router>
  );
}

export default RouterComponent;
