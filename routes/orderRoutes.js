const { v4: uuidv4 } = require('uuid');
const checkAuth = require('../middlewares/check-auth');
const checkAdmin = require('../middlewares/check-admin');

module.exports = (app) => {
  app.post('/api/orders/new', checkAuth, async (req, res) => {
    const newOrder = await addOrder(req.body, req.user.id);
    if (newOrder) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  });

  app.post('/api/orders/admin/complete_order', checkAdmin, async (req, res) => {
    const order = await completeOrder(req.body.id);
    if (order) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  });

  app.get(
    '/api/orders/admin/incomplete_orders',
    checkAdmin,
    async (req, res) => {
      const orders = await getIncompleteOrders(req.body);
      if (orders) {
        res.status(200);
        res.send(orders);
      } else {
        res.status(500);
        res.send();
      }
    }
  );

  app.get('/api/orders/get_orders', checkAuth, async (req, res) => {
    const orders = await getUserOrders(req.user.id);
    if (orders) {
      res.status(200);
      res.send(orders);
    } else {
      res.status(500);
      res.send();
    }
  });

  app.get(
    '/api/orders/admin/all_orders/:page',
    checkAdmin,
    async (req, res) => {
      try {
        const page = req.params.page;
        const orders = await getAllOrders(page);
        if (orders.length < 9) {
          res.status(206);
          res.send(orders);
        } else {
          res.status(202);
          res.send();
        }
      } catch (error) {
        res.status(500);
        res.send();
      }
    }
  );
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
    const user = await addUserAddressAndPhoneNumber(
      userId,
      order.user.street,
      order.user.number,
      order.user.phoneNumber
    );
    if (user) {
      return newOrder;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const getAllOrders = async (page) => {
  const offset = parseInt(page, 10) * 9;
  try {
    const orders = await global.db.Order.findAll({
      offset,
      limit: 9,
      subQuery: false,
      order: [['createdAt', 'DESC']],
    });
    return orders;
  } catch (error) {
    console.log(error);
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

const getUserOrders = async (userId) => {
  try {
    const orders = await sequelize.query(
      `
      SELECT "id", "userId", "content", "completed", "createdAt" AS createdate, "updatedAt" 
      FROM "orders" AS "order" 
      WHERE "order"."userId" = '${userId}'
      `
    );
    return orders[0];
  } catch (error) {
    return false;
  }
};

const addUserAddressAndPhoneNumber = async (
  userId,
  street,
  number,
  phoneNumber
) => {
  try {
    const user = await global.db.User.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      user.address = street + ' ' + number;
      user.phoneNumber = phoneNumber;
      await user.save();
    }
    return true;
  } catch (error) {
    return false;
  }
};
