'use client';

import { Star } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Ahmed Hassan',
    rating: 5,
    date: '2 weeks ago',
    title: 'Perfect fit and quality!',
    content:
      'Amazing frames! The quality is premium and they fit perfectly. The prescription was accurate too. Highly recommend!',
    verified: true,
  },
  {
    id: '2',
    author: 'Fatima Khan',
    rating: 5,
    date: '1 month ago',
    title: 'Best online eyewear purchase',
    content:
      'Fast delivery, great customer service, and the glasses look exactly like the pictures. Very satisfied with my purchase!',
    verified: true,
  },
  {
    id: '3',
    author: 'Ali Ibrahim',
    rating: 4,
    date: '3 weeks ago',
    title: 'Good quality, minor issues',
    content:
      'Overall good product. Took a while to adjust but very comfortable now. Would purchase again.',
    verified: true,
  },
];

export function CustomerReviews() {
  const averageRating =
    mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h3>

        {/* Rating Summary */}
        <div className="flex items-start gap-8 mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
          <div className="text-center">
            <div className="text-4xl font-bold text-gray-900 mb-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600">Based on {mockReviews.length} reviews</p>
          </div>

          <div className="flex-1">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = mockReviews.filter((r) => r.rating === stars).length;
                const percentage = (count / mockReviews.length) * 100;
                return (
                  <div key={stars} className="flex items-center gap-2">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium text-gray-600">{stars}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Individual Reviews */}
        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 border border-gray-200 rounded-xl hover:border-blue-400 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-gray-900">{review.author}</h4>
                    {review.verified && (
                      <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">{review.title}</h5>
              <p className="text-gray-700">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
