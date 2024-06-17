import { check, validationResult } from "express-validator";
import response from "../../models/responseApi.js";

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const {msg: errorMessage, path,value} = errors.array().at(0);
    return response.error(res, errorMessage, 400,null,`el error se encuentra en ${path}`);
  }
  next();
}

class MensajesComunes {
  static campoNecesario = 'Este campo es necesario';
  static errorEnFormato = 'Ha ocurrido un error en la petición, algún dato se encuentra erróneo';
  static tamanoErroneo = (tamano) => `Tamaño erróneo para este dato, el ideal es de ${tamano}`;
}

const singleValidation = (field, validationType, options = {}) => {
  switch (validationType) {
    case 'email':
      return check(field).exists().withMessage(MensajesComunes.campoNecesario)
                        .notEmpty().withMessage(MensajesComunes.campoNecesario)
                        .isEmail().withMessage(MensajesComunes.errorEnFormato);
    case 'text':
      return check(field).exists().withMessage(MensajesComunes.campoNecesario)
                        .notEmpty().withMessage(MensajesComunes.campoNecesario)
                        .isString().withMessage(MensajesComunes.errorEnFormato);
    case 'number':
      return check(field).exists().withMessage(MensajesComunes.campoNecesario)
                        .notEmpty().withMessage(MensajesComunes.campoNecesario)
                        .isNumeric().withMessage(MensajesComunes.errorEnFormato);
    case 'length':
      if (options.min && options.max) {
        return check(field).exists().withMessage(MensajesComunes.campoNecesario)
                          .notEmpty().withMessage(MensajesComunes.campoNecesario)
                          .isLength({ min: options.min, max: options.max }).withMessage(MensajesComunes.tamanoErroneo(options.max));
      }
      break;
    default:
      return null;
  }
}

const loginValidation = [
  singleValidation('email', 'email'),
  singleValidation('password', 'text'),
  handleValidationErrors
];

const validateUserData = [
  singleValidation('username', 'text'),
  singleValidation('email', 'email'),
  singleValidation('password', 'text'),
  singleValidation('numero', 'number'),
  singleValidation('image', 'text'),
  singleValidation('numero', 'length', { min: 11, max: 11 }),
  handleValidationErrors
];

export { validateUserData, singleValidation, loginValidation };
