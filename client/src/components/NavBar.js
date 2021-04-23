import React from 'react';
import {Link} from 'react-router-dom';

class NavButton extends React.Component{
    render(){
        return(
            <Link to={this.props.link}>{this.props.name}</Link>
        )
    }
}

class NavBar extends React.Component{
    render(){
        return(
            <div>
                <NavButton name ="Home" link="/" />
                <NavButton name = "PageA" link ="/page-a"/>
                <NavButton name = "PageB" link ="/page-b"/>
                <NavButton name = "PageC" link ="/page-c"/>
            </div>
        )
    }
}

export default NavBar;