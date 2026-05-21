import { Link } from "react-router-dom";

function BoardCard({ board }) {
  return (
    <Link to={`/boards/${board.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {board.name}
        </h3>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Board ID: {board.id}</span>
          <div className="px-2 py-1 bg-blue-100 text-blue-600 rounded-md text-xs">
            {board.color || "blue"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BoardCard;
