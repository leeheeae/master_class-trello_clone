import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./Board";

// styled
const Wrapper = styled.div`
  display: flex;
  max-width: 680px;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;

// jsx
function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);

  // drag를 끝낸 후 일어날 액션
  const onDragEnd = (info: DropResult) => {
    console.log("draggin finish");
    const { destination, draggableId, source } = info;

    if (!destination) return;

    // 같은 보드일 경우
    if (destination?.droppableId === source.droppableId) {
      // same board movement.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }

    // 다른 보드일 경우
    if (destination.droppableId !== source.droppableId) {
      // cross board movement
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]]; // 아이템의 기존 보드
        const destinationBoard = [...allBoards[destination.droppableId]]; // 아이템의 이동한 보드

        sourceBoard.splice(source.index, 1);
        destinationBoard.splice(destination?.index, 0, draggableId);

        return {
          ...allBoards,
          [source.droppableId]: sourceBoard,
          [destination.droppableId]: destinationBoard,
        };
      });
    }
  };

  /**
   * droppable: 드래그할 영역
   * draggable: 드래그할 항목
   */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
