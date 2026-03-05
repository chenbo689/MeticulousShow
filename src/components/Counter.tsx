import React, { useState } from 'react';
import './Counter.css';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-container">
      <h2>计数器组件</h2>
      <p className="counter-description">
        这是一个简单的计数器，用于演示 Meticulous 如何捕捉用户交互和状态变化。
      </p>

      <div className="counter-display">
        <span className="counter-value">{count}</span>
      </div>

      <div className="counter-controls">
        <button
          className="counter-btn counter-btn-decrement"
          onClick={() => setCount(count - 1)}
          aria-label="减少计数"
        >
          -1
        </button>
        <button
          className="counter-btn counter-btn-reset"
          onClick={() => setCount(0)}
          aria-label="重置计数"
        >
          重置
        </button>
        <button
          className="counter-btn counter-btn-increment"
          onClick={() => setCount(count + 1)}
          aria-label="增加计数"
        >
          +1
        </button>
      </div>

      <div className="counter-status">
        {count === 0 && <span className="status-neutral">计数为零</span>}
        {count > 0 && <span className="status-positive">正数</span>}
        {count < 0 && <span className="status-negative">负数</span>}
      </div>
    </div>
  );
}

export default Counter;
