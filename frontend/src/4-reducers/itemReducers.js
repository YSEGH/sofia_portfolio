const addItemReducer = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ITEM_REQUEST":
      return { loading: true };
    case "ADD_ITEM_SUCCESS":
      return { loading: false, success: true };
    case "ADD_ITEM_FAIL":
      return { loading: false, error: action.payload };
    case "ITEM_RESET":
      return {};
    default:
      return state;
  }
};

const updateItemReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_ITEM_REQUEST":
      return { loading: true };
    case "UPDATE_ITEM_SUCCESS":
      return { loading: false, success: true };
    case "UPDATE_ITEM_FAIL":
      return { loading: false, error: action.payload };
    case "ITEM_RESET":
      return {};
    default:
      return state;
  }
};

const getItemsReducer = (
  state = { loading: true, items: [], count: 0 },
  action
) => {
  switch (action.type) {
    case "GET_ITEM_REQUEST":
      return { ...state, loading: true };
    case "GET_ITEM_SUCCESS":
      return {
        loading: false,
        items: [...state.items, ...action.payload.items],
        count: action.payload.count,
      };
    case "GET_ITEM_FAIL":
      return { loading: false, error: action.payload };
    case "RESET_GET_ITEM":
      return { loading: true, items: [], count: 0 };
    default:
      return state;
  }
};

const getFiltersReducer = (state = { loading: true, filters: [] }, action) => {
  switch (action.type) {
    case "GET_FILTERS_REQUEST":
      return { loading: true, filters: [] };
    case "GET_FILTERS_SUCCESS":
      return { loading: false, filters: action.payload };
    case "GET_FILTERS_FAIL":
      return { loading: false, error: action.payload };
    case "ITEM_RESET":
      return { loading: true, filters: [] };
    default:
      return state;
  }
};

const deleteItemReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_ITEM_REQUEST":
      return { loading: true };
    case "DELETE_ITEM_SUCCESS":
      return { loading: false, success: true };
    case "DELETE_ITEM_FAIL":
      return { loading: false, error: action.payload };
    case "ITEM_RESET":
      return {};
    default:
      return state;
  }
};

const deleteFileReducer = (state = {}, action) => {
  switch (action.type) {
    case "DELETE_FILE_REQUEST":
      return { loading: true };
    case "DELETE_FILE_SUCCESS":
      return { loading: false, success: true };
    case "DELETE_FILE_FAIL":
      return { loading: false, error: action.payload };
    case "ITEM_RESET":
      return {};
    default:
      return state;
  }
};

export {
  getItemsReducer,
  getFiltersReducer,
  addItemReducer,
  updateItemReducer,
  deleteItemReducer,
  deleteFileReducer,
};
