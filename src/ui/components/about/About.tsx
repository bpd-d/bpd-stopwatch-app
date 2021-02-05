import * as React from 'react'
import { setNavbarTitle, setPageTitle } from '../../../core/helpers';
import { MainComponentBase } from '../common/MainComponentBase';

export default function About() {
    setPageTitle("About");
    setNavbarTitle("About");
    return (<>
        <MainComponentBase routeName="about">
            <AboutContent key="about" />

        </MainComponentBase>
    </>);
}


function AboutContent() {
    return (<div className="stopwatch-content-width cui-margin-top">
        <div className="cui-container ">
            <h3 className="cui-h3">Creator</h3>
            <p className="">Project was created and is devloped by <span className="cui-text-accent cui-text-bold">BPDev</span>: <a href="https://github.com/bpd-d" className="cui-link cui-accent">Visit Github</a> </p>
        </div>
        <div className="cui-container ">
            <h3 className="cui-h3">Repository</h3>
            <p className="">Project sources can be found on Github under following link: <a className="cui-link cui-accent" href="https://github.com/bpd-d/bpd-stopwatch-app">bpd-stopwatch-app</a></p>
        </div>
        <div className="cui-container">
            <h3 className="cui-h3">Links</h3>
            <p className="">Project uses third party libraries, see following list: </p>
            <ul className="cui-list">
                <li>
                    <div className="">
                        <div className="">
                            <span>React</span>
                        </div>
                        <a href="https://github.com/facebook/react" className="cui-link">Github</a>
                        <a href="https://reactjs.org/" className="cui-link cui-margin-left">React JS home page</a>
                    </div>
                </li>
                <li>
                    <div className="">
                        <div className="">
                            <span>cUI Light</span>
                        </div>
                        <a href="https://github.com/bpd-d/cui-light" className="cui-link">cUI Light on Github</a>
                        <a href="https://github.com/bpd-d/cui-styles" className="cui-link cui-margin-left">cUI Styles on Github</a>
                        <a href="https://github.com/bpd-d/cui-icons" className="cui-link cui-margin-left">cUI Icons on Github</a>
                    </div></li>
                <li>
                    <div className="">
                        <div className="">
                            <span>BPD Flow</span>
                        </div>
                        <a href="https://github.com/bpd-d/bpd-flow" className="cui-link">Github</a>
                    </div>

                </li>
                <li>
                    <div className="">
                        <div className="">
                            <span>BPD Storage</span>
                        </div>
                        <a href="https://github.com/bpd-d/bpd-storage" className="cui-link">Github</a>
                    </div>

                </li>
            </ul>
        </div>
    </div>);
}
