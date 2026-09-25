import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addToCartController(req, res) {
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "product is not found",
    });
  }

  const selectedSize = product.sizes.find((s) => s.size === size);

  if (!selectedSize) {
    return res.status(400).json({
      message: "Invalid Size",
    });
  }

  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Insuffcient Stock",
    });
  }

  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));

  const productInCart = cart.products.find(
    (p) => p.product.toString() === productId,
  );

  if (!productId.quantity + quantity > selectedSize) {
    return res.status(400).jsoN({
      message: "Insufficient stock",
    });
  }

  await cartModel.updateOne(
    {
      user: req.user.userId,
      "products.product": productId,
      "products.size": size,
    },
    {
      $inc: {
        "products.$"
      },
    },
  );

  await cartModel.findOneAndUpdate({user:req.user.userId},
    {
        $push:{
            products:{
                product:productId,
                quantity:productId,
                quantity:quantity,

            }
        }
    }
  )
}

export async function name(params) {
    const cart =
      (await cartModel.findOne({ user: req.user.userId })) ??
      (await cartModel.create({ user: req.user.userId }));

    return res.status(200).json({
        message:"Cart retrieved successfully",
        data:{
            cart:cart
        }
    })
}
