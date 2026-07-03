export default function Message({
  type = "success",
  children,
}) {
  const colors = {
    success:
      "bg-green-100 border-green-500 text-green-700",

    error:
      "bg-red-100 border-red-500 text-red-700",

    warning:
      "bg-yellow-100 border-yellow-500 text-yellow-700",
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-lg ${colors[type]}`}
    >
      {children}
    </div>
  );
}