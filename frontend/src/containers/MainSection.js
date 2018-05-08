import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import {board} from '../actions';
import MainSection from '../components/MainSection'

const mapStateToProps = state => {
    return {
        total: state.board.total,
    }
}

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(board, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(MainSection);