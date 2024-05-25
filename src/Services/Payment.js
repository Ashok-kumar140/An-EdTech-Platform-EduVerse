import axios from "axios";
import toast from "react-hot-toast";
import { paymentEndPoints } from "../apis/apis";
import razorpay_logo from '../../src/assets/logo/logo.png';
import { resetCart } from "../redux/slices/cartSlice";
import { setPaymentLoading } from "../redux/slices/courseSlice";

const loadScript = (src) => {

    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;

        script.onload = () => {
            resolve(true);
        }

        script.onerror = () => {
            resolve(false);
        }

        document.body.appendChild(script);
    })

}

export const buyCourse = async (courses, token, userDetails, dispatch, navigate) => {

    const toastId = toast.loading("Loading...");

    try {

        const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");

        if (!res) {
            toast.error("Razorpay SDK failed to load.")
        }

        const orderResponse = await axios.post(paymentEndPoints.COURSE_PAYMENT_API, { courses }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })

        if (!orderResponse.data.success) {
            throw new Error(orderResponse.data.message);
        }


        // console.log("ORDER RESPONSE:", orderResponse);
        const options = {
            key: process.env.RAZORPAY_KEY,
            currency: orderResponse.data.data.currency,
            amount: `${orderResponse.data.data.amount}`,
            order_id: orderResponse.data.data.id,
            name: "EduVerse",
            description: "Thank you for Purchasing the Course on EduVerse platform",
            image: razorpay_logo,
            prefill: {
                name: `${userDetails.firstName} ${userDetails.lastName}`,
                email: userDetails.email,
            },
            handler: function (response) {
                sendPaymentSuccessEmail(response, token, orderResponse.data.data.amount)
                verifyPayment({ ...response, courses }, token, dispatch, navigate)
            },
        }
        const paymentObject = new window.Razorpay(options)

        paymentObject.open()
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops! Payment Failed.")
            console.log(response.error)
        })

    } catch (error) {

        console.log("Payment API Error:", error);
        toast.error("Could not make payment");

    }
    toast.dismiss(toastId);

}

const sendPaymentSuccessEmail = async (response, token, amount) => {

    try {
        const emailResponse = await axios.post(paymentEndPoints.SEND_PAYMENT_SUCCESS_EMAIL, {
            order_id: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            amount
        }, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });



    } catch (error) {
        console.log("Error while calling send payment success API: ", error);
        toast.error("Could not send email");
    }

}

const verifyPayment = async (bodyData, token, dispatch, navigate) => {

    const toastId = toast.loading("Verifying Payment...");
    dispatch(setPaymentLoading(true));

    try {


        console.log("Bodydata: ", bodyData);

        const { data } = await axios.post(paymentEndPoints.COURSE_VERIFY_API, bodyData, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        });

        console.log("DATA FROM VERIFY PAYMENT: ", data);
        if (!data.success) {
            console.log("INSIDE CONDITION")
            throw new Error(data);
        }
        console.log("INSIDE CONDITION2")
        navigate('/dashboard/enrolled-courses');
        console.log("INSIDE CONDITION3")
        dispatch(resetCart());
        toast.success("Payment successful");

    } catch (error) {
        console.log("Error while calling verify payment API: ", error);
        toast.error("Could not verify payment");
    }

    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));

}