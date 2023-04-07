function moveTodo({ moveStatus, setMoveStatus }) {
  return (
    <>
      <section className="container">
        <div className="border border-info border-2 my-3"></div>
        <div className="form-check form-switch form-check-reverse">
          <input
            className="form-check-input"
            type="checkbox"
            id="flexSwitchCheckReverse"
            checked={moveStatus}
            onChange={() => {
              setMoveStatus(!moveStatus);
            }}
          />
          <label
            className="form-check-label text-primary"
            htmlFor="flexSwitchCheckReverse"
          >
            Move done things to end?
          </label>
        </div>
      </section>
    </>
  );
}

export default moveTodo;
