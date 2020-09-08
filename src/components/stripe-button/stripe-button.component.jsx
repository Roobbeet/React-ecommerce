import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price}) => { //stripe bikin harga dalam cents
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HOxdFHvDk58Mi5xITeeMS28igeDfdRzhQVasRkvAs5hzFGD42ABuOWTjPbn3e3YZCXsE5v5KT4xCAkVMHxwIzLT00s36HBL6a'
    const onToken = token => {
        console.log(token);
        alert('Payment Success')
    }

    return (
        <StripeCheckout  
        label='Pay Now!'
        name='React e-commerce'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel={`Pay`}
        token={onToken} //function kalo udh disubmit
        stripeKey={publishableKey}
        bitcoin={true}
        />
    )
}
//testing purpose: 4242 4242 4242 4242 cvv: 123 date: future date
export default StripeCheckoutButton;