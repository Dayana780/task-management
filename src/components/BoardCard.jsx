function BoardCard() {
  return (
    <div className="mb-8 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold text-gray-700">Product </h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-blue-500  flex items-center justify-center text-white text-sm">
            3 tasks
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoardCard;
