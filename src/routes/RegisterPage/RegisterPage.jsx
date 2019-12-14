import React from "react";
import { Link } from "react-router-dom";
import { TopNavigation } from "../../components/TopNavigation";
import { uiActions, userActions } from "../../stores/actions";
import { connect } from "react-redux";
import { ErrorMessage, Field } from "formik";
import { SelectField } from "../../components/SelectField";
import { Modal } from "react-bootstrap";
import Select from "react-select";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCityId = this.handleCityId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { getLocations } = this.props;
    getLocations();
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleCityId(city) {
    const { value } = city;
    this.setState(state => ({
      user: {
        ...state.user,
        city_id: value
      }
    }));
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;

    if (
      user.firstName &&
      user.lastName &&
      user.password &&
      user.email &&
      user.city_id
    ) {
      this.props.register(user);
    }
  }

  render() {
    const { registering, locations } = this.props;
    const { user, submitted } = this.state;

    const locationsOptions =
      locations &&
      locations.map(item => {
        return { value: item.slug, label: item.name };
      });

    return (
      <>
        <TopNavigation />
        <div className={"container"}>
          <div className={"row"} style={{ marginTop: "6rem" }}>
            <div className="col-12">
              <div className={"card"}>
                <form name="form" onSubmit={this.handleSubmit}>
                  <div className={"card-header"}>
                    <h2>Register</h2>
                  </div>
                  <div className={"card-body"}>
                    <div
                      className={
                        "form-group" +
                        (submitted && !user.firstName ? " has-error" : "")
                      }
                    >
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="firstName"
                        value={user.firstName}
                        onChange={this.handleChange}
                      />
                      {submitted && !user.firstName && (
                        <div className="help-block">First Name is required</div>
                      )}
                    </div>
                    <div
                      className={
                        "form-group" +
                        (submitted && !user.lastName ? " has-error" : "")
                      }
                    >
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="lastName"
                        value={user.lastName}
                        onChange={this.handleChange}
                      />
                      {submitted && !user.lastName && (
                        <div className="help-block">Last Name is required</div>
                      )}
                    </div>
                    <div
                      className={
                        "form-group" +
                        (submitted && !user.email ? " has-error" : "")
                      }
                    >
                      <label htmlFor="lastName">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={this.handleChange}
                      />
                      {submitted && !user.email && (
                        <div className="help-block">Email is required</div>
                      )}
                    </div>
                    {locationsOptions && (
                      <div
                        className={
                          "form-group" +
                          (submitted && !user.city_id ? " has-error" : "")
                        }
                      >
                        <label htmlFor="lastName">Base City</label>
                        <Select
                          onChange={this.handleCityId}
                          options={locationsOptions}
                          name="city_id"
                        />
                        {submitted && !user.city_id && (
                          <div className="help-block">City is required</div>
                        )}
                      </div>
                    )}
                    <div
                      className={
                        "form-group" +
                        (submitted && !user.password ? " has-error" : "")
                      }
                    >
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={this.handleChange}
                      />
                      {submitted && !user.password && (
                        <div className="help-block">Password is required</div>
                      )}
                    </div>
                  </div>
                  <div className={"card-footer text-right"}>
                    <Link to="/login" className="btn btn-secondary mr-2">
                      Cancel
                    </Link>
                    <button className="btn btn-primary">Register</button>
                    {registering && (
                      <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  const { registering } = state.registration;
  const { locations } = state.ui;
  return { registering, locations };
};

const actionCreators = {
  register: userActions.register,
  getLocations: uiActions.getLocations
};

const connectedRegisterPage = connect(
  mapStateToProps,
  actionCreators
)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
