const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.post("/orders/new", async (req, res) => {
    const newOrder = await addOrder(req.body, req.user);
    if (newOrder) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  });
};

const addOrder = async (order, userId) => {
  try {
    const id = uuidv4();
    const newOrder = await global.db.Order.create({
      id: id,
      userId: userId,
      content: order,
    });
    return newOrder;
  } catch (error) {
    console.log(error);
  }
};
