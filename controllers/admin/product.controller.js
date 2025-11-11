const product = require("../../models/product.model");
const filterStatusHelper = require("../../helpers/filterStatus.js");
const searchHelper = require("../../helpers/search.js");

// [GET] /admin/products
module.exports.index = async (req, res) => {

    const filterStatus = filterStatusHelper(req.query);

    let find = {
        deleted: false
    };

    if (req.query.status) { 
        find.status = req.query.status; 
    }

    const objectSearch = searchHelper(req.query);

    if (objectSearch.keyword) { 
        find.title = objectSearch.regex;
    }

    //phân trang
    let objectPagination = {
        currentPage: 1,
        limitItems: 4
    };

    if(req.query.page){
        objectPagination.currentPage = parseInt(req.query.page);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    const countProducts = await product.countDocuments(find);
    const totalPage = Math.ceil(countProducts / objectPagination.limitItems);
    objectPagination.totalPage = totalPage;

    //end phân trang

    const products = await product.find(find).limit(objectPagination.limitItems).skip(objectPagination.skip);

    res.render("admin/pages/products/index", {
        pageTitle: "Danh sách sản phẩm",
        products: products,
        filterStatus: filterStatus,
        keyword: objectSearch.keyword,
        pagination: objectPagination
    });
};