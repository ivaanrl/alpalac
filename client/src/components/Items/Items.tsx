import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Item, { itemInterface } from "../Items/Item/Item";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

const Items = (props: { itemsArr: itemInterface[] }) => {
  const { itemsArr } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      {itemsArr.map((item) => {
        const {
          id,
          name,
          price,
          quantity,
          tags,
          link,
          category,
          partitionable,
          fullWeightPrice,
        } = item;
        return (
          <Item
            id={id}
            name={name}
            price={price}
            quantity={quantity}
            tags={tags}
            link={link}
            category={category}
            partitionable={partitionable}
            fullWeightPrice={fullWeightPrice}
            key={id}
          />
        );
      })}
    </div>
  );
};

export default Items;
