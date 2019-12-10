import gql from "graphql-tag";
import { getClient } from "data/client/apolloClient";

export const eventService = {
  create,
  getAll,
  getById,
  update,
  getByUser,
  delete: _delete
};

function getAll() {
  const QUERY = gql`
    query {
      users {
        id
        email
        token
      }
    }
  `;

  return getClient().query({ query: QUERY });
}

function create(event) {
  const { name, event_date, location, type, description, entryFee } = event;
  const enhanceEvent = {
    address: location,
    city_id: location,
    description,
    event_date,
    event_type: type,
    fee: entryFee,
    name
  };

  const MUTATION = gql`
    mutation($input: EventInputType) {
      createEvent(input: $input) {
        id
        event_type
        user_id
        address
        name
        description
        fee
        event_date
      }
    }
  `;

  return getClient()
    .mutate({ mutation: MUTATION, variables: { input: { ...enhanceEvent } } })
    .then(result => {
      const {
        data: { event = {} }
      } = result;

      return event;
    });
}

function getById(id) {
  const QUERY = gql`
    query($id: Int) {
      events(id: $id) {
        id
        event_type
        user_id
        address
        name
        description
        fee
        event_date
      }
    }
  `;

  return getClient().query({ query: QUERY, variables: { id } });
}

function getByUser() {
  const QUERY = gql`
    query {
      events(byUser: true) {
        id
        event_type
        user_id
        address
        name
        description
        fee
        event_date
        city_id
      }
    }
  `;

  return getClient()
    .query({ query: QUERY })
    .then(result => {
      const {
        data: { events = {} }
      } = result;

      return events;
    });
}

function update(event) {
  const { id, name, event_date, location, type, description, entryFee } = event;
  const enhanceEvent = {
    id,
    address: location,
    city_id: location,
    description,
    event_date,
    event_type: type,
    fee: entryFee,
    name
  };

  const MUTATION = gql`
    mutation($input: UpdateEventInputType) {
      updateEvent(input: $input) {
        id
        event_type
        user_id
        city_id
        address
        name
        description
        fee
        event_date
      }
    }
  `;

  return getClient()
    .mutate({ mutation: MUTATION, variables: { input: { ...enhanceEvent } } })
    .then(result => {
      const {
        data: { event = {} }
      } = result;

      return event;
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return null;
}
