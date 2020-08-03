import React, { Component } from 'react'
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'
import { LoginAction, auth_action } from '../actions/LoginAction';
import { LOADING, SUCCESS, ERROR } from '../constants/misc';
import { AsyncStorage } from 'AsyncStorage';
import {history} from '../Helper/history';


class Login extends Component {

    constructor(props) {
        super(props)
        const token = localStorage.getItem('UserId');
        let loggedIn = true;
        if (token==null) {
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

    // validate = (text) => {
    //     let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //     if (reg.test(text) === false) {
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    static getDerivedStateFromProps(props, state) {
        console.log("new props in login ", props);
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
            return { status: "error", isLoading: false }
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.LoginReducer.status === LOADING) {
            console.log('please wait...')
        } else if (this.props.LoginReducer.status === ERROR) {
            console.log('failed');
        } else if (this.props.LoginReducer.status === SUCCESS) {
            if (this.state.status === 'success') {
                this.props.auth_action();
            } else {
                console.log('login failed');
            }
        } else if (this.props.AuthReducer.status === SUCCESS) {
            if (this.state.status === 'success') { 
                this.setState({
                    loggedIn:true
                }) 
                this.props.history.push('/home') 
            } else if (this.state.status === 'error') {
                console.log('login error');
            }
        }
    }

    render() {
        if (this.state.loggedIn=== true) {
            return <Redirect to="/home" />
        }
        const { username, password, submitted } = this.state;
        return (
            <div className="loginWrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="loginbox">
                                <h1>PWA</h1>
                                <h3>Catchpharse</h3>
                                <div className="loginfield">
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
                                            
                                            {this.state.isLoading===true ?
                                            <span className="loader">
                                                <img src={'./assets/images/ajax-loader.gif'} alt="loader" />
                                            </span>
                                            : '' }

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
    };
};
export default connect(mapStateToProps, { LoginAction, auth_action })(Login);