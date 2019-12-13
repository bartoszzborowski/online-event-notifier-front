import React from 'react';
import {TopNavigation} from "../../components/TopNavigation";
import {Link} from "react-router-dom";
import {ErrorMessage, Field, Formik} from "formik";
import { connect } from "react-redux";
import { userActions } from "stores/actions";
import { EventListItem } from "../../components/EventListItem/EventListItem";
class AdminUserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                id: 1,
                email: 'ww@ww.ww',
                name: 'Jan Kowalski',
                admin: false
            }
        }
    }

    
    componentDidMount() {
        const {getAllUserConst} =this.props;
        if (getAllUserConst){
            getAllUserConst();
        }
      }
    render() {
        const{
            users,
            loading,
            updateUserConst,
            match: {
              params: { userId }
            }
          } = this.props;

        const user = users ? (users.find ? users.find(x => x.id === userId) : null):null; // TODO: to tu jest bez sensu trzeba to poprawić na zaciaganie z bazy pojedenczego rekordu cos tutaj z userId jest nie tak bo nie przekazuje go dalej.
        return (
            <>
            
                <TopNavigation/>
                <div className={"container-fluid"}>
                    <div className={"row"} style={{marginTop: '5rem'}}>
                        <div className={"col-12"}>
                            <div className={"card"}>
                            {loading &&
                              <div className={"card-header"}>
                              <center>Loading user....</center>
                          </div>
                            }
                                {user &&  (
                                <>
                                <Formik
                                    initialValues={{
                                        id:  user.id ,
                                        email: user.email ,
                                        name:   user.name ,
                                        admin:  user.admin.toString() 
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.email) {
                                            errors.email = 'Email is either empty or invalid';
                                        }
                                        if (!values.name) {
                                            errors.name = 'Name is either empty or invalid';
                                        }
                                        if (!values.admin) {
                                            errors.admin = 'Role is either empty or invalid';
                                        }
                                        return errors;
                                    }}
                                    onSubmit={(values, {setSubmitting}) => {
                                        values.admin ? values.admin=true:values.admin=false;
                                        updateUserConst(values);
                                        setSubmitting(false);
                                        setTimeout(() => {
                                            window.location.reload();
                                          }, 2000);
                                        // setTimeout(() => {
                                        //     alert(JSON.stringify(values, null, 2));
                                        //     setSubmitting(false);
                                        // }, 400);
                                    }}>
                                    {({
                                          setFieldValue,
                                          values,
                                          errors,
                                          handleSubmit,
                                      }) => (
                                        <form onSubmit={handleSubmit}>
                                            <div className={"card-header"}>
                                                Editing user
                                            </div>
                                            <div className={"card-body"}>
                                                <div className="form-group">
                                                    <label htmlFor="id">ID</label>
                                                    <Field type="number" name="id" id={"id"}
                                                           className={"form-control form-control-sm " + (errors.id ? 'is-invalid' : '')}
                                                           placeholder="Enter id" disabled/>
                                                    <ErrorMessage name="id" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <Field type="text" name="email" id={"email"}
                                                           className={"form-control form-control-sm " + (errors.email ? 'is-invalid' : '')}
                                                           placeholder="Enter email"/>
                                                    <ErrorMessage name="email" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <Field type="text" name="name" id={"name"}
                                                           className={"form-control form-control-sm " + (errors.name ? 'is-invalid' : '')}
                                                           placeholder="Enter name"/>
                                                    <ErrorMessage name="name" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="admin">Is Admin</label>
                                                    <select
                                                        className={"custom-select custom-select-sm " + (errors.admin ? 'is-invalid' : '')}
                                                        name={"admin"} id={"admin"}
                                                        onChange={(event) => {
                                                            setFieldValue('admin', event.target.value);
                                                        }}>
                                                        <option value={"true"}
                                                                selected={values.admin === this.state.user.admin.toString()}>True
                                                        </option>
                                                        <option value={"false"}
                                                                selected={values.admin === this.state.user.admin.toString()}>False
                                                        </option>
                                                    </select>
                                                    <ErrorMessage name="admin" component="div"
                                                                  className={"invalid-feedback"}/>
                                                </div>
                                            </div>
                                            <div className={"card-footer text-right"}>
                                                <Link to={"../users"} className={"btn btn-primary btn-sm mr-2"}>
                                                    Cancel
                                                </Link>
                                                <button type={"submit"} className={"btn btn-warning btn-sm"}>
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
    const { users, user, loading } = state.users;
    return { users, user, loading};
  }
  
  
  const adminUsersList = {
      
    getAllUserConst: userActions.getUserAction,
    updateUserConst:userActions.updateUser
  };
  
  
  const connectedRegisterPage = connect(
    mapStateToProps,
    adminUsersList
  )(AdminUserPage);
  
  export { connectedRegisterPage as AdminUserPage };
  
