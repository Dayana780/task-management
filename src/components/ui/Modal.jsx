// popup mishe
import Button from "../ui/Button";
function Modal() {
  return (
    <form>
      <div className="grid justify-start items-center">
        <label className="mr-4 mb-2">Title :</label>
        <input
          className="w-64 bg-gray-200 text-black px-4 py-2 rounded-md mb-4 justify-end"
          type="text"
          placeholder=" Implement login page"
        />
        <label className="mr-4 mb-2">Description :</label>
        <textarea
          className="w-64 bg-gray-200 text-black px-4 py-2 rounded-md mb-4 justify-end"
          type="text"
          placeholder=" Implement login page"
        />
      </div>
      <div className="flex gap-4  mb-4">
        <dev className="flex flex-col">
          <p className="mb-1">Status: </p>
          <select className="px-2 py-4 border-black bg-blue-100 rounded-md">
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done </option>
            <option>Blocked </option>
          </select>
        </dev>
        <dev className="flex flex-col">
          <p className="mb-1"> Priority: </p>
          <select className="px-2 py-4 border-black bg-blue-100 rounded-md">
            <option>high </option>
            <option>medium </option>
            <option>low </option>
            <option>critical</option>
          </select>
        </dev>
      </div>
      <div className="flex items-center gap-4">
        <Button type="addTask" />
        <Button type="cancel" />
      </div>
    </form>
  );
}

export default Modal;
