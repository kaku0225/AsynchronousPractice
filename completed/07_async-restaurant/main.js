const timeoutPromise = ms => new Promise((resolve, _reject) => {
  setTimeout(() => {
    resolve();
  }, ms);
})

const startTask = async (orderDiv, name, ms) => {
  const stepP = document.createElement('p');
  stepP.textContent = name;
  orderDiv.appendChild(stepP);
  if (ms) {
    await timeoutPromise(ms);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ordersDiv = document.querySelector('.orders');

  // 點熱牛奶
  document.getElementById('order-hot-milk').addEventListener('click', async () => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'p-4 border-dashed border-4 border-gray-600';

    ordersDiv.appendChild(orderDiv);

    startTask(orderDiv, '接到熱牛奶訂單', 200)
      .then(() => startTask(orderDiv, '把熱牛奶放入微波爐，開始微波', 1800))
      .then(() => startTask(orderDiv, '微波完成，拿給消費者'))
  });

  // 點漢堡
  document.getElementById('order-hamburger').addEventListener('click', async () => {
    const orderDiv = document.createElement('div');
    orderDiv.className = 'p-4 border-dashed border-4 border-gray-600';

    ordersDiv.appendChild(orderDiv);

    await startTask(orderDiv, '接到漢堡訂單', 200);
    await startTask(orderDiv, '準備麵包、生菜、漢堡肉', 600);
    await startTask(orderDiv, '煎漢堡肉', 2000);
    await startTask(orderDiv, '用麵包把漢堡肉跟生菜夾起來', 400);
    await startTask(orderDiv, '上菜');
  });
});
