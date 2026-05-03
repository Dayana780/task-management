import Button from "../components/ui/Button";
function BoardDetail() {
  return (
    <>
      <Button type="addTask" />

      <ul className="flex gap-3 ">
        <li className="bg-slate-400 rounded-md p-4 text-center">
          <div>
            <h2 className="m-1 text-lg font-medium">To Do</h2>
            <hr />
            <ul className="bg-slate-100 rounded-md mt-2 p-4">
              <li>ui component</li>
            </ul>
            <p className="text-blue-900 mt-4">position</p>
          </div>
        </li>
      </ul>
    </>
  );
}

export default BoardDetail;
