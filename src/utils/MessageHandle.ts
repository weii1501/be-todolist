import HandleError from "./HandleError";
import { Request, Response } from "express";

type BSFunction = (params: { [key: string]: any }) => Promise<any>;

const MessageHandle = async (
  bsfunction: BSFunction,
  req: Request,
  res: Response
) => {
  try {
    const parameters = req.method === "POST" ? req.body : req.query;
    const result = await bsfunction(parameters);
    res.json({ result: "success", content: result });
  } catch (e) {
    console.log("ERROR: ", e);
    if (e instanceof HandleError) {
      const response = JSON.parse(e.message);
      res
        .status(response?.status)
        .json({ result: "fail", message: response?.message });
    } else {
      res.status(500).json({ result: "fail", message: "Technical Error" });
    }
  }
};

export default MessageHandle;