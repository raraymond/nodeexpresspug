const Asset = require('../models/asset')

//render home page when index is requested
exports.homePage = (req, res) => {
    res.render('index', { title: "A CRUD APP BUILT WITH NODE JS EXPRESS AND PUG" });
  };
  //render sign up page when index is requested
exports.signUpGet = (req, res, next) => {
  //validate
  res.render('sign_up', { title: "Please register"})
}
  //render login page when index is requested
exports.loginGet = (req, res, next) => {
  //loigin process using the sign up function
  
  res.render('login', { title: "Please login"})
}
//render account home page****probably need to move to user controller
exports.accountGet = (req, res) => {
  res.render('account', { title: "Account Home"})
}
//render pricing info page
exports.pricingGet = (req, res) => {
  res.render('pricing', { title: "Pricing information"})
}
// render contact page
exports.contactGet = (req, res) => {
  res.render('contact', { title: "Contact information"})
}
//render admin page
exports.adminGet = (req, res) =>{
  res.render('admin',{title: 'Administration system'})
}
//add new asset
exports.addAssetGet = (req, res) =>{
  res.render('add_asset', {title: 'Add a new asset'})
}
//submit add new asset
exports.addAssetPost = async (req, res, next) =>{
  // res.json(req.body)
  try{
    const asset = new Asset(req.body);
    await asset.save()
    res.redirect("/account/")
  } catch(error) {
    next(error)
  }
}

//playing with filters
// show assets with monitoring enabled

exports.monitoringOn = async (req, res, next) => {
  try{
    const allAssets = await Asset.aggregate([
      {$match: {enable_monitoring: true }}
    ])
    const asset =  Asset.aggregate([
      { $group: {_id: 'monitoring_enabled'}}
    ])
    res.render('monitoring_on', {allAssets, asset})
  }catch(error){
    next(error)
  }
}
// continuing to filter monitoring disabled

exports.monitoringOff = async (req, res, next) => {
  try{
    const allAssets = await Asset.aggregate([
      {$match: {enable_monitoring: false }}
    ])
    const asset =  Asset.aggregate([
      { $group: {_id: 'monitoring_disabled'}}
    ])
    res.render('monitoring_off', {allAssets, asset})
  }catch(error){
    next(error)
  }
}


//edit existing asset
exports.editDeleteGet = (req, res) =>{
  res.render('edit_delete', {title: 'Edit/delete an existing asset'})
}
//submit add new asset
exports.editDeletePost = async (req, res, next) =>{
  // res.json(req.body)
  try{
    const assetId = req.body.asset_id || null;
    const assetName = req.body.asset_name || null;

    const assetData = await Asset.find({$or: [
      { _id: assetId},
      {asset_name: assetName }
    ]}).collation({
      locale: 'en',
      strength: 2
    });

    if (assetData.length > 0) {
      // res.json(assetData)
      res.render('asset_detail', {title: 'Asset Details', assetData})
      return
    }else{
      res.redirect('/account/assets/edit-delete')
    }
    
  } catch(error) {
    next(error)
  }
}
//edit existing asset

exports.listAllAssets = async (req, res, next) => {
  // res.render('all_assets' ,{title: 'All Assets'})
  try{
    const allAssets = await Asset.find();
    // const allAssets = await Asset.find({enable_monitoring: {$eq:true}});
    res.render('all_assets', {title: 'All Assets', allAssets})
    // res.json(allAssets) //test code
  }catch(error){
    next(error)
  }
}


exports.updateAssetGet = async (req, res, next) => {
  try {
    // console.log(req.params.asset_id)
    const asset = await Asset.findOne({ _id: req.params.assetId})
    // res.json(asset)
    res.render('add_asset', {title: 'Update Asset', asset})
  } catch (error) {
    next(error)
    
  }
}

exports.updateAssetPost = async (req, res, next) =>{
    try {
        const assetId = req.params.assetId;
        const asset = await Asset.findByIdAndUpdate(assetId, req.body, {new:true});
        res.redirect(`/account/assets/${assetId}`,asset)
      } catch (error) {
          next(error)
      
        }
      }
      
exports.deleteAssetGet = async (req, res, next) => {
    try {
        // console.log(req.params.asset_id)
        const asset = await Asset.findOne({ _id: req.params.assetId})
        // res.json(asset)
        res.render('add_asset', {title: 'DELETE ASSET THIS CANNOT BE UNDONE', asset})
      } catch (error) {
          next(error)
      
        }
      }
            
exports.deleteAssetPost = async (req, res, next) =>{
    try {
        const assetId = req.params.assetId;
        const asset = await Asset.findByIdAndRemove(assetId)
        res.redirect(`/account/assets/${assetId}`, asset)
      } catch (error) {
          next(error)
      
        }
      }

exports.viewAsset = async (req, res, next) =>{
  try{
    const assetParam = req.params.asset
    const assetData = await Asset.find({_id: assetParam})
    res.render('asset_detail', {title: 'View Asset Details', assetData})
    // res.json(assetData)
  }catch(error){
    next(error)
  }

}