import React from "react";
import { TopNavigation } from "../../components/TopNavigation";
import { faEdit, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Field, Formik } from "formik";
import ModalDeleteUser from "../../components/ModalDeleteUser/ModalDeleteUser";
import { connect } from "react-redux";
import { userActions } from "stores/actions";

class AdminUsersPage extends React.Component {
  componentDidMount() {
    const { getAllUsersConst } = this.props;
    if (getAllUsersConst) {
      getAllUsersConst();
    }
  }
  render() {
    const {
      users,
      loading,
      match: {
        params: { userId }
      }
    } = this.props;
    return (
      <>
        <TopNavigation />
        <div className={"container-fluid"}>
          <div className={"row"} style={{ marginTop: "5rem" }}>
            <div className={"col-12"}>
              <div className={"card"}>
                <Formik
                  initialValues={{
                    id: "",
                    email: "",
                    isAdmin: ""
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                      alert(JSON.stringify(values, null, 2));
                      setSubmitting(false);
                    }, 400);
                  }}
                >
                  {({ setFieldValue, values, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <div className={"card-header p-2"}>Search criteria</div>
                      <div className={"card-body p-2"}>
                        <div className={"form-row"}>
                          <div className={"col-sm-4 col-md-3"}>
                            <div className="form-group">
                              <label htmlFor="id">ID</label>
                              <Field
                                type="number"
                                name="id"
                                id={"id"}
                                className={"form-control form-control-sm"}
                                placeholder="Enter id"
                              />
                            </div>
                          </div>
                          <div className={"col-sm-4 col-md-3"}>
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <Field
                                type="text"
                                name="email"
                                id={"email"}
                                className={"form-control form-control-sm"}
                                placeholder="Enter email"
                              />
                            </div>
                          </div>
                          <div className={"col-sm-4 col-md-3"}>
                            <div className="form-group">
                              <label htmlFor="isAdmin">Is Admin</label>
                              <select
                                className={"custom-select custom-select-sm"}
                                name={"isAdmin"}
                                id={"isAdmin"}
                                onChange={event => {
                                  setFieldValue("isAdmin", event.target.value);
                                }}
                              >
                                <option value={""}>Don't filter</option>
                                <option value={true}>True</option>
                                <option value={false}>False</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={"card-footer p-2 text-right"}>
                        <button
                          type={"submit"}
                          className={"btn btn-primary btn-sm"}
                        >
                          <FontAwesomeIcon icon={faSearch} className={"mr-1"} />
                          Search
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>

              <div className={"card mt-4 mb-4"}>
                <div className={"card-header"}>Users</div>
                <div className={"card-body p-0"}>
                  <div className={"table-responsive"}>
                    <table className={"table table-striped mb-0"}>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Email</th>
                          <th>Name</th>
                          <th>Is Admin</th>
                          <th className={"text-center"}>Options</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading && (
                          <tr>
                            <td colSpan="5">
                              <div>
                                <center>Loading users....</center>
                              </div>
                            </td>
                          </tr>
                        )}
                        {users &&
                          users.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>
                                  <Link to={"./user/" + item.id}>
                                    {item.email}
                                  </Link>
                                </td>
                                <td>{item.name}</td>
                                <td>{item.admin.toString()}</td>
                                <td className={"text-center"}>
                                  <Link
                                    to={"./user/" + item.id}
                                    className={"icon-default"}
                                  >
                                    <FontAwesomeIcon icon={faEdit} />
                                  </Link>
                                  <ModalDeleteUser user={item} />
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className={"card-footer text-center"}>
                  {/*@TODO pagination*/}
                  IMAGINE PAGINATION HERE
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { users, user, loading } = state.users;
  return { users, user, loading };
};

const adminUsersList = {
  getAllUsersConst: userActions.getAllUsersAction
};

const connectedRegisterPage = connect(
  mapStateToProps,
  adminUsersList
)(AdminUsersPage);

export { connectedRegisterPage as AdminUsersPage };
