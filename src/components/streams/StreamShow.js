import React from 'react';
import {connect} from "react-redux";
import {fetchStream} from "../../actions";
import flv from "flv.js";

class StreamShow extends React.Component {
    constructor(props) {
        super(props)

        this.videoRef = React.createRef();
    }

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    render() {
        if (!this.props.stream) {
            return null
        }

        const {title, description} = this.props.stream;

        return (
            <div>
                <video ref={this.videoRef} style={{width: "100%"}} controls={true}></video>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream})(StreamShow);