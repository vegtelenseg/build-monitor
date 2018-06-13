import createaAction from '../../redux/action-creator';

const initialState = {
    healthStatus: 'DOWN',
    previousHealthStatus: 'UP',
    serverName: ''
}

const blockActionTypes = {
    SET_HEALTH_STATUS: 'SET_HEALTH_STATUS',
    SET_PREV_HEALTH_STATUS: 'SET_PREV_HEALTH_STATUS',
    SET_SERVER_NAME: 'SET_SERVER_NAME'
}

const healthStatusActions = {
    healthStatusAction: healthStatus => createaAction(blockActionTypes.SET_HEALTH_STATUS, healthStatus),
    previousHealthStatusAction: prevHealthStatus => createaAction(blockActionTypes.SET_PREV_HEALTH_STATUS, prevHealthStatus),
    serverNameAction: serverName => createaAction(blockActionTypes.SET_SERVER_NAME, serverName)
}

export default function blockReducer(state=initialState, action) {
    switch (action.type) {
        case blockActionTypes.SET_HEALTH_STATUS:
            return { ...state, healthStatus: action.payload}
        case blockActionTypes.SET_PREV_HEALTH_STATUS:
            return {...state, prevHealthStatus: action.payload}
        default:
            return state
    }
}