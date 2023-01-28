import { connect } from 'react-redux';
import Component from './Chat';
import * as messagesAtions from '../../redux/actions/messages';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    user: selectors.getUser(state),
    messages: selectors.getMessages(state)
});

const mapDispatchToProps = dispatch => ({
    sendMessage: payload => dispatch(messagesAtions.sendMessage(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Component);
