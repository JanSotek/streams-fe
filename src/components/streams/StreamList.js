import React from 'react';
import {connect} from "react-redux";
import {fetchStreams} from "../../actions"
import {Link} from "react-router-dom";
import "./StreamList.css";

class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdminButtons(stream) {
        if (stream.userId === this.props.currentSignedInUserId) {
            return (
                <div className="right floated content">
                    <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
                    <Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
                </div>
            )
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            if (this.props.currentSignedInUserId !== stream.userId) {
                return null;
            }

            return (
                <div className="item" key={stream.id}>
                    {this.renderAdminButtons(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                            {stream.title}
                        </Link>
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            )
        })
    }

    renderCreateButton() {
        if (this.props.isUserSignedIn) {
            return (
                <div>
                    <Link to="/streams/new" className="ui button primary">
                    Create Stream
                    </Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="create-button">
                    <h2>Streams</h2>
                    {this.renderCreateButton()}
                </div>
                <div className="ui celled list">
                    {this.renderList()}
                </div>   
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        streams: Object.values(state.streams),
        currentSignedInUserId: state.auth.userId,
        isUserSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateToProps, {fetchStreams})(StreamList);