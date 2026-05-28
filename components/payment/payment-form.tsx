'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface PaymentFormProps {
  gateway: string;
  amount: number;
  orderId: string;
  onPaymentComplete: (transactionId: string) => void;
}

export function PaymentForm({
  gateway,
  amount,
  orderId,
  onPaymentComplete,
}: PaymentFormProps) {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    phone: '',
  });
  const [processing, setProcessing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
  };

  const formatExpiryDate = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4);
    }
    return cleaned;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const transactionId = `${gateway.toUpperCase()}-${Date.now()}`;

      // Verify payment with backend
      const response = await fetch('/api/payment/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          gateway,
          transactionId,
          status: 'success',
        }),
      });

      if (!response.ok) throw new Error('Payment verification failed');

      onPaymentComplete(transactionId);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Card className="bg-slate-800 border-slate-700 p-6">
      <h3 className="text-lg font-bold text-white mb-6">
        {gateway === 'jazzcash' ? 'JazzCash Payment' : 'EasyPaisa Payment'}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {gateway !== 'card' && (
          <div>
            <label className="block text-sm text-slate-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              placeholder="03XXXXXXXXX"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
        )}

        {gateway === 'card' && (
          <>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formatCardNumber(formData.cardNumber)}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    cardNumber: e.target.value.replace(/\s/g, ''),
                  }))
                }
                maxLength={19}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-2">Card Holder Name</label>
              <input
                type="text"
                name="cardHolder"
                placeholder="John Doe"
                value={formData.cardHolder}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formatExpiryDate(formData.expiryDate)}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      expiryDate: e.target.value,
                    }))
                  }
                  maxLength={5}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">CVV</label>
                <input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  maxLength={4}
                  className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </>
        )}

        <div className="bg-slate-700/50 p-4 rounded border border-slate-600">
          <div className="flex justify-between items-center">
            <span className="text-slate-300">Amount to Pay:</span>
            <span className="text-2xl font-bold text-blue-400">
              Rs. {amount.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="text-xs text-slate-400 bg-slate-700/50 p-3 rounded">
          This is a test transaction. No real charges will be processed.
        </div>

        <Button
          type="submit"
          disabled={processing}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
        >
          {processing ? 'Processing Payment...' : 'Complete Payment'}
        </Button>
      </form>
    </Card>
  );
}
