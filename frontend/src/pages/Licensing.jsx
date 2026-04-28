function Licensing() {
  return (
    <div className="min-h-screen py-16 px-6 lg:px-8 bg-[url('/images/fundo_hero.webp')] bg-cover bg-fixed bg-center">
      <div className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-sm border border-white/20">
        
        <h1 className="text-4xl font-magneton text-shadow-gray-700 mb-8 border-b pb-4 border-shadow-gray-700">
          Licensing
        </h1>

        <section className="space-y-8 text-shadow-gray-700">
          <div>
            <h2 className="text-2xl mb-3">Intellectual Property</h2>
            <p className="leading-relaxed">
              All source code, interface designs, recommendation algorithms, and original content within <strong>Gastrologic</strong> are protected by copyright. Total or partial reproduction is strictly prohibited without prior written authorization.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-3">Third-Party Software</h2>
            <p className="leading-relaxed">
              We leverage Open Source technologies to deliver the best possible experience. We would like to thank the <strong>React, Tailwind CSS, and Vite</strong> developer communities for providing tools under the MIT license.
            </p>
          </div>

          <div>
            <h2 className="text-2xl mb-2">Commercial Use</h2>
            <p className="leading-relaxed italic">
              For partnerships or commercial licensing of our nutritional management technology, please reach out via our contact page.
            </p>
          </div>
        </section>

        <div className="mt-12 pt-8 border-t text-shadow-gray-700 text-center text-xs">
          © 2026 Gastrologic — All rights reserved.
        </div>
      </div>
    </div>
  );
}

export default Licensing;