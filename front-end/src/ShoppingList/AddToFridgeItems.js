export function getSelectedCheckboxItems(name) {
  let values = [];
  // grabs all checkboxes that are checked
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  checkboxes.forEach((checkbox) => {
    values.push(checkbox);
  });

  // returns arrays of all checkboxes that are checked
  return values;
}

export function compileAddToFridgeItems() {
  const storageitems = [
    {
      id: 1,
      food: "Carbonated Water - Wildberry",
      storage_time_short: 1,
      storage_time_medium: 1.5,
      storage_time_long: 2,
      category: 2,
    },
    {
      id: 2,
      food: "Rye Special Old",
      storage_time_short: 20,
      storage_time_medium: 30,
      storage_time_long: 40,
      category: 3,
    },
    {
      id: 3,
      food: "Bread - Bagels, Plain",
      storage_time_short: 37,
      storage_time_medium: 55.5,
      storage_time_long: 74,
      category: 1,
    },
    {
      id: 4,
      food: "Mix Pina Colada",
      storage_time_short: 1,
      storage_time_medium: 1.5,
      storage_time_long: 2,
      category: 3,
    },
    {
      id: 5,
      food: "Bread - White, Unsliced",
      storage_time_short: 29,
      storage_time_medium: 43.5,
      storage_time_long: 58,
      category: 1,
    },
    {
      id: 6,
      food: "Beef - Tenderloin Tails",
      storage_time_short: 15,
      storage_time_medium: 22.5,
      storage_time_long: 30,
      category: 1,
    },
  ];

  let objects = [];
  // model object
  const foodItem = {
    id: 1,
    title: "Apples",
    amount: "Lots",
    type: 0,
    dateadded: { $date: { $numberLong: 161448318100 } },
  };

  let vals = getSelectedCheckboxItems("itemCheckbox");

  for (let i = 0; i < vals.length; i++) {
    let add = Object.create(foodItem);
    add.id = vals[i].getAttribute("id");
    add.title = vals[i].getAttribute("value");
    add.type = vals[i].getAttribute("food");
    add.amount = vals[i].getAttribute("amount");
    add.dateadded = vals[i].getAttribute("date"); //April 1, 2021

    try {
      const findItem = storageitems.find((elem) => elem.food === add.title);
      add.daysleft = findItem.storage_time_medium;
    } catch (e) {
      if (add.type == 0) { //fruits
        add.daysleft = 10;
      } else if (add.type == 1) { //dairy
        add.daysleft = 21;
      } else if (add.type == 2) { //grain
        add.daysleft = 30;
      } else { //meats
        add.daysleft = 8;
      }
    }
    objects.push(add);
  }
  // returns array of objeccts of all items that are to be added
  return objects;
}
