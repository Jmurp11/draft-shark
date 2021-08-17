import { Injectable } from '@angular/core';
import { StoreState } from '../AppStore';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApolloAngularSDK, LoginDocument, LoginInput, MeDocument, RegisterInput } from '../sdk/generated/graphql';
import { User } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService extends ObservableStore<StoreState> {
  private tokenExpirationTimer: any;

  constructor(
    private apolloSdk: ApolloAngularSDK,
    private router: Router
  ) {
    super({ trackStateHistory: true, logStateChanges: true });
    const initalState = {
      currentUser: null
    };
    this.setState(initalState, 'INIT_AUTH_STATE');
  }

  getCurrentUser(): Observable<User> {
    const currentUser = this.getState().currentUser;
    if (currentUser) {
      return of(currentUser);
    }
    return this.apolloSdk.meWatch(
      null,
      {
        fetchPolicy: 'network-only'
      }
    ).valueChanges.pipe(
      map(res => {
        if (!res.data.me) {
          return null;
        }

        const meResult = {
          id: res.data?.me.id,
          username: res.data?.me.username,
          email: res.data?.me.email,
          isAdmin: res.data?.me.isAdmin,
          profileImage: res.data?.me.profileImage
        };
        this.setState({ currentUser: meResult }, 'GET_CURRENT_USER');
        return meResult;
      }),
    );
  }

  login(email: string, password: string): any {
    const input: LoginInput = {
      email,
      password
    };

    return this.apolloSdk.login({ data: input },
      {
        refetchQueries: [
          {
            query: MeDocument
          }
        ]
      }
    ).pipe(
      map((res: any) => {
        if (res.data.login.success) {
          this.setState({ currentUser: res.data.login.success.user }, 'LOGIN');
          this.router.navigate(['/tabs/tab1']);
        }
        return res;
      })
    );
  }

  logout(): Subscription {
    return this.apolloSdk.logout()
      .subscribe(() => {
        this.setState({ currentUser: null }, 'LOGOUT');
        this.router.navigateByUrl('/auth/login');
      });
  }

  register(email: string, password: string, username: string, profileImage: string): any {
    const input: RegisterInput = {
      email,
      username,
      password,
      profileImage
    };

    return this.apolloSdk.register({ data: input },
      {
        refetchQueries: [
          {
            query: LoginDocument,
            variables: {
              email,
              password
            }
          },
          {
            query: MeDocument
          }
        ]
      }
    ).pipe(
      map((res: any) => {
        this.setState({ currentUser: res.data.register.success.user }, 'REGISTER');
        this.router.navigate(['/tabs/tabs1']);
        return res;
      })
    );
  }
}
