import { Box, Button, Divider } from "@mui/material";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useParams } from "react-router-dom";
import useTestById from "../../../hooks/useTestById";
import ApplyCoupon from "./ApplyCoupon";
import useAuthentication from "../../../hooks/useAuthentication";

const CheckOutForm = () => {
  const [coupon, setCoupon] = useState({ coupon: "", discount: 0 });
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const axios = useAxiosSecure();
  const { id } = useParams();
  const { data, loading } = useTestById(id);
  const { user } = useAuthentication();

  const applyCouponCode = (value) => {
    setCoupon(value);
  };

  const subtotal = loading && !data?.price ? 0 : data?.price;
  const totalPrice =
    coupon?.coupon === "valid" ? subtotal - coupon.discount : subtotal;

  useEffect(() => {
    if (totalPrice > 0) {
      axios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: error.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      console.log("Payment Method", paymentMethod);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error");
    }
    if (paymentIntent.status === "succeeded") {
      // now save the payment in the database
      const booking = {
        email: user.email,
        price: totalPrice,
        transactionId: paymentIntent.id,
        date: new Date(),
        test: {
          name: data?.title,
          id: id,
        },
        status: "pending",
      };

      axios
        .post("/booking-test", booking)
        .then((res) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Booking Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div>
      <Box my={2}>
        <Box
          sx={{
            py: 2,
          }}>
          <ApplyCoupon ApplyCouponValue={applyCouponCode} price={subtotal} />
        </Box>
        <Divider />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className=" text-xl font-semibold py-1">Subtotal : </h1>
          <h1 className=" text-xl font-semibold py-1">{subtotal}</h1>
        </Box>
        <Divider />
        {coupon.coupon === "valid" && (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <h1 className=" text-xl font-semibold py-1">Discount : </h1>
              <h1 className=" text-xl font-semibold py-1 text-sky-500">
                - {coupon.discount}
              </h1>
            </Box>
            <Divider />
          </>
        )}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <h1 className=" text-xl font-semibold py-1">Total : </h1>
          <h1 className=" text-xl font-semibold py-1">{totalPrice}</h1>
        </Box>
        <Divider />
      </Box>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button
            sx={{ mt: 5 }}
            disabled={!stripe || !clientSecret}
            type="submit"
            variant="contained"
            disableElevation>
            Payment
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default CheckOutForm;
