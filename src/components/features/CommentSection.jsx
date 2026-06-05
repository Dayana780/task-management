import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Button from "../ui/Button";

dayjs.extend(relativeTime);

function CommentSection({ comments, onAddComment }) {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim() !== "") {
      onAddComment(newComment.trim());
      setNewComment("");
    }
  };

  return (
    <div className="mt-3 border-t pt-3">
      <h4 className="text-sm font-medium mb-2">💬 نظرات ({comments.length})</h4>

      <div className="space-y-2 max-h-40 overflow-y-auto mb-3">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-400">هنوز نظری ثبت نشده</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 rounded p-2 text-sm">
              <div className="flex justify-between items-start">
                <span className="font-medium text-xs">{comment.author}</span>
                <span className="text-xs text-gray-400">
                  {dayjs(comment.createdAt).fromNow()}
                </span>
              </div>
              <p className="text-gray-700 mt-1 text-sm">{comment.text}</p>
            </div>
          ))
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="نظر خود را بنویسید..."
          className="w-full border rounded-md px-2 py-1 text-sm"
        />
        <Button type="submit" className="text-sm py-1 px-3">
          ارسال نظر
        </Button>
      </form>
    </div>
  );
}

export default CommentSection;
