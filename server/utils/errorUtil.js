class ErrorUtil {

    attachErroInfo(error) {
        return {
            status: "Error",
            error: error.message
        };
    }
}

module.exports = new ErrorUtil();
