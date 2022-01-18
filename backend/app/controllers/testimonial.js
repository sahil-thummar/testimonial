const Joi = require("joi");
const Testimonial = require('../models/testimonial')
const { responseGenerators, httpStatusCode, savePhotoFromBrowser } = require('./../lib/utils')
const {
    TESTIMONIAL_ADDED,
    GET_TESTIMONIAL_LIST_SUCCESS,
    TESTIMONIAL_DETAIL_UPDATED,
    TESTIMONIAL_DETAIL_DELETED
} = require('../lib/success_messages.json');
const {
    PHOTO_REQUIRED,
    FAILED_TO_ADD_TESTIMONIAL,
    FAILED_TO_GET_TESTIMONIAL_LIST,
    FAILED_TO_GET_TESTIMONIAL_DETAIL,
    NO_TESTIMONIAL_FOUND
} = require('../lib/error_messages.json');

module.exports = {

    addTestimonial: async (req, res) => {
        try {
            const schema = Joi.object().keys({
                Name: Joi.string().required(),
                Post: Joi.string().required(),
                Description: Joi.string().required(),
            });
            const joiValue = await schema.validate(req.body);
            if (joiValue.error) {
                throw joiValue.error.details[0].message;
            }
            const requestData = joiValue.value;
            if (req.files != undefined && req.files.length > 0) {
                const newTestimonial = new Testimonial(requestData);
                newTestimonial.Photo = newTestimonial._id + req.files[0].originalname;
                await savePhotoFromBrowser(req.files[0].path, 'uploads/' + newTestimonial.Photo);
                await newTestimonial.save();
                return res.status(httpStatusCode.OK).send(responseGenerators({ newTestimonial }, httpStatusCode.OK, TESTIMONIAL_ADDED, false))
            } else {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, PHOTO_REQUIRED, true))
            }
        } catch (error) {
            console.error(`error in Add Testimonial => , ${error}`);
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, FAILED_TO_ADD_TESTIMONIAL, true))
        }
    },

    getTestimonials: async (req, res) => {
        try {
            const totalTestimonials = await Testimonial.count();
            if (totalTestimonials) {
                const testimonials = await Testimonial.find().select({ __v: 0 });
                return res.status(httpStatusCode.OK).send(responseGenerators({ totalTestimonials, testimonials }, httpStatusCode.OK, GET_TESTIMONIAL_LIST_SUCCESS, false))
            } else {
                return res.status(httpStatusCode.OK).send(responseGenerators({ totalTestimonials }, httpStatusCode.OK, NO_TESTIMONIAL_FOUND, true))
            }
        } catch (error) {
            console.error(`error in get All Testimonial => , ${error}`);
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, FAILED_TO_GET_TESTIMONIAL_LIST, true))
        }
    },

    updateTestimonial: async (req, res) => {
        try {
            const schema1 = Joi.object().keys({
                testimonialId: Joi.string().required()
            });
            const joiValue1 = await schema1.validate(req.query);
            if (joiValue1.error) {
                throw joiValue1.error.details[0].message;
            }

            const requestData1 = joiValue1.value;
            const testimonialData = await Testimonial.findOne({ _id: requestData1.testimonialId });
            if (!testimonialData) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, NO_TESTIMONIAL_FOUND, true))
            }
            const schema = Joi.object().keys({
                Name: Joi.string().optional(),
                Post: Joi.string().optional(),
                Description: Joi.string().optional(),
            });
            const joiValue = await schema.validate(req.body);
            if (joiValue.error) {
                throw joiValue.error.details[0].message;
            }
            const requestData = joiValue.value;
            testimonialData.Name = requestData.Name;
            testimonialData.Post = requestData.Post;
            testimonialData.Description = requestData.Description;
            if (req.files != undefined && req.files.length > 0) {
                testimonialData.Photo = testimonialData._id + req.files[0].originalname;
                await savePhotoFromBrowser(req.files[0].path, 'uploads/' + newTestimonial.Photo);
            }
            await testimonialData.save();
            return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, TESTIMONIAL_DETAIL_UPDATED, false))
        } catch (error) {
            console.error(`error in Update Testimonial => , ${error}`);
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, FAILED_TO_GET_TESTIMONIAL_DETAIL, true))
        }
    },

    deleteTestimonial: async (req, res) => {
        try {
            const schema = Joi.object().keys({
                testimonialId: Joi.string().required()
            });
            const joiValue = await schema.validate(req.query);
            if (joiValue.error) {
                throw joiValue.error.details[0].message;
            }
            const requestData = joiValue.value;
            const testimonialData = await Testimonial.findOne({ _id: requestData.testimonialId });
            if (!testimonialData) {
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, NO_TESTIMONIAL_FOUND, true))
            } else {
                testimonialData.Active = 0;
                await testimonialData.save();
                return res.status(httpStatusCode.OK).send(responseGenerators({}, httpStatusCode.OK, TESTIMONIAL_DETAIL_DELETED, false))
            }
        } catch (error) {
            console.error(`error in get Delete => , ${error}`);
            return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(responseGenerators({}, httpStatusCode.INTERNAL_SERVER_ERROR, FAILED_TO_GET_TESTIMONIAL_DETAIL, true))
        }
    },
}