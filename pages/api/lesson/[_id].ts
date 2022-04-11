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
productRouter.post(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, curriculumId } = req.query;
    const { title, content, mediaId, mediaTime, filename } = req.body.lessons;
    // const { title, content, mediaId, filename } = req.body.lessons;

    const products = await Product.updateOne(
      {
        _id,
        curriculum: { $elemMatch: { _id: curriculumId } }
      },
      {
        $push: {
          "curriculum.$.lessons": {
            title,
            content,
            mediaId,
            mediaTime,
            filename
          }
        }
      }
    );

    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    // return res.send(products);
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 수정
productRouter.patch(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, curriculumId, lessonIndex } = req.query;
    const { title, content, mediaId, mediaTime, filename } = req.body.lessons;
    // const { title, content, mediaId, filename } = req.body.lessons;

    const products = await Product.updateOne(
      {
        _id,
        curriculum: { $elemMatch: { _id: curriculumId } }
        // "curriculum.lessons._id": lessonId
      },
      {
        $set: {
          ["curriculum.$.lessons." + lessonIndex]: {
            title,
            content,
            mediaId,
            mediaTime,
            filename
          }
        }
      }
    );

    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    // return res.send(products);
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 삭제
productRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, curriculumId, lessonId } = req.query;
    // const { title, content, mediaId, filename } = req.body.lessons;

    const products = await Product.updateOne(
      {
        _id,
        curriculum: { $elemMatch: { _id: curriculumId } }
      },
      { $pull: { "curriculum.$.lessons": { _id: lessonId } } }
    );

    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    // return res.send(products);
    return res.send(products);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// 레슨 순서 수정
productRouter.put(async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { _id, curriculumId } = req.query;
    // const { title, content, mediaId } = req.body.lessons;
    // const { title, content, mediaId, filename } = req.body.lessons;

    // console.log("title, content, mediaId", title, content, mediaId);

    const products = await Product.updateOne(
      {
        _id,
        curriculum: { $elemMatch: { _id: curriculumId } }
      },
      { $set: { "curriculum.$.lessons": req.body } }
    );

    // const products = await Product.updateOne(
    //   { _id },
    //   { $push: { lessons: { title, content, mediaId, filename } } },
    //   { upsert: true }
    // );
    return res.send(products);
    // return res.send(1);
  } catch (err) {
    console.log(JSON.stringify(err));
    res.status(500).send(JSON.stringify(err));
  }
});

// productRouter.delete(async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { _id, lessonId } = req.query;
//     console.log(_id, lessonId);
//     const products = await Product.findByIdAndUpdate(_id, {
//       $pull: { lessons: { _id: lessonId } }
//     }).exec();
//     return res.send(products);

//     // console.log(title, content, mediaId);
//     // const products = await Product.updateOne(
//     //   { _id },
//     //   { $push: { lessons: { title, content, mediaId, filename } } },
//     //   { upsert: true }
//     // );
//     // return res.send(products);
//   } catch (err) {
//     console.log(JSON.stringify(err));
//     res.status(500).send(JSON.stringify(err));
//   }
// });

export default productRouter;
