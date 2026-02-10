import React, { useEffect, useRef, useState } from "react";
import { EditTaskModal } from "../../EditModal/Components/index";
import { DropArea } from "../../DropArea/Components/index";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const TaskColumn2 = ({
  hastask,
  isCollapsed,
  // renderSkeletons,
  onDrop,
  allChecks,
  handleSave,
  checkBoxHandler,
  closeModal,
  handleEditClick,
  handleDelete,
  handleCollapse,
  currRef,
  isModalOpen,
  selectedTask,
  todoStatus = [],
  inProgressStatus = [],
  doneStatus = [],
  loading,setActiveCard
}) => {

   const renderSkeletons = (count = 3) => {
    return Array(count)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          className=" p-4 w-60 h-40 border mt-10 border-input-bg rounded-md mb-4"
        >
          <Skeleton height={20} width="80%" style={{ marginBottom: "10px" }} />
          <Skeleton count={3} height={15} style={{ marginBottom: "5px" }} />
          <div className="flex gap-2 mt-4">
            <Skeleton width={50} height={25} />
            <Skeleton width={50} height={25} />
          </div>
        </div>
      ));
  };

  const renderTasks = (tasks, onDrop) => {
    if (tasks.length === 0) {
      return <DropArea onDrop={() => onDrop(0)} />;
    }
    return tasks.map((task, index) => (
      <React.Fragment key={task.id}>
        {<DropArea onDrop={() => onDrop(index)} />}

        <div
          key={task.id}
          ref={(el) => (currRef.current[task.id] = el)}
          className="bg-gray-900/50 p-4 w-full max-h-60 overflow-x-auto overflow-y-hidden border border-input-bg hover:border-blue-700 cursor-grab rounded-md"
          draggable
          onDragStart={() => setActiveCard(task.id)}
          onDragEnd={() => setActiveCard(null)}
        >
          <div className="flex justify-between">
            <span>
              <strong>{task.title} </strong>
            </span>
            <span>
              <input
                type="checkbox"
                checked={allChecks.includes(String(task.id))}
                value={task.id}
                onChange={checkBoxHandler}
              />
            </span>
          </div>
          <p>Priority: {task.priority} </p>
          <p>Assignee: {task.assignee} </p>
          <p>Status:{task.status} </p>
          <p>Due Time:{task.dueDate} </p>
          <button onClick={() => handleEditClick(task)}>Edit</button>
          <button
            style={{ marginLeft: "10px" }}
            onClick={() => handleDelete(task.id)}
          >
            Delete
          </button>
        </div>
        {<DropArea onDrop={() => onDrop(index + 1)} />}
      </React.Fragment>
    ));
  };

  return (
    <>
      <div className="flex sm:flex-row items-center sm:items-start sm:justify-center flex-col gap-x-10 gap-y-6 w-screen  md:gap-x-20">
        <div
          className={` overflow-hidden bg-[#371650] w-auto ${isCollapsed("todo") ? "h-[5vh]" : `${hastask(todoStatus) ? "sm:h-[80vh] h-[25vh] overflow-y-auto" : "h-auto "}`} `}
        >
          <div className="flex justify-center items-center columnhead">
            <h3 className="columnheadTxt">To Do</h3>
            <button onClick={() => handleCollapse("todo")} className="mt-4">
              {isCollapsed("todo") ? "▶️" : "🔽"}
            </button>
          </div>

          {loading
            ? renderSkeletons(2)
            : renderTasks(todoStatus, (position) => onDrop("todo", position))}
        </div>

        <div
          className={` overflow-hidden bg-[#371650] w-auto ${isCollapsed("inProgress") ? "h-[5vh]" : `${hastask(inProgressStatus) ? " sm:h-[80vh] h-[25vh] overflow-y-auto" : "h-auto "}`}`}
        >
          <div className="flex justify-center columnhead">
            <h3 className="columnheadTxt">In Progress</h3>
            <button onClick={() => handleCollapse("inProgress")}>
              {isCollapsed("inProgress") ? "▶️" : "🔽"}
            </button>
          </div>
          {loading
            ? renderSkeletons(2)
            : renderTasks(inProgressStatus, (position) =>
                onDrop("in-progress", position),
              )}
        </div>

        <div
          className={`overflow-hidden bg-[#371650]  w-auto ${isCollapsed("done") ? "h-[5vh]" : `${hastask(doneStatus) ? "sm:h-[80vh] h-[25vh] overflow-y-auto" : "h-auto "}`}`}
        >
          <div className="flex  justify-center columnhead">
            <h3 className="columnheadTxt">Done</h3>
            <button onClick={() => handleCollapse("done")}>
              {isCollapsed("done") ? "▶️" : "🔽"}
            </button>
          </div>
          {loading
            ? renderSkeletons(2)
            : renderTasks(doneStatus, (position) => onDrop("done", position))}
        </div>
      </div>

      {/* ===== EDIT MODAL ===== */}
      {isModalOpen && (
        <EditTaskModal
          task={selectedTask}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};
