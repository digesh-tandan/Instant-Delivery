module.exports = {

    // Existing Product Services

    addProduct: require("./addProduct.service"),

    getProducts: require("./getProducts.service"),

    getProductById: require("./getProductById.service"),

    updateProduct: require("./updateProduct.service"),

    deleteProduct: require("./deleteProduct.service"),

    // Existing Variant Services

    addVariant: require("./addVariant.service"),

    getVariants: require("./getVariants.service"),

    getVariantById: require("./getVariantById.service"),

    updateVariant: require("./updateVariant.service"),

    deleteVariant: require("./deleteVariant.service"),

    // Product Image Services

    addProductImage: require("./addProductImage.service"),
    
    getProductImages: require("./getProductImages.service"),
    
    updateProductImage: require("./updateProductImage.service"),
    
    deleteProductImage: require("./deleteProductImage.service"),

    searchProducts: require("./searchProducts.service"),

    setProductOffer: require("./setProductOffer.service"),
    
    removeProductOffer: require("./removeProductOffer.service"),
    
    updateStock: require("./updateStock.service")

};