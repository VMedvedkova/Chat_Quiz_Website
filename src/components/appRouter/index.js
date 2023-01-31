import { connect } from 'react-redux';
import Component from './AppRouter';
import * as selectors from '../../redux/selectors';

const mapStateToProps = state => ({
    user: selectors.getUser(state),
});


export default connect(mapStateToProps, null)(Component);
