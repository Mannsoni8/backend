import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export async function createProduct(req, res) {
  console.log(req.body);
  console.log(req.files);

  res.status(200).json({
    message: "Dummy response",
  });

  const fileUrls = []
  for(let i=0;i<req.files.length;i++){
    const responce = await uploadFile({
      buffer:req.files[ i ].buffer,
      filename:req.files[ i ].originalname
    })
    console.log(responce)
  }
}
// non-handel  attack - ddos ,

export async function listAllProducts(req,res) {
  
  const products = await productModel.find()

  res.status(200)
}