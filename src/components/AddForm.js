import { useState } from 'react';

function AddForm({ addTodo }) {
  // 新增資料的值
  const [inputValue, setInputValue] = useState('');

  return (
    <>
      <section className="container position-absolute bottom-0 start-50 translate-middle-x mb-5">
        <label className="form-label text-primary">Add to list</label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
          ></input>
          <button
            className="btn btn-primary text-white fw-bold"
            onClick={() => {
              addTodo(inputValue);
              setInputValue('');
            }}
          >
            +
          </button>
        </div>
      </section>
    </>
  );
}

export default AddForm;
