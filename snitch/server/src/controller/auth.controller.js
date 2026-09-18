import userModel from "../models/user.model";

/**
 * @description Register an user and save the data from req.body
 * @param req express.Request
 * @param req.body Object
 * @param req.body.email String
 * @param req.body.name String
 * @param req.body.password String
 */

export async function registerController(req, res) {
  const { email, name, password } = req.body;

  const isUserAlreadyExist = await userModel.findOne({
    eamil,
  });

  if (isUserAlreadyExist) {
    return res.status(400).json({
      message: "User is already exists with this email",
      error: [
        {
          fiels: "email",
          message: "User is already exists with this email",
        },
      ],
    });
  }
}
