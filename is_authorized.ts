var jwt = require('jsonwebtoken');

export function isAuthorized(token: string, action: string) {
    try {
        var decoded = jwt.verify(token, 'private-key');
        return decoded['user'] == action || action == 'timeline' || action == 'newpost';
    }
    catch (err) {
        return false;
    }
}