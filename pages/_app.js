import '../styles/globals.css'
import MainLayout from '../layouts/main';
import { ApolloProvider, ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { onError } from "apollo-link-error";

const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  uri: 'https://emile-prototype.appspot.com/graphql',
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </ApolloProvider>
  )
}

export default MyApp
