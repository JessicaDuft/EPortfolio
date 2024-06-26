const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
}




// Render room list view
const renderRoomList = (req, res, responseBody) => {
    let message = null;
    let pageTitle = process.env.npm_package_description + ' - Room';

    if (!(responseBody instanceof Array)) {
        message = 'API lookup error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "No rooms exist in database!";
        }
    }

    res.render('rooms', {
        title: pageTitle,
        rooms: responseBody,
        message
    });

};






// Get room list, sorted in ascending order  
const sortRoomsAsc = (req, res) => {
    const path = '/api/sortUp';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {},
    };
    console.info('>> sortController.sortRoomsAsc calling ' +
        requestOptions.url);
    
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            if(err) {
                console.error(err);
            }
            renderRoomList(req, res, body);
        }
    );
};






module.exports = {
    
    sortRoomsAsc
}