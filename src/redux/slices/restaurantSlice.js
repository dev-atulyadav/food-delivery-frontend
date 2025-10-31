import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
// import api from "../../services/api"; // Disabled: real API client
import StatusCode from "../../utils/StatusCode";

const initialState = {  
    restaurants: [],
    loading: false,
    error: null,
    status: StatusCode.IDEL,
    message: null,
    restaurant: null,
    userRestaurant: null,
    events: [],
    restaurantEvents: [],
    catergory: [],
}

//async thunk for fetch all restaurants
export const fetchResturants = createAsyncThunk('restaurants/fetchRestaurants', async () => {
    // Mocked restaurant list
    await new Promise(r => setTimeout(r, 500));
    return {
      message: 'Fetched restaurants (mock)',
      payload: Array.from({ length: 8 }).map((_, i) => ({
        id: i + 1,
        name: `Mock Restaurant ${i + 1}`,
        cuisine: ['Italian', 'Chinese', 'Indian', 'American'][i % 4],
        description: 'Delicious mock cuisine with seasonal specials and signature dishes.',
        images: [
          'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
          'https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg'
        ],
        rating: (4 + (i % 2) * 0.5).toFixed(1),
        deliveryTime: `${25 + i} min`,
        distance: `${(1.2 + i * 0.3).toFixed(1)} km`,
        open: i % 3 !== 0
      }))
    }
})

//async thunk for fetch resturant by id
export const fetchRestaurantById = createAsyncThunk('restaurants/fetchRestaurantById', async (restaurantId) => {
  // Mocked single restaurant by id
  await new Promise(r => setTimeout(r, 400));
  return {
    message: 'Fetched restaurant (mock)',
    payload: {
      id: Number(restaurantId),
      name: `Mock Restaurant ${restaurantId}`,
      description: 'This is a mock restaurant description for demo UI.',
      images: [
        'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg',
        'https://images.pexels.com/photos/262979/pexels-photo-262979.jpeg',
        'https://images.pexels.com/photos/262980/pexels-photo-262980.jpeg'
      ],
      openingHours: '10:00 AM - 10:00 PM',
      address: { country: 'Mockland', street: '123 Mock Street' }
    }
  }
})

//async thunk for create restaurant
export const createRestant = createAsyncThunk('restaurants/createRestaurant', async (restaurant) => {
  // Mock create
  await new Promise(r => setTimeout(r, 300));
  return { message: 'Restaurant created (mock)', payload: { ...restaurant, id: Date.now() } }
})

//async thunk for update restaurant
export const updateRestaurant = createAsyncThunk('restaurants/updateRestaurant', async (restaurant) => {
  await new Promise(r => setTimeout(r, 300));
  return { message: 'Restaurant updated (mock)', payload: restaurant }
})

//async thunk for delete restaurant
export const deleteRestaurant = createAsyncThunk('restaurants/deleteRestaurant', async (restaurantId) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Restaurant deleted (mock)', payload: restaurantId }
})

//async thunk for update restaurant status
export const updateRestaurantStatus = createAsyncThunk('restaurants/updateRestaurantStatus', async (restaurantId) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Restaurant status updated (mock)', payload: restaurantId }
})

//async thunk for get list of restaurant by keywords
export const searchRestaurants = createAsyncThunk('restaurants/searchRestaurants', async (keyword) => {
  await new Promise(r => setTimeout(r, 300));
  return { message: 'Search results (mock)', payload: [] }
})



//async thunk for create category
export const createCategory = createAsyncThunk('restaurants/createCategory', async (category) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Category created (mock)', payload: { ...category, id: Date.now() } }
})

//async thunk for get restaurant category
export const getRestaurantCategory = createAsyncThunk('restaurants/getRestaurantCategory', async (restaurantId) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Fetched categories (mock)', payload: ['pizza', 'burger', 'pasta'] }
})

//async thunk for create restaurant events
export const createRestaurantEvents = createAsyncThunk('restaurants/createRestaurantEvents', async (events) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Event created (mock)', payload: { ...events, id: Date.now() } }
})

//async thunk for get restaurant events
export const getRestaurantEvents = createAsyncThunk('restaurants/getRestaurantEvents', async (restaurantId) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Fetched events (mock)', payload: [] }
})

//async thunk for get restaurant events by id
export const getRestaurantEventsById = createAsyncThunk('restaurants/getRestaurantEventsById', async (eventId) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Fetched event (mock)', payload: { id: eventId } }
})

//async thunk for delete restaurant events
export const deleteRestaurantEvents = createAsyncThunk('restaurants/deleteRestaurantEvents', async (eventId) => {
  await new Promise(r => setTimeout(r, 200));
  return { message: 'Event deleted (mock)', payload: eventId }
})

const restaurantSlice = createSlice({
    name: 'restaurants',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          //fetch all restaurants
          .addCase(fetchResturants.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(fetchResturants.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurants = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(fetchResturants.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
        
          //fetch restaurant by id
          .addCase(fetchRestaurantById.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(fetchRestaurantById.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurant = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(fetchRestaurantById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //create restaurant
          .addCase(createRestant.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(createRestant.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.userRestaurant = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(createRestant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //update restaurant
          .addCase(updateRestaurant.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(updateRestaurant.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(updateRestaurant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //delete restaurant
          .addCase(deleteRestaurant.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(deleteRestaurant.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(deleteRestaurant.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //update restaurant status
          .addCase(updateRestaurantStatus.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(updateRestaurantStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(updateRestaurantStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          }) 

          //search restaurants
          .addCase(searchRestaurants.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(searchRestaurants.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurants = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(searchRestaurants.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
          
          //create category
          .addCase(createCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(createCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.catergory = [...state.catergory, action.payload.payload];
            state.status = StatusCode.SUCCESS;
          })
          .addCase(createCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //get restaurant category
          .addCase(getRestaurantCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(getRestaurantCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.catergory = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(getRestaurantCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
          
          //create restaurant events
          .addCase(createRestaurantEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(createRestaurantEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.events = [...state.events, action.payload.payload];
            state.restaurantEvents = [...state.restaurantEvents, action.payload.payload];
            state.status = StatusCode.SUCCESS;
          })
          .addCase(createRestaurantEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //get restaurant events
          .addCase(getRestaurantEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(getRestaurantEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.restaurantEvents = action.payload.payload;
            state.status = StatusCode.SUCCESS;
          })
          .addCase(getRestaurantEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })

          //delete restaurant events
          .addCase(deleteRestaurantEvents.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.status = StatusCode.LOADING;
          })
          .addCase(deleteRestaurantEvents.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.events = state.events.filter(event => event.id !== action.payload)
            state.restaurantEvents = state.restaurantEvents.filter(event => event.id !== action.payload)  
            state.status = StatusCode.SUCCESS;
          })
          .addCase(deleteRestaurantEvents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.status = StatusCode.ERROR;
          })
    }
})

export default restaurantSlice.reducer;