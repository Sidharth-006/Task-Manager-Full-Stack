import { FaSpinner } from "react-icons/fa";

export default function Loader() {
  return (
    <div className="min-h-screen flex justify-center items-center">

      <div className="flex flex-col items-center gap-5">

        <FaSpinner
          className="animate-spin text-indigo-600"
          size={50}
        />

        <h2 className="text-gray-600 font-medium">
          Loading...
        </h2>

      </div>

    </div>
  );
}