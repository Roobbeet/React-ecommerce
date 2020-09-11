import React from 'react'
import {SpinnerOverlay, SpinnerContainer} from './with-spinner.styles';


//spinner component
const WithSpinner = WrappedComponent => ({isLoading, ...props}) => {
    return isLoading ? (
        <SpinnerOverlay>
            <SpinnerContainer />
        </SpinnerOverlay>
    ) : (
        <WrappedComponent {...props} />
    )
}

export default WithSpinner;