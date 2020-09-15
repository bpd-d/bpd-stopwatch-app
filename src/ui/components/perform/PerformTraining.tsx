import * as React from 'react'
import { useParams } from 'react-router-dom';
import { NotFound } from '../common/NotFound';

export function PerfromTraining() {
    const { id } = useParams();
    return (<>
        {!id || id < 0 ? <NotFound message="We couldn't find training" /> : <div>PLAY!</div>}
    </>);
}
