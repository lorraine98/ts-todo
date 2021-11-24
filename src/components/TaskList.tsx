import styled from "@emotion/styled";
import { useTasks } from "../contexts/TaskProvider";
import Task from "./Task";

const TaskList = () => {
  const { tasks } = useTasks();

  return (
    <UnorderedList>
      {tasks.map((item) => (
        <Task
          key={item.id}
          id={item.id}
          content={item.content}
          complete={item.complete}
        />
      ))}
    </UnorderedList>
  );
};
export default TaskList;

const UnorderedList = styled.ul`
  width: 400px;
  margin: 0;
  padding: 0;
  & > li {
    margin-top: 8px;
  }
`;
