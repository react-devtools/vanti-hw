export const listsSelector = (state) => Object.keys(state.value).length > 1;
export const isLoadingSelector = (state) => state.isLoading;
