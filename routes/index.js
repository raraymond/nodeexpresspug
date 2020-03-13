var express = require('express'); // require express
var router = express.Router(); // create router function variable

//require controller scripts
const appController = require ('../controllers/appController');

/* GET home page. */
router.get('/', appController.homePage)

router.get('/login', appController.loginGet)
router.get('/sign-up', appController.signUpGet)

router.get('/account', appController.accountGet)
router.get('/pricing', appController.pricingGet)
router.get('/contact', appController.contactGet)
router.get('/admin', appController.adminGet)


//Account Routes
// router.get('/account/:name', function (req, res){
    //   const name = req.params.name
    //   res.render('account', { title: "Account Home", name})
    // })
router.get('/account/assets', appController.listAllAssets)
router.get('/account/assets/add', appController.addAssetGet)
router.post('/account/assets/add', appController.addAssetPost)
router.get('/account/assets/edit-delete', appController.editDeleteGet)
router.post('/account/assets/edit-delete', appController.editDeletePost)

router.get('/account/assets/monitoring-on',appController.monitoringOn, appController.listAllAssets )
router.get('/account/assets/monitoring-off',appController.monitoringOff, appController.listAllAssets )
    

router.get('/account/assets/edit-delete/:assetId/update', appController.updateAssetGet)
router.post('/account/assets/edit-delete/:assetId/update', appController.updateAssetPost)

router.get('/account/assets/edit-delete/:assetId/delete', appController.deleteAssetGet)
router.post('/account/assets/edit-delete/:assetId/delete', appController.deleteAssetPost)

router.get('/account/assets/:asset', appController.viewAsset)
module.exports = router;
