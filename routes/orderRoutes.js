const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
  app.post('/orders/new', async (req, res) => {
    const newOrder = await addOrder(req.body, req.user.id);
    if (newOrder) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  });

  app.post('/orders/admin/complete_order', async (req, res) => {
    const order = await completeOrder(req.body.id);
    if (order) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  });

  app.get('/orders/admin/incomplete_orders', async (req, res) => {
    const orders = await getIncompleteOrders(req.body);
    if (orders) {
      res.status(200);
      res.send(orders);
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
      content: order.shoppingCart,
      completed: false,
    });
    const user = await addUserAddress(
      userId,
      order.user.street,
      order.user.number
    );
    if (user) {
      return newOrder;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getIncompleteOrders = async () => {
  try {
    const orders = await sequelize.query(`
    SELECT orders.id, content, completed,orders."createdAt" AS createdate,
           Users."firstName" AS firstName,Users."lastName" AS lastName,
           Users."address" as address 
    FROM orders 
    INNER JOIN users ON users.id = orders."userId"
    WHERE completed = false`);
    return orders[0];
  } catch (error) {
    return false;
  }
};

const completeOrder = async (orderId) => {
  try {
    const order = await global.db.Order.findOne({
      where: {
        id: orderId,
      },
    });
    if (order) {
      order.completed = true;
      await order.save();
    }
    console.log(order);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const addUserAddress = async (userId, street, number) => {
  try {
    const user = await global.db.User.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      user.address = street + ' ' + number;
      await user.save();
    }
    return true;
  } catch (error) {
    return false;
  }
};
