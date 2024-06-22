const  requiredFieldsMiddleware = (requiredFields) => {
    return (req, res, next) => {
      const missingFields = requiredFields.filter((field) => !req.body[field]);
      if (missingFields.length > 0) {
        const error = new Error(
          `Missing required fields: ${missingFields.join(", ")}`
        );
        error.status = 400;
        return next(error);
      }
      next();
    };
  };


  module.exports = requiredFieldsMiddleware