import createaAction from '../../redux/action-creator';
import request from 'request';

const initialState = {
    isCheckingHealthStatus: false,
    listOfEndPoints: [
        'https://cognition.dev.stackworx.cloud/api/status',
        'https://ord.dev.stackworx.io/health',
        'https://api.durf.dev.stackworx.io/health',
        'https://prima.run/health',
        'https://stackworx.io/',
        'https://stackworx.io/'
    ],
    block: {
        server: {
            serverStatus: '',
            serverName: ''
        },
        previousHealthStatus: {
            serverStatus: ''
        }
    },
    blocks: []
};

const appActionTypes = {
    SET_HEALTH_STATUS: 'SET_HEALTH_STATUS',
    SET_PREV_HEALTH_STATUS: 'SET_PREV_HEALTH_STATUS',
    SET_SERVER_NAME: 'SET_SERVER_NAME',
    SET_IS_CHECKING_HEALTH_STATUS: 'SET_IS_CHECKING_HEALTH_STATUS',
    GET_PREVIOUS_HEALTH_STATUS: 'GET_PREVIOUS_HEALTH_STATUS'
};

export const healthStatusActions = {
    isCheckingHealthStatusAction: predicate =>
        createaAction(appActionTypes.SET_IS_CHECKING_HEALTH_STATUS, predicate),
    setHealthStatusAction: healthStatus =>
        createaAction(appActionTypes.SET_HEALTH_STATUS, healthStatus),
    previousHealthStatusAction: prevHealthStatus =>
        createaAction(appActionTypes.SET_PREV_HEALTH_STATUS, prevHealthStatus),
    getPreviousHealthStatusAction: block =>
        createaAction(appActionTypes.GET_PREVIOUS_HEALTH_STATUS, block),
    serverNameAction: serverName => createaAction(appActionTypes.SET_SERVER_NAME, serverName)
};

export const checkHealthStatusThunk = (url, idx) => (dispatch, getState) => {
    if (url) {
        dispatch(healthStatusActions.isCheckingHealthStatusAction(true));
        let status = null;
        request.get(url, {}, (error, response, body) => {
            if (error) {
                status = 'OTHER';
            } else if (response.statusCode === 200) {
                status = 'UP';
            } else {
                status = 'DOWN';
            }
            let newHealthStatus = { ...getState().appReducer };
            newHealthStatus.block.previousHealthStatus.serverStatus = newHealthStatus.block.server.serverStatus;
            newHealthStatus.blocks[idx] = newHealthStatus.block;
            dispatch(
                healthStatusActions.setHealthStatusAction({
                    status,
                    newHealthStatus: newHealthStatus.block,
                    name: url
                })
            );
         //   dispatch(healthStatusActions.isCheckingHealthStatusAction(false));
        });
    }
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case appActionTypes.SET_HEALTH_STATUS:
            const { status, newHealthStatus } = action.payload;
            return {
                ...state,
                block: {
                    server: {
                        serverStatus: status,
                        serverName: action.payload.name
                    },
                    previousHealthStatus: newHealthStatus.previousHealthStatus
                }
            };
        case appActionTypes.SET_PREV_HEALTH_STATUS:
            return {
                ...state,
                block: {
                    server: {
                        serverStatus: status
                    },
                    previousHealthStatus: action.payload
                }
            };
        case appActionTypes.SET_SERVER_NAME:
            return {
                ...state,
                server: {
                    serverName: action.payload
                }
            };
        case appActionTypes.SET_IS_CHECKING_HEALTH_STATUS:
            return { ...state, isCheckingHealthStatus: action.payload };
        default:
            return state;
    }
}
