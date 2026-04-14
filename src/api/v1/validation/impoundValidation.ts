import Joi from "joi";

// Post operation schemas organized by request part
export const postSchemas = {
    // POST /impound - Create new post
    create: {
        body: Joi.object({
            plateNumber: Joi.string().pattern(/^[A-Za-z0-9\-]{2,10}$/).required().messages({
                "any.required": "Vehicle plate number is required",
                "string.empty": "Vehicle plate number cannot be empty",
                "string.pattern.base": "Plate number must be 2–10 characters and alphanumeric",
            }),
            vehicleType: Joi.string().valid('car', 'truck', 'van', 'bus', 'suv', 'motorcycle').required().messages({
                "any.required": "Vehicle type is required",
                "string.empty": "Vehicle type cannot be empty",
                "any.only": "Vehicle type must be one of: car, truck, van, bus, suv, motorcycle",
            }),
            color: Joi.string().required().messages({
                "any.required": "Vehicle color is required",
                "string.empty": "Vehicle color cannot be empty",
            }),
            daysInLot: Joi.number().min(0).integer().required().messages({
                "any.required": "Number of days in lot is required",
                "string.empty": "numbr of days in lot cannot be empty",
                "number.min": "Number of days in lot cannot be negative",
            }),
            releaseFee: Joi.number().min(0).precision(2).required().messages({
                "any.required": "Release fee is required",
                "string.empty": "Release fee cannot be empty",
                "number.min": "Release fee cannot be negative",
            }),
        }).unknown(false),
    },

    // GET /impound/:id - Get single post
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Impound ID is required",
                "string.empty": "Impound ID cannot be empty",
            }),
        }),
        query: Joi.object({
            include: Joi.string().valid("comments", "author").optional(),
        }),
    },

    // PUT /impound/:id - Update post
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Impound ID is required",
                "string.empty": "Impound ID cannot be empty",
            }),
        }),
        body: Joi.object({
            plateNumber: Joi.string().pattern(/^[A-Za-z0-9\-]{2,10}$/).required().messages({
                "any.required": "Vehicle plate number is required",
                "string.empty": "Vehicle plate number cannot be empty",
                "string.pattern.base": "Plate number must be 2–10 characters and alphanumeric",
            }),
            vehicleType: Joi.string().valid('car', 'truck', 'van', 'bus', 'suv', 'motorcycle').required().messages({
                "any.required": "Vehicle type is required",
                "string.empty": "Vehicle type cannot be empty",
                "any.only": "Vehicle type must be one of: car, truck, van, bus, suv, motorcycle",
            }),
            color: Joi.string().required().messages({
                "any.required": "Vehicle color is required",
                "string.empty": "Vehicle color cannot be empty",
            }),
            daysInLot: Joi.number().min(0).integer().required().messages({
                "any.required": "Number of days in lot is required",
                "string.empty": "numbr of days in lot cannot be empty",
                "number.min": "Number of days in lot cannot be negative",
            }),
            releaseFee: Joi.number().min(0).precision(2).required().messages({
                "any.required": "Release fee is required",
                "string.empty": "Release fee cannot be empty",
                "number.min": "Release fee cannot be negative",
            }),
        }).unknown(false),
    },

    // DELETE /impound/:id - Delete post
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Impound ID is required",
                "string.empty": "Impound ID cannot be empty",
            }),
        }),
    },
};