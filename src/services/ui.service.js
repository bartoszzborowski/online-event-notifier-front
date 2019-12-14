import gql from "graphql-tag";
import { client } from "data/client/apolloClient";

export const uiService = {
  getEventTypes,
  getLocations
};

function getLocations() {
  const QUERY = gql`
    query {
      locations {
        id
        name
        slug
      }
    }
  `;

  return client.query({ query: QUERY }).then(result => {
    const {
      data: { locations = {} }
    } = result;

    return locations;
  });
}

function getEventTypes() {
  const QUERY = gql`
    query {
      eventType {
        id
        name
      }
    }
  `;

  return client.query({ query: QUERY }).then(result => {
    const {
      data: { eventType = {} }
    } = result;
    return eventType;
  });
}
