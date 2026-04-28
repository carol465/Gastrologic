function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-16 px-6 lg:px-8 bg-[url('/images/fundo_hero.webp')] bg-cover bg-fixed bg-center">
      
      <div className="max-w-3xl mx-auto bg-white/50 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-sm border border-white/20">
        
        <h1 className="text-4xl font-magneton text-shadow-gray-700 mb-8 border-b pb-4 border-gray-100">
          Privacy <span className="text-berry-500">Policy</span>
        </h1>

        <p className="text-shadow-gray-700 mb-8 leading-relaxed font-medium">
          At Gastrologic, your privacy is our priority. This application was built to respect the 
          <strong> General Data Protection Regulation (GDPR)</strong>.
        </p>

        <section className="space-y-8">
          <div>
            <h2 className="text-xl text-shadow-gray-700 mb-3 flex items-center">
              Data Collected
            </h2>
            <ul className="list-disc ml-14 text-shadow-gray-700 space-y-2 font-medium">
              <li><strong>Name:</strong> To personalize your experience.</li>
              <li><strong>Email:</strong> For account identification.</li>
              <li><strong>Password:</strong> Encrypted.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl text-shadow-gray-700 mb-3 flex items-center">
              Purpose
            </h2>
            <p className="ml-11 text-shadow-gray-700 leading-relaxed font-medium">
              Your data is used exclusively to manage your account and save your ingredient preferences and nutritional profile.
            </p>
          </div>

          <div>
            <h2 className="text-xl text-shadow-gray-700 mb-3 flex items-center">
              Your Rights
            </h2>
            <p className="ml-11 text-shadow-gray-700 leading-relaxed font-medium">
              You are in full control. You can access, update, or permanently delete your data at any time through your profile settings.
            </p>
          </div>

          <div>
            <h2 className="text-lg text-shadow-shadow-gray-700 mb-2">Security</h2>
            <p className="text-shadow-gray-700 text-sm italic leading-relaxed">
              We use modern encryption protocols to ensure your information remains secure against unauthorized access.
            </p>
          </div>
          </section>

          <div className="mt-12 pt-8 border-t border-shadow-gray-700 text-center">
            <p className="text-sm text-shadow-gray-700 font-medium">
              Last updated: March 2026
          </p>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;