import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function App() {
  // drag를 끝낸 후 일어날 액션
  const onDragEnd = () => {};

  /**
   * droppable: 드래그할 영역
   * draggable: 드래그할 항목
   */
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <Droppable droppableId="one">
          {() => (
            <ul>
              <Draggable draggableId="firsh" index={0}>
                {() => <li>One</li>}
              </Draggable>

              <Draggable draggableId="second" index={1}>
                {() => <li>Two</li>}
              </Draggable>
            </ul>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default App;
