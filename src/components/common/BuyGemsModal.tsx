import React from 'react';
import { X, Save } from 'lucide-react';

interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  gems: number;
  emoji: string;
  popular?: boolean;
}

interface OneTimePack {
  id: string;
  name: string;
  price: string;
  gems: number;
  bonus?: boolean;
}

// Buy Gems Modal Component - Updated to work within mobile frame
interface BuyGemsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPurchase: (type: 'subscription' | 'onetime', planId: string) => void;
}

export function BuyGemsModal({ isOpen, onClose, onPurchase }: BuyGemsModalProps) {
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter Monthly',
      price: '$4.99/mo',
      gems: 500,
      emoji: '⭐️'
    },
    {
      id: 'pro',
      name: 'Pro Monthly',
      price: '$9.99/mo',
      gems: 1200,
      emoji: '🚀',
      popular: true
    },
    {
      id: 'creator',
      name: 'Creator Monthly',
      price: '$14.99/mo',
      gems: 2000,
      emoji: '👑'
    }
  ];

  const oneTimePacks: OneTimePack[] = [
    {
      id: 'small',
      name: 'Small Pack',
      price: '$2.99',
      gems: 300
    },
    {
      id: 'medium',
      name: 'Medium Pack',
      price: '$6.99',
      gems: 800
    },
    {
      id: 'big',
      name: 'Big Pack',
      price: '$12.99',
      gems: 1800,
      bonus: true
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 z-50 rounded-[40px] overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      
      {/* Bottom Sheet Modal */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/95 backdrop-blur-xl rounded-t-3xl border-t border-white/20 max-h-[67vh] overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-white/30 rounded-full"></div>
        </div>

        {/* Header */}
        <div className="px-6 pb-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white text-xl font-semibold">Need More Gems?</h2>
              <p className="text-white/60 text-sm mt-1">
                Purchase credits to unlock enhanced features
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white/60 hover:text-white transition-colors p-2"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 overflow-y-auto max-h-[50vh]">
          {/* Monthly Plans */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">Monthly Plans</h3>
            <div className="space-y-3">
              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative p-4 rounded-xl border transition-all ${
                    plan.popular
                      ? 'border-blue-400 bg-blue-400/10'
                      : 'border-white/20 bg-white/5'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-2 left-4">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{plan.emoji}</span>
                      <div>
                        <h4 className="text-white font-medium">{plan.name}</h4>
                        <p className="text-white/60 text-sm">{plan.gems} Gems/month</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{plan.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onPurchase('subscription', plan.id)}
                    className={`w-full py-2.5 px-4 rounded-lg font-medium transition-colors ${
                      plan.popular
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-white'
                    }`}
                  >
                    Subscribe
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* One-Time Packs */}
          <div className="mb-6">
            <h3 className="text-white font-medium mb-3">One-Time Purchase</h3>
            <div className="space-y-3">
              {oneTimePacks.map((pack) => (
                <div
                  key={pack.id}
                  className="p-4 rounded-xl border border-white/20 bg-white/5"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="text-white font-medium">{pack.name}</h4>
                      <p className="text-white/60 text-sm">
                        {pack.gems} Gems{pack.bonus && (
                          <span className="text-orange-400 ml-1">+ bonus</span>
                        )}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{pack.price}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onPurchase('onetime', pack.id)}
                    className="w-full py-2.5 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10">
          <div className="flex items-center gap-2 justify-center">
            <Save size={14} className="text-white/60" />
            <p className="text-white/60 text-sm text-center">
              Your Blueprint is saved as a draft
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 