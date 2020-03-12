const Asset = require('../models/asset')

//render home page when index is requested
exports.homePage = (req, res) => {
    res.render('index', { title: "Home Page Name" });
  };
  //render sign up page when index is requested
exports.signUpGet = (req, res, next) => {
  //validate
  next()
  // res.render('sign_up', { title: "Please register"})
}
  //render login page when index is requested
exports.loginGet = (req, res, next) => {
  //loigin process using the sign up function
  next()
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
    res.redirect(`/account/assets/`)
  } catch(error) {
    next(error)
  }
}
//edit existing asset
exports.editAssetGet = (req, res) =>{
  res.render('edit_asset', {title: 'Edit an existing asset'})
}
//submit add new asset
exports.editAssetPost = async (req, res, next) =>{
  // res.json(req.body)
  try{
    const asset = new Asset(req.body);
    await asset.save()
    res.redirect(`/account/assets/`)
  } catch(error) {
    next(error)
  }
}
//edit existing asset
exports.deleteAssetGet = (req, res) =>{
  res.render('delete_asset', {title: 'Delete an existing asset'})
}
//submit add new asset
exports.deleteAssetPost = async (req, res, next) =>{
  // res.json(req.body)
  // try{
  //   const asset = new Asset(req.body);
  //   await asset.save()
  //   res.redirect(`/account/assets/`)
  // } catch(error) {
  //   next(error)
  // }
  res.render('delete_asset', {title: 'Delete an existing asset'})
}

exports.listAllAssets = async (req, res, next) => {
  res.render('all_assets' ,{title: 'All Assets'})
  // try{
  //   const allAssets = await Asset.find();
  //   res.render('all_assets', {title: 'All Assets', allAssets})
  //   res.json(allAssets)
  // }catch(error){
  //   next(error)
  // }
}

exports.viewAsset = (req, res) =>{
  res.render('asset', {title: 'View Asset Details'})
}