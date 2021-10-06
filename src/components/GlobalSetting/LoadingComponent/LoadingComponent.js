import React from 'react';
import {useSelector} from 'react-redux'
import styles from './LoadingComponent.module.css'
const LoadingComponent = () => {
    const {isLoading} = useSelector (state => state.LoadingReducer)
    
    if (isLoading) {
        return (
            <div className={styles.bgLoading}>
                <img src={require('../../../assets/img/loadingGif/loading.gif')} />
            </div>
        )
}
else {
    return ''
}
}

export default LoadingComponent;
