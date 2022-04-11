import type { NextApiRequest, NextApiResponse } from "next";
import createHandler from "../middleware";
import Product from "../models/product";

const productRouter = createHandler();

// get
productRouter.get(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;

    const products = await Product.find({ _id });
    console.log(products);
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 추가.
productRouter.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const { title, content, mediaId, filename } = req.body.lessons;

    const products = await Product.updateOne(
      { _id },
      { $push: { lessons: { title, content, mediaId, filename } } },
      { upsert: true }
    );
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 추가. put --> 2022.02.20 작업중
productRouter.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id } = req.query;
    const products = await Product.findByIdAndUpdate(_id, req.body, {
      new: true
    });
    return res.send(products);

    // console.log(title, content, mediaId);
    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    // return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

productRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, lessonId } = req.query;
    const products = await Product.findByIdAndUpdate(_id, {
      $pull: { lessons: { _id: lessonId } }
    }).exec();
    return res.send(products);

    // console.log(title, content, mediaId);
    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    // return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

export default productRouter;
