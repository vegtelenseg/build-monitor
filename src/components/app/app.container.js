import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { checkHealthStatusThunk } from './app.reducer';
import { healthStatusActions } from './app.reducer';
import App from './app.view';

const mapStateToProps = ({ appReducer }) => {
    return {
        ...appReducer
    };
};

const { getPreviousHealthStatusAction } = healthStatusActions;
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            checkHealthStatusThunk,
            getPreviousHealthStatusAction
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
