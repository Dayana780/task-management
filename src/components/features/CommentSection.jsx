import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Send } from "lucide-react";
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
    <div className="mt-3 border-t border-border pt-3">
      <h4 className="mb-2 text-sm font-medium text-zinc-700">
        💬 Comments ({comments.length})
      </h4>

      {/* Comment list — scrollable */}
      <div className="mb-3 max-h-40 space-y-2 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-xs text-muted">No comments yet</p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-lg bg-zinc-50 p-2.5 text-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-semibold text-zinc-700">
                  {comment.author}
                </span>
                <span className="shrink-0 text-xs text-muted">
                  {dayjs(comment.createdAt).fromNow()}
                </span>
              </div>
              <p className="mt-1 text-sm text-zinc-600">{comment.text}</p>
            </div>
          ))
        )}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1 rounded-lg border border-border px-3 py-1.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
        <Button type="submit" className="flex items-center justify-center gap-1 py-1.5 text-sm">
          <Send size={14} />
          Send
        </Button>
      </form>
    </div>
  );
}

export default CommentSection;
