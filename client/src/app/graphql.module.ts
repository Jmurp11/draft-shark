import { NgModule } from '@angular/core';
import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { HttpClientModule } from '@angular/common/http';
import { onError } from '@apollo/client/link/error';
import { InMemoryCache } from '@apollo/client/core';
import { AuthStoreService } from './auth/auth-store.service';

const environment = {
  production: false,
  graphQLEndpoint: 'http://127.0.0.1:4000/graphql', // use 10.0.2.2 instead of localhost when running android emulator
  baseRoutePath: '',
  appVersion: 1.0
};

@NgModule({
  imports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink, authStoreService: AuthStoreService) => {
        const http = httpLink.create({
          uri: environment.graphQLEndpoint,
          withCredentials: true,
        });
        const error = onError(({ graphQLErrors, networkError }) => {
          if (graphQLErrors) {
            graphQLErrors.map(({ message, locations, path, extensions }) => {
              console.table({
                message,
                locations,
                path,
                extensions,
              });
              if (message === 'not authenticated') {
                authStoreService?.logout();
              }
            });
          } else if (networkError) {
            console.log(networkError);
          }
        });
        const link = error.concat(http);

        return {
          link,
          cache: new InMemoryCache({
            typePolicies: {
              Folder: {
                fields: {
                  notes: {
                    merge(existing = [], incoming: any[]) {
                      return [...existing, ...incoming];
                    },
                  },
                },
              },
              User: {
                fields: {
                  folders: {
                    merge(existing = [], incoming: any[]) {
                      return [...existing, ...incoming];
                    },
                  },
                },
              }
            },
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule { }
