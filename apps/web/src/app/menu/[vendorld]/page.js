export default function VendorMenu({ params }) {
  const vendorId = params.vendorId;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Vendor Info */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6 text-center">
          <h1 className="text-2xl font-bold">🍽️ Vendor Name</h1>
          <p className="text-gray-600">Scan to order via WhatsApp</p>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Sample Jollof Rice</h3>
            <p className="text-green-600 font-bold">₵20.00</p>
            <p className="text-gray-600 text-sm">Delicious Ghanaian jollof rice</p>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-bold text-lg">Grilled Chicken</h3>
            <p className="text-green-600 font-bold">₵35.00</p>
            <p className="text-gray-600 text-sm">Spicy grilled chicken</p>
          </div>
        </div>

        {/* WhatsApp Order Button */}
        <div className="mt-8">
          <button className="w-full bg-green-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-green-700 transition">
            📱 Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
