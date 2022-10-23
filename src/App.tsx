import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DragabbleCard from "./DragabbleCard";

// styled
const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Board = styled.div`
  padding: 30px 10px 20px;
  margin-bottom: 5px;
  border-radius: 5px;
  min-height: 200px;
  background-color: ${(props) => props.theme.boardColor};
`;

// jsx
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // drag를 끝낸 후 일어날 액션
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    console.log("draggin finish");

    if (!destination) return;

    setToDos((oldToDos) => {
      const copyToDos = [...oldToDos];
      // TODO Delete item on source.index
      copyToDos.splice(source.index, 1);
      // Put back the item on the destination.index
      copyToDos.splice(destination?.index, 0, draggableId);
      return copyToDos;
    });
  };

  /**
   * droppable: 드래그할 영역
   * draggable: 드래그할 항목
   */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          <Droppable droppableId="one">
            {(magic) => (
              <Board ref={magic.innerRef} {...magic.droppableProps}>
                {toDos.map((toDo, index) => (
                  <DragabbleCard key={toDo} toDo={toDo} index={index} />
                ))}
                {magic.placeholder}
              </Board>
            )}
          </Droppable>
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
