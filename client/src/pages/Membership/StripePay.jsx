
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckoutForm";
import Navbar from '../../components/Shared/Navbar/Navbar'

const stripePromise = loadStripe(import.meta.env.VITE_Payment_key);


const StripePay = () => {
    return (
        <div>

            <Navbar></Navbar>


            <div className="max-w-md mx-auto mt-14 p-4 bg-gray-200 rounded-md shadow-md " >
                <h1 className="text-3xl font-semibold mb-4 text-center">Membership Page</h1>
                <p className="text-gray-700 text-center mb-6">
                    Unlock premium features by becoming a member. For just $5, you can enjoy exclusive benefits.
                </p>

                <div className="mb-8">
                    <Elements stripe={stripePromise}>
                        <CheckOutForm></CheckOutForm>
                    </Elements>
                </div>

                <p className="text-gray-500 text-center">
                    Premium members can post more than 5 posts and access other exciting features.
                </p>
            </div>




        </div>

    );
};

export default StripePay;