import { combineReducers } from 'redux';

export default combineReducers({
  article: require('./article'),
  blog: require('./article')
});