'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PaymentGatewaySelectorProps {
  total: number;
  onSelectGateway: (gateway: string) => void;
}

export function PaymentGatewaySelector({
  total,
  onSelectGateway,
}: PaymentGatewaySelectorProps) {
  const [selectedGateway, setSelectedGateway] = useState<string>('');

  const gateways = [
    {
      id: 'jazzcash',
      name: 'JazzCash',
      description: 'Fast and secure mobile payment',
      icon: '💳',
      commission: 0.02,
    },
    {
      id: 'easypaisa',
      name: 'EasyPaisa',
      description: 'Convenient digital wallet payment',
      icon: '📱',
      commission: 0.025,
    },
    {
      id: 'card',
      name: 'Debit/Credit Card',
      description: 'Pay using your card',
      icon: '💰',
      commission: 0.03,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-white">Select Payment Method</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {gateways.map((gateway) => (
          <Card
            key={gateway.id}
            className={`p-4 cursor-pointer transition-all border-2 ${
              selectedGateway === gateway.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-700 bg-slate-800 hover:border-slate-600'
            }`}
            onClick={() => setSelectedGateway(gateway.id)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{gateway.icon}</span>
                <div>
                  <h4 className="font-bold text-white">{gateway.name}</h4>
                  <p className="text-sm text-slate-400">{gateway.description}</p>
                </div>
              </div>
              <div className="w-5 h-5 rounded-full border-2 border-slate-600 flex items-center justify-center">
                {selectedGateway === gateway.id && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full" />
                )}
              </div>
            </div>

            <div className="bg-slate-700/50 p-2 rounded text-xs text-slate-300">
              Processing fee: {(gateway.commission * 100).toFixed(1)}%
            </div>
          </Card>
        ))}
      </div>

      {selectedGateway && (
        <div className="p-4 bg-slate-700/50 border border-slate-600 rounded">
          <div className="flex justify-between items-center mb-3">
            <span className="text-slate-300">Total Amount:</span>
            <span className="text-xl font-bold text-blue-400">
              Rs. {total.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={() => onSelectGateway(selectedGateway)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
          >
            Proceed to {gateways.find((g) => g.id === selectedGateway)?.name}
          </Button>
        </div>
      )}
    </div>
  );
}
