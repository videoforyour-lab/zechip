export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-green-700 mb-4">🍽️ MenuBoxGh</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Digital menus, QR codes, and WhatsApp ordering for food vendors in Ghana
          </p>
        </header>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">📱</div>
            <h3 className="text-xl font-bold mb-2">Digital Menu</h3>
            <p className="text-gray-600">Create and manage your food items with images and prices</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">📊</div>
            <h3 className="text-xl font-bold mb-2">QR Code</h3>
            <p className="text-gray-600">Generate unique QR codes for customers to scan and order</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">💬</div>
            <h3 className="text-xl font-bold mb-2">WhatsApp Orders</h3>
            <p className="text-gray-600">Orders go directly to your WhatsApp - no app needed</p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/auth/signup"
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition inline-block"
          >
            Get Started - 180 GHS/month
          </a>
        </div>
      </div>
    </main>
  );
  }
