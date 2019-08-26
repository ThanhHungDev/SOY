module.exports = function(app, data){			
    var routeClient = require('./client.js');
    routeClient(app, data);	
    app.get('*', (req, res)=>{ res.status(404).send('không tìm thấy trang'); });
}