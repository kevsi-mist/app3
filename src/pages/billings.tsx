import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: '₹400/month',
    features: [
      'Access to basic market news',
      'Real-time stock updates',
      'Email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro Plan',
    price: '₹1500/month',
    features: [
      'All Basic features',
      'AI-powered news summaries',
      'Portfolio analysis',
      'Priority email support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 'Contact us',
    features: [
      'Custom integrations',
      'Dedicated account manager',
      'Advanced analytics & reporting',
      '24/7 phone support',
    ],
  },
];

function LatestPlanCard({ planName, planPrice }) {
  return (
    <div
      className="max-w-3xl mx-auto mt-12 bg-[#121212] border border-[#3b7cc9]/60 rounded-2xl shadow-lg p-6 flex items-center gap-6
                 hover:shadow-blue-800/60 transition-shadow duration-300"
    >
      <div className="text-[#3b7cc9] text-5xl font-bold select-none">✓</div>
      <div>
        <h3 className="text-2xl font-semibold text-[#fefefe] mb-1">Latest Bought Plan</h3>
        <p className="text-lg text-[#fefefe]/90">{planName}</p>
        <p className="text-[#3b7cc9] font-medium mt-1 text-xl">{planPrice}</p>
      </div>
    </div>
  );
}

export default function Billing() {
  const isMobile = useIsMobile();

  // <-- Add state to track selected plan -->
  const [latestPlan, setLatestPlan] = useState({
    name: 'No plan chosen yet',
    price: '',
  });

  return (
    <div className="flex min-h-screen bg-[#121212] text-[#fefefe]">
      {!isMobile}

      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        <header className="sticky top-0 z-10 border-b border-[#3b7cc9]/20 bg-[#121212] backdrop-blur px-6 lg:px-8 py-5">
          <div className="flex items-center justify-center max-w-7xl mx-auto">
            <h1 className={cn("text-xl font-semibold", isMobile && "ml-10")}>Subscription Plans</h1>
          </div>
        </header>

        <main className="flex-1 px-4 md:px-10 py-10 max-w-screen-2xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="bg-[#121212] text-[#fefefe] border border-[#3b7cc9]/40 rounded-2xl shadow-2xl p-8 flex flex-col justify-center hover:shadow-blue-800/30 transition-shadow duration-300"
              >
                <div className="text-4xl text-[#3b7cc9] text-center mb-4">↑</div>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold">{plan.name}</h2>
                  <p className="text-xl text-[#fefefe]/80 mt-1">{plan.price}</p>
                </div>

                <ul className="mb-6 list-disc list-inside space-y-2 text-sm text-[#fefefe]/90">
                  {plan.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>

                {/* On button click, update latestPlan state */}
  <button
    onClick={() => setLatestPlan({ name: plan.name, price: plan.price })}
    className={`w-full py-2 font-semibold rounded-lg transition
      ${latestPlan.name === plan.name
        ? 'bg-green-600 text-white cursor-default'
        : 'bg-[#3b7cc9] text-[#fefefe] hover:bg-[#336bb0]'}`}
    disabled={latestPlan.name === plan.name}
  >
    {latestPlan.name === plan.name ? 'Current Plan' : 'Upgrade Now'}
  </button>
              </div>
            ))}
          </div>

          {/* Latest Plan Card showing selected plan */}
          <LatestPlanCard planName={latestPlan.name} planPrice={latestPlan.price} />
        </main>

        {isMobile && <div className="h-16" />}
      </div>
    </div>
  );
}
