import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { LoginAction, auth_action } from '../actions/LoginAction';
import { ResetStateAction } from '../actions/ResetStateAction';
import { LOADING, SUCCESS, ERROR } from '../constants/misc';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


class Login extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem('UserId');
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }
        this.state = {
            username: '',
            password: '',
            loggedIn,
            isLoading: false,
            submitted: false,
            status: '',
        }
    }


    componentDidMount() {

    }

    handleLoginForm = async (event) => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.LoginAction(username, password);
        }
    }
    handleChange = (evt) => {
        evt.preventDefault()
        let targetName = evt.target.name
        let targetValue = evt.target.value
        this.setState({ [targetName]: targetValue })
    };

    static getDerivedStateFromProps(props, state) {
        if (props.LoginReducer.status === LOADING) {
            return { status: "Please wait loading", isLoading: true }
        } else if (props.LoginReducer.status === SUCCESS) {
            if (props.LoginReducer.value.status_code === 500) {
                return { status: "login failed", isLoading: false }
            } else {
                localStorage.setItem('Token', props.LoginReducer.value.data.data.token);
                localStorage.setItem('UserId', "" + props.LoginReducer.value.data.data.id);
                localStorage.setItem('role', props.LoginReducer.value.data.data.role);
                props.auth_action();
                return { status: "success", isLoading: false }
            }
        } else if (props.LoginReducer.status === ERROR) {
            props.ResetStateAction();
            return { status: "error", isLoading: false }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.LoginReducer.status === LOADING) {
        } else if (this.props.LoginReducer.status === ERROR) {
            store.addNotification({
                title: "Error!",
                message: "Login Unsuccessful",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animated", "fadeIn"],
                animationOut: ["animated", "fadeOut"],
                dismiss: {
                    duration: 5000,
                    onScreen: true
                }
            });
        } else if (this.props.LoginReducer.status === SUCCESS) {
            if (this.state.status === 'success') {
                this.props.auth_action();
                store.addNotification({
                    title: "Success!",
                    message: "Login Successful",
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            } else {
                store.addNotification({
                    title: "Error!",
                    message: "Login Unsuccessful",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animated", "fadeIn"],
                    animationOut: ["animated", "fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                });
            }
        } else if (this.props.AuthReducer.status === SUCCESS) {
            if (this.state.status === 'success') {
                this.setState({
                    loggedIn: true
                })
                this.props.history.push('/home')
            } else if (this.state.status === 'error') {
            }
        }
    }

    render() {
        if (this.state.loggedIn === true) {
            return <Redirect to="/home" />
        }
        const { username, password, submitted } = this.state;
        return (
            <div className="loginWrapper">
                <ReactNotification />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="loginbox">
                                <div className="loginfield">
                                    <h1>Login</h1>
                                    <form onSubmit={(event) => this.handleLoginForm(event)}>
                                        <div className={'form-group' + (submitted && !username ? ' has-error' : '')}>
                                            <input
                                                type="text"
                                                name="username"
                                                id="username"
                                                className="form-control"
                                                placeholder="Username"
                                                onChange={(event) => this.handleChange(event)}
                                            />
                                            {submitted && !username &&
                                                <div className="help-block">Username is required</div>
                                            }
                                        </div>
                                        <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
                                            <input
                                                type="password"
                                                name="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={(event) => this.handleChange(event)}
                                            />
                                            {submitted && !password &&
                                                <div className="help-block">Password is required</div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <button className="btnlogin">Log In</button>

                                            {this.state.isLoading === true ?
                                                <span className="loader">
                                                    <img src={'./assets/images/ajax-loader.gif'} alt="loader" />
                                                </span>
                                                : ''}

                                        </div>


                                        <div className="sublinks">
                                            Not register yet? <Link to="/register" className="link">Register Here</Link>
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        LoginReducer: state.LoginReducer,
        AuthReducer: state.AuthReducer,
        ResetStateReducer: state.ResetStateReducer,
    };
};
export default connect(mapStateToProps, { LoginAction, auth_action, ResetStateAction })(Login);