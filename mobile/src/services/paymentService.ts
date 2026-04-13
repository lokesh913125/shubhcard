import RazorpayCheckout from 'react-native-razorpay';
import { COLORS } from '../constants/appConstants';

const RAZORPAY_KEY_ID = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_your_id';

export const handlePayment = async (amount: number, email: string, contact: string) => {
  return new Promise((resolve, reject) => {
    const options = {
      description: 'ShubhCard Premium Subscription',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: RAZORPAY_KEY_ID,
      amount: amount * 100, // in paise
      name: 'ShubhCard',
      prefill: {
        email: email,
        contact: contact,
        name: 'User'
      },
      theme: { color: COLORS.maroon }
    };

    RazorpayCheckout.open(options)
      .then((data: any) => {
        resolve(data);
      })
      .catch((error: any) => {
        reject(error);
      });
  });
};
