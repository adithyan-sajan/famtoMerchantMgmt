const express = require('express');
const { registerUser, loginUser } = require('./controllers/authController');
const { addCategory } = require('./controllers/categoryController');
const { addMerchant, getAllMerchants, getSingleMerchant, updateMerchant, deleteMerchant } = require('./controllers/merchantController');
const jwtMiddleware = require('./middlewares/jwtMiddleware');

let router = new express.Router();


router.post('/auth/register', registerUser); 
router.post('/auth/login', loginUser);


router.post('/categories', jwtMiddleware, addCategory);


router.post('/merchants', jwtMiddleware, addMerchant);

router.get('/merchants', jwtMiddleware, getAllMerchants);

router.get('/merchants/:id', jwtMiddleware, getSingleMerchant);

router.patch('/merchants/edit/:id', jwtMiddleware, updateMerchant);

router.delete('/merchants/:id', jwtMiddleware, deleteMerchant);

module.exports = router;