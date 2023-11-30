import { Box } from "@mui/material";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_PUBLISHABLE_KEY);

const Payment = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className=" w-full max-w-[700px] break-words border border-dashed bg-clip-border rounded-2xl border-stone-200 bg-light/30 p-8">
        <span className=" text-2xl font-bold">PAYMENT</span>
        <Box mt={5}>
          <Elements stripe={stripePromise}>
            <CheckOutForm />
          </Elements>
        </Box>
      </div>
    </div>
  );
};

export default Payment;
