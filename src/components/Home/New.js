import React, { Component } from 'react';
import NewData from './NewData';

export default class New extends Component {
    render() {
        return (
            <>
                <section>
                    <div className="container">
                        <div className="title-new">
                            <h3>New</h3>
                            <p className="lead text-muted">You've never seen it before</p>
                        </div>
                    </div>
                </section>

                <article>
                    <div className="container">
                        <div className="row d-flex flex-row justify-content-center">
                            <NewData />
                        </div>
                    </div>
                </article>
            </>
        )
    }
}