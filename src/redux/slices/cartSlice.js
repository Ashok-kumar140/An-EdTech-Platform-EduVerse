import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


const initialState = {
    totalCourses: localStorage.getItem("totalCourses") ? JSON.parse(localStorage.getItem("totalCourses")) : 0,
    totalAmount: localStorage.getItem("totalAmount") ? JSON.parse(localStorage.getItem("totalAmount")) : 0,
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};


const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const course = action.payload
            const index = state.cart.findIndex((item) => item._id === course._id)

            if (index >= 0) {
                toast.error("Course already in cart")
                return;
            }

            state.cart.push(course);
            state.totalCourses++
            state.totalAmount += course.price

            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount))
            localStorage.setItem("totalCourses", JSON.stringify(state.totalCourses))

            toast.success("Course added to cart")
        },
        removeFromCart: (state, action) => {
            const courseId = action.payload
            const index = state.cart.findIndex((item) => item._id === courseId)

            if (index >= 0) {

                state.totalCourses--
                state.totalAmount -= state.cart[index].price
                state.cart.splice(index, 1)

                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount))
                localStorage.setItem("totalCourses", JSON.stringify(state.totalCourses))

                toast.success("Course removed from cart")
            }
        },
        resetCart: (state) => {
            state.cart = []
            state.totalAmount = 0
            state.totalCourses = 0

            localStorage.removeItem("cart")
            localStorage.removeItem("totalAmount")
            localStorage.removeItem("totalCourses")
        },
    },

});

export const { removeFromCart, resetCart, addToCart } = cartSlice.actions;

export default cartSlice.reducer;

