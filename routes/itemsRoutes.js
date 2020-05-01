const { v4: uuidv4 } = require('uuid');

module.exports = (app) => {
  app.post('/items/addItem', async (req, res) => {
    const newItem = await addItem(req.body);
    if (newItem) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  });

  app.get('/items/:category', async (req, res) => {
    const category = req.params.category;
    const items = await getItemByCategory(category);
    res.send(items);
  });

  app.post('/items/editItems', async (req, res) => {
    try {
      const items = req.body;
      items.forEach(async (item) => {
        await editItem(item);
      });
      res.status(201);
      res.send();
    } catch (error) {
      res.status(500);
      res.send();
    }
  });
};

const addItem = async (item) => {
  const {
    name,
    price,
    quantity,
    tags,
    image,
    category,
    partitionable,
    fullWeightPrice,
    weight,
  } = item;

  try {
    const id = uuidv4();
    const newItem = await global.db.Item.create({
      id,
      name,
      price,
      quantity,
      tags: tags.split(','),
      link: image,
      category,
      partitionable,
      fullWeightPrice: parseFloat(fullWeightPrice),
      weight,
    });
    return newItem;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getItemByCategory = async (category) => {
  return await global.db.Item.findAll({
    where: {
      category,
    },
  });
};

const editItem = async (item) => {
  try {
    const itemToEdit = await global.db.Item.findOne({ where: { id: item.id } });
    if (itemToEdit) {
      itemToEdit.price = item.price;
      itemToEdit.quantity = item.quantity;
      await itemToEdit.save();
    }
  } catch (error) {
    console.log(error);
  }
};
