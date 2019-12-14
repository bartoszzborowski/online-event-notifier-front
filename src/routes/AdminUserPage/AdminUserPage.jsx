import React from "react";
import { TopNavigation } from "../../components/TopNavigation";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Formik } from "formik";
import { connect } from "react-redux";
import { userActions } from "stores/actions";

class AdminUserPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values) {
    const { updateUserConst, success } = this.props;
    updateUserConst(values);
    if (success) {
      // this.props.history.push("/admin/users");
    }
  }

  componentDidMount() {
    const {
      getById,
      match: {
        params: { userId }
      }
    } = this.props;
    if (getById) {
      getById(userId);
    }
  }

  render() {
    const { user, loading } = this.props;
    console.log("user", user);
    return (
      <>
        <TopNavigation />
        <div className={"container-fluid"}>
          <div className={"row"} style={{ marginTop: "5rem" }}>
            <div className={"col-12"}>
              <div className={"card"}>
                {loading && (
                  <div className={"card-header"}>
                    <center>Loading user....</center>
                  </div>
                )}
                {user && (
                  <>
                    <Formik
                      initialValues={{
                        id: user.id,
                        email: user.email,
                        name: user.name,
                        admin: !!user.admin
                      }}
                      validate={values => {
                        const errors = {};
                        if (!values.email) {
                          errors.email = "Email is either empty or invalid";
                        }
                        if (!values.name) {
                          errors.name = "Name is either empty or invalid";
                        }
                        if (!values.admin) {
                          errors.admin = "Role is either empty or invalid";
                        }
                        return errors;
                      }}
                      onSubmit={(values, { setSubmitting }) => {
                        this.handleSubmit(values);
                        setSubmitting(false);
                      }}
                    >
                      {({ setFieldValue, values, errors, handleSubmit }) => (
                        <form onSubmit={handleSubmit}>
                          <div className={"card-header"}>Editing user</div>
                          <div className={"card-body"}>
                            <div className="form-group">
                              <label htmlFor="id">ID</label>
                              <Field
                                type="number"
                                name="id"
                                id={"id"}
                                className={
                                  "form-control form-control-sm " +
                                  (errors.id ? "is-invalid" : "")
                                }
                                placeholder="Enter id"
                                disabled
                              />
                              <ErrorMessage
                                name="id"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="email">Email</label>
                              <Field
                                type="text"
                                name="email"
                                id={"email"}
                                className={
                                  "form-control form-control-sm " +
                                  (errors.email ? "is-invalid" : "")
                                }
                                placeholder="Enter email"
                              />
                              <ErrorMessage
                                name="email"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="name">Name</label>
                              <Field
                                type="text"
                                name="name"
                                id={"name"}
                                className={
                                  "form-control form-control-sm " +
                                  (errors.name ? "is-invalid" : "")
                                }
                                placeholder="Enter name"
                              />
                              <ErrorMessage
                                name="name"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                            <div className="form-group">
                              <label htmlFor="admin">Is Admin</label>
                              <select
                                className={
                                  "custom-select custom-select-sm " +
                                  (errors.admin ? "is-invalid" : "")
                                }
                                name={"admin"}
                                value={values.admin}
                                id={"admin"}
                                onChange={event => {
                                  console.log("evenrt", event.target.value);
                                  setFieldValue("admin", event.target.value);
                                }}
                              >
                                <option value="true">True</option>
                                <option value="false">False</option>
                              </select>
                              <ErrorMessage
                                name="admin"
                                component="div"
                                className={"invalid-feedback"}
                              />
                            </div>
                          </div>
                          <div className={"card-footer text-right"}>
                            <Link
                              to={"../users"}
                              className={"btn btn-primary btn-sm mr-2"}
                            >
                              Cancel
                            </Link>
                            <button
                              type={"submit"}
                              className={"btn btn-warning btn-sm"}
                            >
                              Save
                            </button>
                          </div>
                        </form>
                      )}
                    </Formik>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { user, loading, success } = state.users;
  return { user, loading, success };
};

const adminUsersList = {
  getAllUserConst: userActions.getUserAction,
  getById: userActions.getById,
  updateUserConst: userActions.updateUser
};

const connectedRegisterPage = connect(
  mapStateToProps,
  adminUsersList
)(AdminUserPage);

export { connectedRegisterPage as AdminUserPage };
