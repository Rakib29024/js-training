
module.exports={
    menus:(req,res,next)=>{
        res.locals.currentMenu=req.path;
        next();
    }
}