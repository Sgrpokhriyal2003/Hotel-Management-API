const logger = (req, res, next) => {
    try{
        console.log(`[${new Date().toLocaleString()}] request made to: ${req.originalUrl}`);
        next();
    }

    catch(err){
        console.log(err);
    }
}

module.exports = logger;