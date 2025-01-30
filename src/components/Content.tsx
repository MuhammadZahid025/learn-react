export default function Content() {
  return (
    <div className="flex">
      <div className="w-1/3 bg-gray-150 h-12 m-2 border-1 border-gray-400">
        <h4>Todo</h4>
      </div>
      <div className="w-1/3 bg-gray-200 h-12 m-2 border-1 border-gray-400">
        <h4>Doing</h4>
      </div>
      <div className="w-1/3 bg-gray-150 h-12 m-2 border-1 border-gray-400">
        <h4>Done</h4>
      </div>
    </div>
  );
}
