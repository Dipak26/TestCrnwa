import { Platform } from 'react-native';
import history      from './RouteHistory';
import urls         from './urls.js';
import { generatePath } from "react-router";
 
export default class RouteActions {
  static pop() {
    setTimeout(() => {
      history.goBack();
    }, 1);
    return null;
  }
 
  static base(componentProps = {}) {
    history.push('', componentProps);
  }
 
  static post(componentProps) {
    const url = generatePath(urls.post, {postId: componentProps.postId});
    history.push(url, componentProps);
  }
 
  static posts(componentProps = {}) {
    history.push(urls.posts, componentProps);
  }
 
  static refresh(componentProps = {}) {
    history.replace(history.location.pathname, componentProps);
  }
 
  static replace(route, componentProps = {}) {
    history.replace(route, componentProps);
  }
 
  static jump(route, componentProps) {
    history.push(route, componentProps);
  }
}