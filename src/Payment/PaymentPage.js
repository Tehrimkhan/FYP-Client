import React, { useEffect, useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import { loadStripe } from "@stripe/stripe-js";
import { API } from "../api/config";

const stripePromise = loadStripe(
  "pk_test_51OBalnCqGjyjTkAY9dTa4EdIxHfyluvV2pJtbExYurNHYgerZ0v3wnM4kz97bbIfgQ55YRbGPAqpxphvx0K6R2AC00CdB5YbIX"
);

const PaymentPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const paymentData = route.params?.paymentData;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handlePayment = async () => {
      try {
        const token = API.defaults.headers.common["Authorization"];

        if (!token || token.trim() === "") {
          alert("Authorization token missing. Please log in.");
          return;
        }
        const stripe = await stripePromise;
        const response = await API.post(
          "/post/create-checkout-session",
          paymentData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const session = response.data;

        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        setIsLoading(false);

        if (result.error) {
          console.error(result.error);
          alert("Error processing payment");
        } else {
          alert("Payment Successful!");
          navigation.navigate("Dashboard");
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        alert("Error processing payment");
      }
    };

    handlePayment();
  }, []);

  return (
    <View>
      <Text>Processing Payment...</Text>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

export default PaymentPage;
