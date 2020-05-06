const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.post("/api/items/addItem", async (req, res) => {
    const newItem = await addItem(req.body);
    if (newItem) {
      res.status(201);
      res.send();
    } else {
      res.status(500);
      res.send();
    }
  });

  app.post("/api/items/editItems", async (req, res) => {
    try {
      const items = req.body;
      items.forEach(async (item) => {
        await editItem(item);
      });
      res.status(201);
      res.send(items);
    } catch (error) {
      res.status(500);
      res.send();
    }
  });

  app.get("/api/items/search/:searchterms/:page", async (req, res) => {
    try {
      const searchTerm = req.params.searchterms;
      const page = req.params.page;
      const items = await getItemsBySearch(searchTerm, page);
      if (items.length < 9) {
        res.status(206);
      } else {
        res.status(202);
      }
      res.send(items);
    } catch (error) {
      res.status(500);
      res.send();
    }
  });

  app.get("/api/items/get_all/:page", async (req, res) => {
    try {
      const page = req.params.page;
      const items = await getAllItems(page);
      if (items.length < 9) {
        res.status(206);
      } else {
        res.status(202);
      }
      res.send(items);
    } catch (error) {
      res.status(500);
      res.send(error);
    }
  });

  app.get("/api/admin/items/:category", async (req, res) => {
    const category = req.params.category;

    const items = await getAllItemsByCategory(category);
    if (items) {
      res.status(201);
      res.send(items);
    } else {
      res.status(501);
      res.send("Couldn't get the items");
    }
  });

  app.get("/api/items/:category/:page", async (req, res) => {
    const category = req.params.category;
    const page = req.params.page;
    const items = await getItemByCategory(category, page);
    if (items.length < 9) {
      res.status(206);
    } else {
      res.status(202);
    }
    res.send(items);
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

  const tagsToAdd = [];

  const formattedTags = tags.trim().split(",");

  formattedTags.forEach((tag) => {
    tagsToAdd.push(tag);
  });

  try {
    const id = uuidv4();
    const newItem = await global.db.Item.create({
      id,
      name,
      price,
      quantity,
      tags: tagsToAdd,
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

const getItemByCategory = async (category, page) => {
  const offset = parseInt(page, 10) * 9;
  try {
    return await global.db.Item.findAll({
      where: {
        category,
      },
      offset,
      limit: 9,
      subQuery: false,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const getAllItemsByCategory = async (category) => {
  try {
    return await global.db.Item.findAll({
      where: {
        category,
      },
    });
  } catch (error) {
    return false;
  }
};

const getAllItems = async (page) => {
  const offset = parseInt(page, 10) * 9;
  try {
    return await global.db.Item.findAll({
      offset,
      limit: 9,
      subQuery: false,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

const editItem = async (item) => {
  try {
    const itemToEdit = await global.db.Item.findOne({ where: { id: item.id } });
    if (itemToEdit) {
      itemToEdit.price = item.price;
      itemToEdit.quantity = item.quantity;
      itemToEdit.fullWeightPrice = item.fullWeightPrice;
      await itemToEdit.save();
    }
  } catch (error) {
    console.log(error);
  }
};

const getItemsBySearch = async (searchTerm, page) => {
  searchTerm = searchTerm.split("+");
  const offset = parseInt(page, 10) * 9;
  try {
    const items = await sequelize.query(`
      SELECT * FROM items 
      WHERE '{${searchTerm}}' && tags
      LIMIT 9
      OFFSET ${offset}
    `);
    return items[0];
  } catch (error) {
    return false;
  }
};
