class ErrorUtil {

    attachErroInfo(error) {
        let errorObject = {
            'status': "error",
            'error': error.message || error.error
        };
        return errorObject;
    }
}

module.exports = new ErrorUtil();
