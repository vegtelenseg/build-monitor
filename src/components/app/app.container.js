import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import healthStatusActions from './app.reducer';
import App from './app.view';

const mapStateToProps = ({ appReducer }) => {
    return {
        ...appReducer
    };
};

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            ...healthStatusActions
        },
        dispatch
    );

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
