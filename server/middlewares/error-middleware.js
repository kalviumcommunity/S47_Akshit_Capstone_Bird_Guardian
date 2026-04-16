/**
 * Global Error Handling Middleware
 * Catch-all for errors passed to next(error) from controllers
 */
const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong on our end";
    const extraDetails = err.extraDetails || "Generic Backend Error";
  
    // Rich logging with method and path
    console.error(`[Error] ${req.method} ${req.path} | Status: ${status} | Message: ${extraDetails}`);
    
    // In production, we might want to hide extraDetails if they contain DB stacks
    // but for this capstone, we'll keep them for debugging
    return res.status(status).json({ 
        success: false,
        message, 
        extraDetails 
    });
  };
  
  module.exports = errorMiddleware;