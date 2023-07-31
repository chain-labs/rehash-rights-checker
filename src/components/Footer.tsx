import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="bg-white rounded-lg light:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span className="flex items-center justify-center text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Made with<HeartIcon className="ml-1 mr-1 h-5 w-5 text-red-500" />
          <a href="https://chainlabs.in/" className="hover:underline">
            Chain Labs
          </a>
        </span>
      </div>
    </footer>
  );
}

