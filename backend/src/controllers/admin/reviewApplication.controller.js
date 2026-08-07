const service=require("../../services/admin/reviewApplication.service");

module.exports=async(req,res,next)=>{

    try{

        const result=await service(

            req.params.id,

            req.user.id,

            req.body

        );

        return res.status(200).json(result);

    }

    catch(error){

        next(error);

    }

};