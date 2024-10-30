import React, { useEffect, useState } from "react";
import axios from "axios";
import { ArrowRight, Star, Users, Clock } from "lucide-react";
import ProductCard from "./ProductCard"; // Pastikan path ini sesuai

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/products/card");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Selamat Datang di Website Kami
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Kami menyediakan solusi terbaik untuk kebutuhan Anda. Temukan
            berbagai layanan unggulan kami disini.
          </p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-flex items-center gap-2">
            Mulai Sekarang
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Kenapa Memilih Kami?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Terbaik</h3>
              <p className="text-gray-600">
                Kami selalu mengutamakan kualitas dalam setiap layanan yang kami
                berikan.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Tim Profesional</h3>
              <p className="text-gray-600">
                Didukung oleh tim profesional yang berpengalaman di bidangnya.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Layanan 24/7</h3>
              <p className="text-gray-600">
                Siap melayani Anda kapanpun dengan dukungan 24 jam setiap hari.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Produk Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                pd_id={product._id}
                productCode={product.pd_code}
                category={product.pd_ct_id?.ct_name || "N/A"}
                name={product.pd_name}
                price={product.pd_price}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-6">
            Siap Untuk Memulai?
          </h2>
          <p className="text-blue-100 mb-8">
            Bergabunglah dengan ribuan pengguna lainnya dan rasakan pengalaman
            terbaik bersama kami.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100">
              Pelajari Lebih Lanjut
            </button>
            <button className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
              Hubungi Kami
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p>© 2024 Website Anda. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
