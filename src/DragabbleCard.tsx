import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

// styled
const Card = styled.div`
  border-radius: 5px;
  padding: 10px;
  background-color: ${(props) => props.theme.cardColor};
`;

// typescript
interface IDragabbleCardProps {
  toDo: string;
  index: number;
}

// jsx
function DragabbleCard({ toDo, index }: IDragabbleCardProps) {
  return (
    <Draggable draggableId={toDo} index={index} key={index}>
      {(magic) => (
        <Card
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDo}
        </Card>
      )}
    </Draggable>
  );
}

// props이 변하지 않으면 다시 렌더링 하지말라고 지정해주는 것
export default React.memo(DragabbleCard);
