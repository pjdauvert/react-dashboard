// Import Actions

// Initial State
const initialState = {};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

/* Selectors */
export const getData = (state) => {
  return state.app;
}

// Export Reducer
export default AppReducer;
