import gql from "graphql-tag";
import client, { getClient } from "data/client/apolloClient";

export const eventService = {
  create,
  getAll,
  attendToEvent,
  getById,
  update,
  getByUser,
  search,
  delete: _delete
};

function search(parameters) {
  const QUERY = gql`
    query(
      $name: String
      $date: String
      $city_id: EnumCityTypesType
      $event_type: EnumEventTypesType
      $entry_fee: Float
    ) {
      searchEvents(
        name: $name
        date: $date
        city_id: $city_id
        event_type: $event_type
        entry_fee: $entry_fee
      ) {
        id
        event_type
        user_id
        address
        city_id
        name
        description
        fee
        event_date
        attendance_counter
      }
    }
  `;

  return client
    .query({ query: QUERY, variables: { ...parameters } })
    .then(result => {
      const {
        data: { searchEvents = {} }
      } = result;

      return searchEvents;
    });
}

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
        city_id
        name
        description
        fee
        event_date
        attendance_counter
        lat
        lng
      }
    }
  `;

  return client.query({ query: QUERY }).then(result => {
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
    entryFee,
    latitude,
    longitude,
  } = event;
  const enhanceEvent = {
    address: address,
    city_id: city_id,
    description,
    event_date,
    event_type: type,
    fee: entryFee,
    name,
    lat:latitude,
    lng:longitude,
  };

  const MUTATION = gql`
    mutation($input: EventInputType) {
      createEvent(input: $input) {
        id
        event_type
        user_id
        address
        city_id
        name
        description
        fee
        event_date
        lat
        lng
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
        city_id
        name
        description
        fee
        event_date
        lat
        lng
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
        attendance_counter
        lat
        lng
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
    entryFee,
    latitude,
    longitude,
  } = event;
  const enhanceEvent = {
    id,
    address: address,
    city_id: city_id,
    description,
    event_date,
    event_type: type,
    fee: entryFee,
    name,
    lat:latitude,
    lng:longitude,
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
        lat
        lng
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
