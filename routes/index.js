var express = require('express'); // require express
var router = express.Router(); // create router function variable

//require controller scripts
const appController = require ('../controllers/appController');

/* GET home page. */
router.get('/', appController.homePage)

router.get('/sign-up', appController.signUpGet, appController.loginGet)
router.get('/login', appController.loginGet)

router.get('/account', appController.accountGet)
router.get('/pricing', appController.pricingGet)
router.get('/contact', appController.contactGet)
router.get('/admin', appController.adminGet)


//Account Routes
// router.get('/account/:name', function (req, res){
//   const name = req.params.name
//   res.render('account', { title: "Account Home", name})
// })
router.get('/account/add', appController.addAssetGet)
router.post('/account/add', appController.addAssetPost)
router.get('/account/edit', appController.editAssetGet)
router.post('/account/edit', appController.editAssetPost)
router.get('/account/delete', appController.deleteAssetGet)
router.post('/account/delete', appController.deleteAssetPost)
router.get('/account/assets', appController.listAllAssets)
router.get('/account/assets/asset', appController.viewAsset)

module.exports = router;
