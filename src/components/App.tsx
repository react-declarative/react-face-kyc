import React from 'react';

import { Switch } from 'react-declarative';
import { CssBaseline } from '@mui/material';

import routes from '../config/routes';

import history from '../history';

const Fragment = () => <></>;

export const App = () => (
  <>
    <CssBaseline />
    <Switch
      Loader={Fragment}
      history={history}
      items={routes}
      throwError
    />
  </>
);

export default App;
