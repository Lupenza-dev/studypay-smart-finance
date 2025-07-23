
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Newsletter = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">
            Stay Smart About Eldizer Financial Service
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email address"
              className="bg-white text-gray-900 border-0 flex-1"
            />
            <Button className="bg-yellow-400 text-purple-900 hover:bg-yellow-300 font-semibold px-8">
              Subscribe
            </Button>
          </div>
          <p className="text-sm text-indigo-200 mt-4">
            Join students already subscribed. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
