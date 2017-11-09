import Fetchable from './fetchable';
import Constants from './constants';

let singleton = null;

export default class Auth extends Fetchable {
  private static _instance: Auth;

  constructor() {
    super();

    if (!Auth._instance) {
      Auth._instance = new Auth();
      return this;
    }
  }

  register(username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string): Promise<object> {
    return super.post('/register', {
        body: this.toForm({
          username,
          password,
          email,
          firstName,
          lastName
        })
      })
      .then((json: any) => {
        return this.setUser(json);
      });
  }

  login(username: string, password: string): Promise<object> {
    return super.post('/auth/credentials', {
        body: this.toForm({
          username,
          password
        })
      })
      .then((json: any) => {
        return this.setUser(json);
      });
  }

  logout(): Promise<object> {
    return super.delete('/auth/credentials');
  }

  setUser(response: any) {
    const isAuthenticated = !!response.sessionId;
    const user = {
      isAuthenticated: false,
      userName: '',
      sessionId: 0,
      userId: 0
    };

    if (isAuthenticated) {
      user.userName = response.userName;
      user.sessionId = response.sessionId;
      user.userId = response.userId;
    }
    return user;
  }

  profile(): Promise<object> {
    return super.get('/api/v1/me')
      .then((json: any) => json.result);
  }

  forgotPassword(email: string): Promise<object> {
    return super.post('/api/v1/password/forgot', {
        body: this.toForm({
          email
        })
      })
      .then((json: any) => {
        return json;
      });
  }

  resetPassword(
    email: string,
    token: string,
    password: string,
    passwordRepeat: string): Promise<object> {
    return super.post('/api/v1/password/reset', {
      body: this.toForm({
        email,
        token,
        password,
        passwordRepeat
      })
    });
  }
}
