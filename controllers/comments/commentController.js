
const createComment = async (req, res) => {
    try {
        res.json({
            status: "success",
            data: "Comment created"
        })
    }catch (error) {
        console.log(error.message);
    }
};

const getCommentById = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "Comment fetched successfully"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const updateCommentById  = async(req, res) => {
    try {
        res.json({
            status: "success",
            data:"Comment updated successfully"
        })
    }catch (error) {
        console.log(error.message);
    }
}

const deleteCommentById = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "Comment deleted successfully"
        })
    }catch (error) {
        console.log(error.message);
    }
}


const getAllComments = async(req, res) => {
    try {
        res.json({
            status: "success",
            data: "all Comments data"
        })
    }catch (error) {
        console.log(error.message);
    }
}


module.exports = {
    createComment, 
    getCommentById, 
    updateCommentById, 
    deleteCommentById,
    getAllComments,
}