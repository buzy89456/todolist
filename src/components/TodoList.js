import { useState, useEffect, useRef } from 'react';
import ProgressBar from './ProgressBar';
import TodoItem from './TodoItem';
import MoveTodo from './MoveTodo';
import AddForm from './AddForm';
import './TodoList.css';

function TodoList() {
  // 每個todo項目: ex. {id: number, text: string, completed: boolean }
  const [todos, setTodos] = useState([
    { id: 1, text: '買牛奶', completed: true },
    { id: 2, text: '學react', completed: false },
    { id: 3, text: '上傳圖檔', completed: true },
    { id: 4, text: '選擇色碼', completed: false },
  ]);

  // 呈現項目用
  const [todosDisplay, setTodosDisplay] = useState([]);
  // 切換鈕的狀態
  const [moveStatus, setMoveStatus] = useState(false);
  // 獲取元素高度，以抵銷 scrollbar 產生時的 padding
  const [sectionHeight, setSectionHeight] = useState(0);
  const heightRef = useRef();
  // 自動滾至最新一筆資料
  const scrollRef = useRef();
  // 判斷是否需要滾至底部，新增時設為 true，刪除時設為 false
  const [scrollToBottom, setScrollToBottom] = useState(false);

  // 切換某筆資料的 completed 值
  const toggleCompleted = (id) => {
    const newTodos = todos.map((v) => {
      if (v.id === id) return { ...v, completed: !v.completed };
      return { ...v };
    });

    setTodos(newTodos);
  };

  // 新增一筆資料
  const addTodo = (text) => {
    if (text === '') return;
    const newTodo = {
      id: +new Date(),
      text: text,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setScrollToBottom(true);
  };

  // 刪除某筆資料
  const deleteTodo = (id) => {
    const newTodos = todos.filter((v, i) => {
      return id !== v.id;
    });

    setTodos(newTodos);
    setScrollToBottom(false);
  };

  // 將完成資料移到最後
  const moveTodo = (status, todosArray) => {
    // 如果切換鈕的狀態是 false，保持原 todos
    if (status === false) return todosArray;

    // 如果切換鈕的狀態是 true，將完成的 todos 移到最後
    const doneTodos = todosArray.filter((v) => {
      return v.completed === true;
    });

    const notDoneTodos = todosArray.filter((v) => {
      return v.completed === false;
    });

    return [...notDoneTodos, ...doneTodos];
  };

  // 畫面上呈現的 todos，會經過各種 function 後呈現
  useEffect(() => {
    let newTodos = moveTodo(moveStatus, todos);
    setTodosDisplay(newTodos);
  }, [todos, moveStatus]);

  // 取得 todo list 區塊的高度
  useEffect(() => {
    setSectionHeight(heightRef.current.clientHeight);
    if (scrollToBottom) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' }, 0);
      });
    }
  }, [todos]);

  return (
    <>
      <main className="position-relative">
        <ProgressBar todos={todos} />

        <section
          className={
            'todo-list ' +
            (sectionHeight + 56 >= window.innerHeight / 2 ? 'ps-2' : '')
          }
          ref={heightRef}
        >
          <TodoItem
            todosDisplay={todosDisplay}
            toggleCompleted={toggleCompleted}
            deleteTodo={deleteTodo}
            scrollRef={scrollRef}
          />
        </section>

        <MoveTodo moveStatus={moveStatus} setMoveStatus={setMoveStatus} />

        <AddForm addTodo={addTodo} />
      </main>
    </>
  );
}

export default TodoList;
