var jwt = require('jsonwebtoken');

export function isAuthorized(token: string, action: string | undefined = undefined) {
    // User requests an operation that does not require being logged in
    if (action == 'timeline') {
        return true;
    }
    
    // User requests an operation that does not act on a specific resource,
    // e.g. submitting a new post. As long as they provide a valid token,
    // assume they have the right
    if (!action) {
        try {
            jwt.verify(token, 'private-key');
            return true;
        }
        catch (err) {
            return false;
        }
    }

    // User requests an operation that acts on a specific resource. Here, check 
    // that token is valid, and that the user is the owner of the resource. In
    // the future, this should be more fine-grained (allow users with more
    // or less rights)
    try {
        var decoded = jwt.verify(token, 'private-key');
        console.log(action);
        return decoded['user'] == action;
    }
    catch (err) {
        return false;
    }
}