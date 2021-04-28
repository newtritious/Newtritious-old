import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const StyledLink = styled(Link)`
    width: 11%;
    min-width: 140px;
    font-size: 40px;
    text-align: center;
    padding: 10px;

    &:hover {
        background: #ddd;
    }
`

class NavButton extends React.Component{
    render(){
        return(
            <StyledLink to={this.props.link}>{this.props.name}</StyledLink>
        )
    }
}

class NavBar extends React.Component{
    render(){
        return(
            <div className="flex flex-row h-20 border-b-2 border-gray-400">
                <NavButton name ="Home" link="/" />
                <NavButton name = "PageA" link ="/page-a"/>
                <NavButton name = "PageB" link ="/page-b"/>
                <NavButton name = "PageC" link ="/page-c"/>
            </div>
        )
    }
}

export default NavBar;