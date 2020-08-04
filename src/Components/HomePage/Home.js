import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import {GetPostAction} from '../actions/GetPostAction';
import { LOADING, SUCCESS, ERROR } from '../constants/misc';

class Home extends Component {
    constructor(props) {
        super(props);

        const token = localStorage.getItem('UserId');
        let loggedIn = true;
        if (token==null) {
            loggedIn = false;
        }

        this.state = {
            loggedIn,
            allpost:[],
            isLodaing:false,
            waitingIndicator:false,
        }
    } 
    logout = async () => {
        localStorage.removeItem('UserId');
        localStorage.removeItem('Token');
        localStorage.removeItem('role');
        this.props.history.push('/') 
    }


    componentDidMount() {
        // let id =localStorage.getItem('UserId');
        this.props.GetPostAction();
      }

    static getDerivedStateFromProps(props, state) {
        // console.log('HERE=>',props);
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
          props.reset_state_action();
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
        if(this.state.loggedIn===false) {
            return <Redirect to="/" />
        }
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

                <div className="maincontent">
                    <div className="container">
                        <div className="row">

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/black-panther.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Black Panthers</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/captain-america.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Captain America</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/doctor-strange.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Doctor Strange</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/hulk.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Hulk</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/iron-man.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Iron Man</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/spider-man.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Spider Man</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/thor.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Thor</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/black-widow.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Black Widow</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-sm-6 col-md-6 col-lg-4">
                                <div className="clebBox">                                    
                                    <div className="clebImg">
                                        <img src="./assets/images/captain-marvals.jpg" alt="name" />
                                    </div>                                    
                                    <div className="info">
                                        <h3>Captain Marvals</h3>
                                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                        <div className="category">
                                            <strong>Category: </strong> Avengers
                                        </div>
                                    </div>
                                </div>
                            </div>


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
