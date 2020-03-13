const mongoose = require('mongoose')

const assetSchema = ({
    asset_name:{
        type: String,
        required: 'asset name is required',
        max: 32,
        trim: true
    },
    asset_notes:{
        type: String,
    },
    date_added:{
        type: Date,
        default: Date.now
    },
    image:{
        type: String,
        required: 'image to be processed is required'
    },
    publish_location: {
        type: String,
        required: 'where is this image publicly available proving ownership'
    },
    enable_monitoring: {
        type: Boolean,
        required: 'enabling must be enabled or disabled'
    },
    match_results: {
        type: Object,
    },
    owner_id: {
        type: String,
    }
});

// export model
module.exports = mongoose.model('asset', assetSchema)