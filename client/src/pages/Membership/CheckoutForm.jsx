
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import AxiosPublic from "../../Axios/AxiosBase";
import Swal from 'sweetalert2'
const CheckOutForm = () => {
    const { user } = useAuth()
    const [transactionId, setTransactionId] = useState('');
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");

    useEffect(() => {


        AxiosPublic.post('/create-payment-intent', { price: 5 })
            .then(res => {
                console.log('here', res.data.clientSecret,)
                setClientSecret(res.data.clientSecret)
                console.log('s', clientSecret)
            })




    }, [])


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
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }


        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            console.log('confirm error')
        }
        else {
            console.log('payment intent', paymentIntent)
            if (paymentIntent.status === 'succeeded') {
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);
            }
        }

        const payment = {
            email: user.email,
            transactionId: paymentIntent.id,
            date: new Date(),
            status: 'pending'
        }

        const res = await AxiosPublic.post('/payments', payment);
        console.log('payment saved', res.data);
        if (res.data?.paymentResult?.insertedId) {
            AxiosPublic.put(`/updatebadge/${user.email}`)
                .then(res => {
                    console.log(res.data)
                    Swal.fire({
                        title: "Congrats!You are now a premium member ",
                        showClass: {
                            popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
                        },
                        hideClass: {
                            popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
                        }
                    });
                })
        }



    };


    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="card-element">
                    Card Details
                </label>
                <div className="border border-gray-300 rounded p-3">
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    },
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={!stripe}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
                Pay
            </button>
        </form>

    );
};

export default CheckOutForm;