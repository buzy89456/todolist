import { useState, useEffect } from 'react';

function ProgressBar({ todos }) {
  // 完成率
  const [rate, setRate] = useState(0);
  // 計算完成率
  useEffect(() => {
    // 取得所有資料筆數
    const all = todos.length;
    // 取得完成的資料筆數
    const doneTodos = todos.filter((v) => {
      return v.completed === true;
    });
    const done = doneTodos.length;
    // 完成筆數 / 所有筆數
    const CompletionRate = Math.round((done / all) * 100);
    setRate(CompletionRate);
  }, [todos]);
  return (
    <>
      <section className="container">
        <h1 className="text-primary">Todo List</h1>
        <p className="text-primary">Add things to do</p>
        <div className="border border-info border-2 mb-3"></div>
        <div className="d-flex align-items-center">
          <p className="text-primary mb-0 me-2">{rate}%</p>
          <div className="w-100">
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow="0"
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-bar bg-danger"
                style={{ width: `${rate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProgressBar;
