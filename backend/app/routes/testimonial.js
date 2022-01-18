const express = require('express');
const router = express.Router();
const testimonialController = require("./../controllers/testimonial");

router.post('/add', testimonialController.addTestimonial);
router.get('/get', testimonialController.getTestimonials);
router.put('/update', testimonialController.updateTestimonial);
router.delete('/delete', testimonialController.deleteTestimonial);

module.exports = router;