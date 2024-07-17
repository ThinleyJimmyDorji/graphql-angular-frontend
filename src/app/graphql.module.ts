import { NgModule } from '@angular/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink, from } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';

const uri = 'https://graphql.anilist.co'; // Replace with your GraphQL endpoint

const removeTypeNames = (obj: Record<string, any>) => {
  for (let key in obj) {
    if (key === '__typename') {
      delete obj[key];
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      removeTypeNames(obj[key]);
    }
  }
};

const cleanTypenameLink = new ApolloLink((operation, forward) => {
  const def = getMainDefinition(operation.query);
  // @ts-ignore
  if (def && def['operation'] === 'mutation') {
    removeTypeNames(operation.variables);
  }
  return forward ? forward(operation) : null;
});

export function createApollo(httpLink: HttpLink): any {
  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
    return forward(operation);
  });

  return {
    link: from([authLink, cleanTypenameLink, httpLink.create({ uri })]),
    cache: new InMemoryCache(),
  };
}

export function getAccessToken(): string {
  // Implement your logic to retrieve the access token from storage or wherever you store it
  // For example, you might store it in localStorage or a service
  return localStorage.getItem('access_token') || '';
}

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
