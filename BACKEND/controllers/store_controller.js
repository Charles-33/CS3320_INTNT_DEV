const { json } = require('express');
const StoreItem = require('../models/storeItem_schema');

const createStoreItem = async (req, res) => {
    const result = await StoreItem.create(req.body);
    res.send( result.toObject() ? result.toObject() : 404);
};


const getAllStoreItems = async (req, res) => {
    if( req.query.query ){
        let query = req.query.query;
        let regex = new RegExp(query, 'i');
        let results = await StoreItem.find({ name: {$regex: regex }}); 
        res.send( results ? results : 404);
    }
    let items;
    try{
        items = await StoreItem.find().lean();
    }catch(err){
        console.log(err);
    }
    res.send( items ? items: 404);
}

const getLastTen = async(req, res) =>{
    return res.send(req.session.lastItemViewed || '');
}

const getStoreItem = async (req, res) => {
    let StoreItemId = req.params.StoreItemId; 

    let storeItem = await StoreItem.findById(StoreItemId);

    if( !req.session.lastItemViewed ){
        req.session.lastItemViewed = [storeItem];
    }
    else{
        req.session.lastItemViewed.push(storeItem);
    }
    res.send( storeItem? storeItem: 404);
}

exports.getLastTen = getLastTen;
exports.getStoreItem = getStoreItem;
exports.createStoreItem = createStoreItem;
exports.getAllStoreItems = getAllStoreItems;