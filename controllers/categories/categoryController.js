
const createCategory = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Category created"
        })
    }catch (error) {
        console.log(error.message);
    }
};

const getCategoryById = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "Category fetched successfully"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const updateCategoryById  = async(req, res) => {
    try {
        res.json({
            status: "success",
            data:"Category updated successfully"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const deleteCategoryById = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "Category deleted successfully"
        })
    }catch (error) {
        console.log(error.message);
    }
}


const getAllCategories = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all Categories data"
        })
    }catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    createCategory, 
    getCategoryById, 
    updateCategoryById, 
    deleteCategoryById,
    getAllCategories,
}