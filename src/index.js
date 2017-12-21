import 'babel-polyfill';
import $RefParser from 'json-schema-ref-parser';
// import browserHistory from 'history/createBrowserHistory';
import './index.less';
import yaml from './petstore.yaml';
import { bootstrap } from './framework';

bootstrap(document.getElementById('root'));

$RefParser.dereference(yaml)
  .then((schema) => {
    window.schema = schema;

    bootstrap(document.getElementById('root'));
  });
