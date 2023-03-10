import Joi from "joi";

export const postParticipantsSchemas = Joi.object({
    name: Joi.string().required()
});

export const postMessages = Joi.object({
    to: Joi.string().required(),
    type: Joi.valid("message", "private_message").required(),
    text: Joi.string().required()
});

export const limitSchema = Joi.number().positive();