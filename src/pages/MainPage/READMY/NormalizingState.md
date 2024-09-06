### Нормализация данных

1. Использую [нормализацию](https://redux.js.org/usage/structuring-reducers/normalizing-state-shape)
   redux-toolkit [createEntityAdapter](https://redux-toolkit.js.org/api/createEntityAdapter)
2. с помощью ее метода `addMany` добавляю данные в стейт
3. в slice

   ```javascript
   const initialStateMainPage: MainPageSchema = {
        ids: [],
        entities: {},
        items: [],
    };

    export const productsAdapter = createEntityAdapter<Product>({
       selectId: (product) => product._id,
    });

    // Селекторы
    export const getEntityProducts = productsAdapter.getSelectors<StateSchema>(
       (state) => state.mainPage || productsAdapter.getInitialState(),
    );

    const mainPageSlice = createSlice({
       name: 'mainPageSlice',
       initialState: productsAdapter.getInitialState(initialStateMainPage),
       reducers: {
       },
       extraReducers: (builder) => {
          builder
             .addCase(fetchViewProducts.fulfilled, (state, { payload }) => {

                // addMany добавляет в конец, setAll перезатирает
                if (payload.replace) {
                   productsAdapter.setAll(state, payload.items);
                } else {
                   productsAdapter.addMany(state, payload.items);
                }
             })

       },
    });
   ```

4. в компоненте получаем

   ```javascript
    const products: Product[] = useSelector(getEntityProducts.selectAll);
   ```
