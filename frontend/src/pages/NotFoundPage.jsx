import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-8xl font-bold text-indigo-600">
        404
      </h1>

      <h2 className="mt-6 text-3xl font-bold text-gray-800">
        Page Not Found
      </h2>

      <p className="mt-3 text-center text-gray-600">
        The page you're looking for doesn't exist.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFoundPage;