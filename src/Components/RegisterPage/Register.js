import React, { Component } from 'react'
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { RegisterAction } from '../actions/RegisterAction';
import { ResetStateAction } from '../actions/ResetStateAction';
import { LOADING, SUCCESS, ERROR } from '../constants/misc';
import ReactNotification, { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';


class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            date_of_birth: '',
            password: '',
            gender: '',
            isLoading: false,
            submitted: false,
            status: '',
        }
    }

    handleLoginForm = async (event) => {
        event.preventDefault();
        this.setState({ submitted: true });
        const { firstname, lastname, email, date_of_birth, password } = this.state;
        if (firstname && password) {
            this.props.RegisterAction(firstname, lastname, email, 'male', date_of_birth, password);
        }
    }
    handleChange = (evt) => {
        evt.preventDefault()
        let targetName = evt.target.name
        let targetValue = evt.target.value
        this.setState({ [targetName]: targetValue })
    };

    static getDerivedStateFromProps(props, state) {
        if (props.RegisterReducer.status === LOADING) {
            return {
                isLoading: true,
                waitingIndicator: true,
            }
        } else if (props.RegisterReducer.status === SUCCESS) {            
            return {
                waitingIndicator: false,               
                isLoading: false
            };
        } else if (props.RegisterReducer.status === ERROR) {
            props.ResetStateAction();            
            return {
                isLoading: false,
                waitingIndicator: false
            };
        }
        return null;

    }

    componentDidUpdate() {
        if (this.props.RegisterReducer.status === SUCCESS) {
            store.addNotification({
                title: "Success!",
                message: "User Registered Successfully",
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
        } else if(this.props.RegisterReducer.status === ERROR) {
            store.addNotification({
                title: "Oops!",
                message: "User Registered failed!!",
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
            // this.props.history.push('/')
            setTimeout(() => {
                this.props.history.push('/')
            }, 3000);
        }
    }

    render() {
        const { firstname, lastname, email, date_of_birth, password, submitted } = this.state;
        return (
            <div className="loginWrapper registerWrap">
                <ReactNotification />
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="loginbox">
                                <h1>Register</h1>
                                <div className="loginfield">
                                    <form onSubmit={(event) => this.handleLoginForm(event)}>
                                        <h3>What's your name?</h3>
                                        <div className={'form-group' + (submitted && !firstname ? ' has-error' : '')}>
                                            <input type="text" name="firstname" id="firstname" className="form-control" placeholder="Firstname" onChange={(event) => this.handleChange(event)} />
                                            {submitted && !firstname &&
                                                <div className="help-block">firstname is required</div>
                                            }
                                        </div>
                                        <div className={'form-group' + (submitted && !lastname ? ' has-error' : '')}>
                                            <input type="text" name="lastname" id="lastname" className="form-control" placeholder="Lastname" onChange={(event) => this.handleChange(event)} />
                                            {submitted && !lastname &&
                                                <div className="help-block">lastname is required</div>
                                            }
                                        </div>
                                        <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
                                            <input type="text" name="email" id="email" className="form-control" placeholder="Email Address" onChange={(event) => this.handleChange(event)} />
                                            {submitted && !email &&
                                                <div className="help-block">email is required</div>
                                            }
                                        </div>

                                        <h3>And your gender?</h3>
                                        <sub>This can't be changed later</sub>
                                        <div className="form-group">
                                            <div className="radiowrap">
                                                <input type="radio" name="gender" value="male" />
                                                <label className="radiolbl">Male</label>
                                            </div>
                                            <div className="radiowrap">
                                                <input type="radio" name="gender" value="female" />
                                                <label className="radiolbl">Female</label>
                                            </div>
                                        </div>

                                        <h3>What's your date of birth?</h3>
                                        <div className={'form-group' + (submitted && !date_of_birth ? ' has-error' : '')}>
                                            <input type="text" name="date_of_birth" id="date_of_birth" className="form-control" placeholder="DD/MM.YYYY" onChange={(event) => this.handleChange(event)} />
                                            {submitted && !date_of_birth &&
                                                <div className="help-block">Date of birth is required</div>
                                            }
                                        </div>
                                        <div className="form-group">
                                            <input type="text" name="password" id="password" className="form-control" placeholder="Password" onChange={(event) => this.handleChange(event)} />
                                            {submitted && !password &&
                                                <div className="help-block">password is required</div>
                                            }
                                        </div>

                                        <div className="form-group textright">
                                            <button className="btnregister"><span></span></button>
                                            {this.state.isLoading === true ?
                                                <span className="loader">
                                                    <img src={'./assets/images/ajax-loader.gif'} alt="loader" />
                                                </span>
                                                : ''}
                                        </div>

                                        <div className="sublinks">
                                            Already registered? <Link to="/" className="link">Login Here</Link>
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
        RegisterReducer: state.RegisterReducer,
        ResetStateReducer: state.ResetStateReducer,
    };
};
export default connect(mapStateToProps, { RegisterAction, ResetStateAction })(Register);