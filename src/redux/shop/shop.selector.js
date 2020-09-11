import {createSelector} from 'reselect';

export const selectShop = state => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    shop => shop.collections 
)//milih SHOP_DATA from shop.data.js

export const selectCollectionsForPreview = createSelector(
    [selectShopCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : [] //ngubah dari data dengan model object/hash jadi array
)

export const selectCollection = collectionUrlParam => createSelector(
    [selectShopCollections],
    //ada penyesuaian karena udh ga punya state sendiri
    collections => (collections ? collections[collectionUrlParam] : null) //collections.find(collection => collection.id === COLLECTION_ID_MAP[collectionUrlParam]) //MUST EXACT
)