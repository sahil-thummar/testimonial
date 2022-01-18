const testimonialRoute = require('./testimonial')

module.exports = function(app) {
    app.use('/api/testimonial', testimonialRoute)
}