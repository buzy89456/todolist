function TodoItem({ todosDisplay, toggleCompleted, deleteTodo, scrollRef }) {
  return (
    <>
      <div className="container">
        {todosDisplay.map((v, i) => {
          return (
            <div className="my-3" key={v.id}>
              <div className="border-start border-4 border-primary bg-white p-2 rounded rounded-1 my-2 shadow-sm">
                <div className="row">
                  <div className="col-1 d-flex justify-content-center">
                    <input
                      type="checkbox"
                      className="bg-primary"
                      checked={v.completed}
                      onChange={() => {
                        toggleCompleted(v.id);
                      }}
                    ></input>
                  </div>
                  <p
                    className={
                      'text-primary col-10 mb-0 ' +
                      (v.completed ? 'completed' : '')
                    }
                  >
                    {v.text}
                  </p>
                  <i
                    className="bi bi-x-lg text-light col-1"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      deleteTodo(v.id);
                    }}
                  ></i>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </div>
    </>
  );
}

export default TodoItem;
