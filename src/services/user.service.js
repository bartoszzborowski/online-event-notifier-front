import gql from 'graphql-tag';
import {client, getClient} from 'data/client/apolloClient';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
};

function login(username, password) {
    const MUTATION = gql`
        mutation($email: String, $password: String) {
          login(
            input: { email: $email, password: $password }
          ) {
            id
            email
            token
            admin
          }
        }
    `;
    return client
        .mutate({mutation: MUTATION, variables: {email: username, password: password}})
        .then(result => {
            const {data: {login = {}}} = result;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(login));
            return login;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const QUERY = gql`
        query {
          users{
            id
            email
            token
          }
        }
    `;

    return getClient().query({query: QUERY});
    // return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function getById(id) {
   return null;
}

function register(user) {
    return null;
}

function update(user) {
    return null;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return null;
}
