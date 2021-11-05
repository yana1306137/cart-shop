import React from 'react';
import { Link } from 'react-router-dom';

class HeaderComponent extends React.Component {
    
    render() {
        return (
            <div className='No-Padding No-Margin'>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to={"/store"} className="nav-link White">
                                    Store  |
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={"/cart"} className="nav-link White">
                                    Cart  |
                                </Link>
                            </li>
                        </div>
                    </nav>
                </div>
            </div>
        )
    }
}

export default HeaderComponent;