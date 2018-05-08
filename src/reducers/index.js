import { combineReducers } from 'redux'
import todo from './todo'
import updateEchart from './echart'

const reducer=combineReducers({
    todo,
    updateEchart
})

export default reducer