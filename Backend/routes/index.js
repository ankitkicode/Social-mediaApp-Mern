var express = require('express');
const { RegisterController, LoginController } = require('../controllers/Authcontroller');
const isLoggedIn = require('../middlewares/isLoggedIn');
const { createPostController, allPosts } = require('../controllers/postController');
const upload = require('../middlewares/multerConfig');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/register',RegisterController);
router.post('/login',LoginController);
router.get('/allposts',isLoggedIn,allPosts);
router.post('/create-post',isLoggedIn, upload.single('profileImage'), createPostController);

module.exports = router;
