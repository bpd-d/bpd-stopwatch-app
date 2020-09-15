import * as React from 'react'
import { withRouter } from 'react-router-dom';

function GoBack(props: any) {
    const { history } = props;
    return (<button className="cui-button cui-accent" onClick={() => history.goBack()}>Go Back</button>)
}


export default withRouter(GoBack);