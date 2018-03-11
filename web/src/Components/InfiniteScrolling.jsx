/* eslint-disable no-undef */
import React, { Component } from 'react';

const getScrollPercent = () => {
    return ((document.documentElement.scrollTop || document.body.scrollTop) /
        ((document.documentElement.scrollHeight || document.body.scrollHeight) -
            document.documentElement.clientHeight) * 100);
}

class InfiniteScrolling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            endpointCounter: 1
        }
    }

    endpointHandle = () => {
        this.setState({ endpointCounter: this.state.endpointCounter++ });
        console.log('endpoint is reached')
        // this.props.getPosts
    }

    handleScroll = (event) => {
        console.log(window.pageYOffset)
        // console.log(document.body.scrollTop / (this.refs.container.height - document.body.scrollHeight))
        // if (getScrollPercent() >= 80) this.endpointHandle;
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll)
        window.addEventListener('resize', this.handleScroll)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
        window.removeEventListener('resize', this.handleScroll)
    }

    render() {
        const { content } = this.props
        return (
            <div className="posts" ref={(container) => this.container = container}>
                {content}
            </div>
        )
    }
}

export default InfiniteScrolling
