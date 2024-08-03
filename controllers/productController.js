const createProduct = async (req, res) => {
  res.send("Create working");
};

const getAllProducts = async (req, res) => {
  res.send("getall working");
};

const getSingleProduct = async (req, res) => {
  res.send("getsingle working");
};

const updateProduct = async (req, res) => {
  res.send("update working");
};

const deleteProduct = async (req, res) => {
  res.send("delete working");
};

const uploadImage = async (req, res) => {
  res.send("Upload image working");
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
