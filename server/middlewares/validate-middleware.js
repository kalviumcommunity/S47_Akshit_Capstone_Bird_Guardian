const validate = (schema) => async (req, res, next) => {  // schema means signinSchema that we are passing from auth-validator.js
    try {
      const parseBody = await schema.parseAsync(req.body);
      req.body = parseBody;
      return next();
    } catch (err) {
      const status = 422;
      const message = "Fill the input properly";
      const extraDetails = err.errors[0].message
    //   const extraDetails = err.issues.map((curElem) => curElem.message);
  
      const error = {
        status,
        message,
        extraDetails,
      };

      console.log(error)
  
      next(error);
    }
  };
  
  module.exports = validate;
   