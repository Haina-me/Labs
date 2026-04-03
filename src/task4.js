class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueueForpriority(item, priority) {
    const newItem = { item, priority };
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (priority < this.items[i].priority) {
        this.items.splice(i, 0, newItem);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(newItem);
    }
  }
}

dequeueHighest() {
  if (this.items.length === 0) {
    return null;
  }
  return this.items.shift(); // видаляє та повертає перший елемент з черги (найвищий пріоритет)
}

dequeueLowest() {
  if (this.items.length === 0) {
    return null;
  }
  return this.items.pop(); // видаляє та повертає останній елемент з черги (найнижчий пріоритет)
}

peek() {
  if (this.items.length === 0) {
    return null;
  }

  return this.items[0]; // повертає перший елемент з черги без видалення (найвищий пріоритет)
  return this.items[this.items.length - 1]; // повертає останній елемент з черги без видалення (найнижчий пріоритет)
}

isEmpty() {
  return this.items.length === 0;
}
//const myQueue = new PriorityQueue(); - myQueue це мій об'єкт який я створила за допомогою класу PriorityQueue
//myQueue = { items: [] } - це те що містить мій об'єкт, тобто масив items який є порожнім на початку
//myQueue.enqueueForpriority('task1', 2) - це виклик методу enqueue для додавання елемента 'task1' з пріоритетом 2 до черги
