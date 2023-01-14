import Joi from "joi";

export const postParticipantsSchemas = Joi.object({
    name: Joi.string().required()
});