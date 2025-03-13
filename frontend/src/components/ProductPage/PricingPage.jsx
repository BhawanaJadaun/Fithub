import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Typography, Button } from "@material-tailwind/react";

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-4 w-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

const PricingCard = ({ plan, price, features }) => {
  return (
    <div className="border-gradient w-full max-w-[20rem] rounded-lg p-1">
      <Card color="gray" variant="gradient" className="w-full h-full p-8 bg-second text-white shadow-lg rounded-lg">
        <CardHeader floated={false} shadow={false} color="transparent" className="m-0 mb-8 rounded-none border-b border-white/20 pb-8 text-center">
          <Typography variant="small" color="white" className="font-normal uppercase tracking-wider">
            {plan}
          </Typography>
          <Typography variant="h1" color="white" className="mt-6 flex justify-center gap-1 text-6xl sm:text-7xl font-bold">
            <span className="mt-2 text-3xl sm:text-4xl">$</span>
            {price}
            <span className="self-end text-3xl sm:text-4xl">/mo</span>
          </Typography>
        </CardHeader>
        <CardBody className="p-0">
          <ul className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-4">
                <span className="rounded-full border border-third bg-first p-1">
                  <CheckIcon />
                </span>
                <Typography className="font-normal">{feature}</Typography>
              </li>
            ))}
          </ul>
        </CardBody>
        <CardFooter className="mt-12 p-0">
          <Button size="lg" color="blue-gray" className="bg-primary hover:bg-third hover:scale-105 transition-transform duration-300 text-white p-3 focus:outline-none focus:ring focus:ring-blue-500" ripple={false} fullWidth={true}>
            Choose Plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

const PricingPage = () => {
  const pricingPlans = [
    {
      plan: "Basic",
      price: "19",
      features: ["Access to all gym equipment", "1 group class per week", "Open from 6am to 9pm", "Basic support"],
    },
    {
      plan: "Standard",
      price: "29",
      features: ["Access to all gym equipment", "3 group classes per week", "Open 24/7", "Priority support"],
    },
    {
      plan: "Premium",
      price: "49",
      features: ["Access to all gym equipment", "Unlimited group classes", "Open 24/7", "Personal trainer", "Premium support"],
    },
  ];

  return (
    <div className="bg-first py-12 relative overflow-hidden mt-4 sm:mt-6 md:mt-8 lg:mt-12 text-center">
  <div className="text-center mb-8">
    <Typography
      variant="h1"
      color="white"
      className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-400 to-gray-200 bg-clip-text text-transparent"
    >
      Choose the <span className="text-six">Perfect Plan</span> for You
    </Typography>
  </div>
  <div className="flex flex-wrap justify-center gap-6 sm:gap-8 px-4 sm:px-6 md:px-8">
    {pricingPlans.map((plan, index) => (
      <PricingCard
        key={index}
        plan={plan.plan}
        price={plan.price}
        features={plan.features}
      />
    ))}
  </div>
</div>

  );
};

export default PricingPage;
