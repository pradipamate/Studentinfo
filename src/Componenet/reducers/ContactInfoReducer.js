const Initialstate = [];

export default (state = Initialstate, action) => {
  switch (action.type) {

    case "ADD_LIST":
    return [...state, action.payload];

    case "FOR_UPDATED":
        let EditData = action.payload;
        const Data = state.find((item) => item.id === EditData.id);
        Data.name = EditData.name;
        Data.date = EditData.date;
        Data.phonenumber = EditData.phonenumber;
        Data.age = EditData.age;
        Data.address = EditData.address;
        Data.gender = EditData.gender;
        return [...state];
  
    case "REMOVE_ITEM_FOM_LIST":
      var selected = action.payload;
      var index = state.findIndex(x => x.id == selected);
      state.splice(index, 1);
      return [...state];

    default:
      return state;
  }
};

