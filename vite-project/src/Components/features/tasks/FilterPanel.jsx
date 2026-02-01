import { useTask } from "../../../Common/Context/TaskContext";

export const FilterPanel = () => {
  const { priorityFilter, setPriorityFilter } = useTask();

  return (
    <div>
      <h4>Filter by Priority</h4>

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="all">All</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
    </div>
  );
};
