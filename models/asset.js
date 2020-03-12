// const mongoose = require('mongoose')

const assetSchema = ({
    asset_name:{
        type: String,
        required: 'asset name is required',
        max: 32,
        trim: true
    },
    date_added:{
        type: Date,
        required: 'original creation date required if known'
    },
    
});

// export model
// module.exports = mongoose.model('asset', assetSchema)