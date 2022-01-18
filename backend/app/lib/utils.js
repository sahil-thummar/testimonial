module.exports = {
    httpStatusCode: require('http-status-codes'),
    responseGenerators: (responseData, responseStatusCode, responseStatusMsg, responseErrors) => {
        const responseJson = {}
        responseJson['data'] = responseData
        responseJson['status_code'] = responseStatusCode
        responseJson['status_message'] = responseStatusMsg

        // errors
        if (responseErrors === undefined) {
            responseJson['response_error'] = []
        } else {
            responseJson['response_error'] = responseErrors
        }
        return responseJson;
    },

    savePhotoFromBrowser: function (local_image_path, file_new_path) {
        const fs = require("fs");
        fs.readFile(local_image_path, function (error, data) {
            if (error) {
                console.error(`error : ${error}`)
                return error;
            } else {
                fs.writeFile(file_new_path, data, 'binary', function (error) {
                    if (error) {
                        console.error(`error : ${error}`)
                        return error;
                    } else {
                        fs.unlink(local_image_path, function (error) {
                            if (error) {
                                console.error(`error : ${error}`)
                                return error;
                            } else {
                                return file_new_path;
                            }
                        });
                    }
                });
            }
        });
    }
}