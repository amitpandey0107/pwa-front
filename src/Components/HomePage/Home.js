import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { GetPostAction } from '../actions/GetPostAction';
import { LOADING, SUCCESS, ERROR } from '../constants/misc';
const IMAGE_URL = 'http://pwa-backend.indivarinfolabs.com/public/uploads/posts/';

class Home extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('UserId');
        let loggedIn = true;
        if (token == null) {
            loggedIn = false;
        }

        this.state = {
            loggedIn,
            allpost: [],
            isLodaing: false,
            waitingIndicator: false,
        }
    }
    logout = async () => {
        localStorage.removeItem('UserId');
        localStorage.removeItem('Token');
        localStorage.removeItem('role');
        this.props.history.push('/')
    }


    componentDidMount() {
        this.props.GetPostAction();
    }

    static getDerivedStateFromProps(props, state) {
        if (props.GetPostReducer.status === LOADING) {
            return { status: "Please wait loading", isLodaing: true, waitingIndicator: true }
        } else if (props.GetPostReducer.status === SUCCESS) {
            var post = [];
            props.GetPostReducer.value.data.data.map((item, index) => {
                post.push({
                    key: item.id,
                    user_id: item.user_id,
                    title: item.title,
                    description: item.description,
                    category: item.category,
                    image: item.image,
                    slug: item.slug,
                    status: item.status,
                })

            })
            return {
                allpost: post,
                waitingIndicator: false
            };
        } else if (props.GetPostReducer.status === ERROR) {
            return { isLodaing: false, waitingIndicator: false };
        }
        return null;

    }


    render() {
        if (this.state.loggedIn === false) {
            return <Redirect to="/" />
        }
        const { allpost } = this.state;
        return (
            <>
                    
                <div className="mainheader">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-12">
                                <nav className="mainmenu">
                                    <ul>
                                        <li><Link to="">Timeline</Link></li>
                                        <li><Link to="">Gallery</Link></li>
                                        <li><Link to="">Matches</Link></li>
                                        <li><Link to="">Profile</Link></li>
                                        <li><Link to='/logout'>Logout</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

                {this.state.waitingIndicator === true ?
                <span className="loader2">
                    <img src={'./assets/images/ajax-loader.gif'} alt="loader" />
                </span>
                : ''}

                <div className="maincontent">
                    <div className="container">
                        <div className="row">

                            {allpost.map((item, index) => (
                                <div className="col-sm-6 col-md-6 col-lg-4">
                                    <div className="clebBox">
                                        <div className="clebImg">
                                            <img src={IMAGE_URL + item.image} alt="name" />
                                        </div>
                                        <div className="info">
                                            <h3> {item.title} </h3>
                                            <p>{item.description}</p>
                                            <div className="category">
                                                <strong>Category: </strong>{item.category}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}



                        </div>
                    </div>
                </div>

            </>
        )
    }
}


const mapStateToProps = state => {
    return {
        GetPostReducer: state.GetPostReducer,
    };
};
export default connect(mapStateToProps, { GetPostAction })(Home)
