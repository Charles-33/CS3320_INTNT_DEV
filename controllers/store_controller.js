const FRYS_ELECTRONICS = [
    {
        "storeItemId" : 0,
        "storeItem" : "1 motherboard"
    },
    {
        "storeItemId" : 1,
        "storeItem" : "nothing"
    },
    {
        "storeItemId": 2,
        "storeItem" : "maybe a computer"
        
    },
    {
        "storeItemId":3,
        "storeItem" : "apple"
    },
    {
        "storeItemId":4,
        "storeItem" : "app"
    },
    {
        "storeItemId":5,
        "storeItem" : "application"
    }

];

const getStoreItem = (req, res) => {
    let storeItem = FRYS_ELECTRONICS.find( (item) => {return item.storeItemId == req.params.StoreItemId});
    res.send( storeItem );
}

const storeQuery = (req, res) => {
    let query = req.query.query;
    let result = FRYS_ELECTRONICS.filter( item => item.storeItem.indexOf(query) !== -1 );
    res.send( result );
    
}

exports.getStoreItem = getStoreItem;
exports.storeQuery = storeQuery;