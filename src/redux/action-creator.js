export default function(actionName, payload) {
    if (!actionName) {
        return Error('You need to pass a valid action name');
    }
    return {
        type: actionName,
        payload
    };
}
