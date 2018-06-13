import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import healthStatusActions from './block.reducer';
import Block from './block.view';

const mapStateToProps = ({blockReducer}) => {
    return {
        ...blockReducer
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    ...healthStatusActions
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Block);