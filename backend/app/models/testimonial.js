const { Schema, model } = require('mongoose');

const testimonialSchema = new Schema({
    Name: { type: String },
    Photo: { type: String },
    Post: { type: String },
    Description: { type: String },
    Active: { type: Number, default: 1 }
}, {
    strict: true,
    timestamps: {
        createdAt: 'CreatedOn',
        updatedAt: 'LastUpdatedOn'
    }
})

module.exports = model("testimonial", testimonialSchema);