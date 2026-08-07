const ProductModel = require("../../models/product.model");

const VariantModel = require("../../models/variant.model");

const PRODUCT_MESSAGES = require("../../constants/productMessages");

const getVariants = async (req) => {

    const product = await ProductModel.findById(

        req.params.id
        
    );
    
    if (
    
        !product.length
    
    ) {
    
        throw new Error(
        
            PRODUCT_MESSAGES.PRODUCT_NOT_FOUND
        
        );
    
    }

    return await VariantModel.findByProduct(

        req.params.id

    );

};

module.exports = getVariants;