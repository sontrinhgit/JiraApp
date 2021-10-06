import React from 'react';
import { Route } from 'react-router';
import Header from '../../components/Header/Header';

export const HomeTemplate = (props) => {
    const {Component,...restParams} = props; 

    return <Route path = {restParams} render = {(propsRoute)=>{
        return <div>
            <Header />
            <Component {...propsRoute} />

        </div>
    }} />
}