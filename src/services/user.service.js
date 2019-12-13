import gql from "graphql-tag";
import { client, getClient } from "data/client/apolloClient";

export const userService = {
  login,
  logout,
  register,
  getAllUsers,
  getAll,
  getById,
  update,
  delete: _delete
};

function login(username, password) {
  const MUTATION = gql`
    mutation($email: String, $password: String) {
      login(input: { email: $email, password: $password }) {
        id
        email
        token
        admin
      }
    }
  `;
  return client
    .mutate({
      mutation: MUTATION,
      variables: { email: username, password: password }
    })
    .then(result => {
      const {
        data: { login = {} }
      } = result;
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(login));
      return login;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

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
  // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getAllUsers() {
  const QUERY = gql`
    query {
      users {
        id
        email
        name
        surname
        admin
      }
    }
  `;

  return getClient()
    .query({ query: QUERY })
    .then(result => {
      const {
        data: { users = {} }
      } = result;

      return users;
    });
  // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(userId) {
  const QUERY = gql`
  query($userId: Int) {
    users(id: $userId)  {
      id
      email
      name
      surname
      admin
    }
  }
`;

return getClient()
  .query({ query: QUERY, variables: { id: userId } })
  .then(result => {
    const {
      data: { users = {} }
    } = result;
    return users;
  });
}

function register(user) {
  const {
    firstName,
    lastName,
    password,
    username
  } = user;

 
  const enhanceUser = {
    name: firstName,
    surname: lastName,
    email: username,
    password,
  };


  const MUTATION = gql`
    mutation($input: UserInputType) {
      createUser(input: $input) {
        id
        email
        token
      }
    }
  `;
  return getClient()
    .mutate({ mutation: MUTATION, variables: { input: { ...enhanceUser } } })
    .then(result => {
     
      const {
        data: { user = {} }
      } = result;
     
      return user;
    });
}

function update(users) {
  const {
    id,
  name,
  email,
  admin,
  } = users;
  const enhanceUser = {
    id,
    name,
    email,
    admin,
  };

  const MUTATION = gql`
    mutation($input: UpdateUserInputType) {
      updateUser(input: $input) {
        id
        email
        name
        surname
        admin
      }
    }
  `;

  return getClient()
    .mutate({ mutation: MUTATION, variables: { input: { ...enhanceUser } } })
    .then(result => {
      const {
        data: { users = {} }
      } = result;

      return users;
    });
}

// prefixed function name with underscore because delete is a reserved word in javascript

function _delete(id) {
  const MUTATION = gql`
    mutation($users_id: Int) {
      deleteEvents(users_id: $users_id)
    }
  `;

  return getClient()
    .mutate({ mutation: MUTATION, variables: { users_id: id } })
    .then(() => {
      return id;
    })
    .catch(() => {
      return id;
    });
}

