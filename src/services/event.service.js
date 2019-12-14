import gql from "graphql-tag";
import { getClient } from "data/client/apolloClient";

export const eventService = {
  create,
  getAll,
  attendToEvent,
  getById,
  update,
  getByUser,
  delete: _delete
};


function attendToEvent(userId, eventId) {
  const MUTATION = gql`
    mutation($userId: Int, $eventId: Int) {
      attendToEvent(event_id: $eventId, user_id: $userId) {
        id
        user_id
        event_id
      }
    }
  `;

  return getClient()
    .mutate({ mutation: MUTATION, variables: { userId, eventId } })
    .then(result => {
      const {
        data: { attendToEvent = {} }
      } = result;

      return attendToEvent;
    });
}

function getAll() {
  const QUERY = gql`
  query {
    events {
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
  .query({ query: QUERY })
  .then(result => {
    const {
      data: { events = {} }
    } = result;

    return events;
  });
}

function create(event) {
  const {
    name,
    event_date,
    address,
    city_id,
    type,
    description,
    entryFee
  } = event;
  const enhanceEvent = {
    address: address,
    city_id: city_id,
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
        attendance_counter
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
  const {
    id,
    name,
    event_date,
    address,
    city_id,
    type,
    description,
    entryFee
  } = event;
  const enhanceEvent = {
    id,
    address: address,
    city_id: city_id,
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

function _delete(id) {
  const MUTATION = gql`
    mutation($event_id: Int) {
      deleteEvents(event_id: $event_id)
    }
  `;

  return getClient()
    .mutate({ mutation: MUTATION, variables: { event_id: id } })
    .then(() => {
      return id;
    })
    .catch(() => {
      return id;
    });
}
