class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    const timestamp = Date.now();
    const newItem = { item, priority, timestamp };
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


  dequeue(criteria) {
    if (this.isEmpty()) return null;

    switch (criteria) {
      case 'highest': return this.items.shift();
      case 'lowest': return this.items.pop();
      case 'oldest': return this.removeByTime('oldest');
      case 'newest': return this.removeByTime('newest');
      default: return null;
    }
  }

  peek(criteria) {
    if (this.isEmpty()) return null;

    switch (criteria) {
      case 'highest': return this.items[0];
      case 'lowest': return this.items[this.items.length - 1];
      case 'oldest': return this.findByTime('oldest').item;
      case 'newest': return this.findByTime('newest').item;
      default: return null;
    }
  }

  isEmpty() {
    return this.items.length === 0;
  }

  findByTime(type) {
    let targetIdx = 0;
    for (let i = 1; i < this.items.length; i++) {
      const isOlder = this.items[i].timestamp < this.items[targetIdx].timestamp;
      const condition = (type === 'oldest') ? isOlder : !isOlder;
      if (condition) targetIdx = i;
    }
    return { item: this.items[targetIdx], index: targetIdx };
  }

  removeByTime(type) {
    const data = this.findByTime(type);
    return this.items.splice(data.index, 1)[0];
  }
}

// Тест
const myQueue = new PriorityQueue();

myQueue.enqueue('A(2)', 2);

setTimeout(() => {
  myQueue.enqueue('Б(1)', 1);
  setTimeout(() => {
    myQueue.enqueue('В(3)', 3);

    console.log("peek");
    console.log("highest:", myQueue.peek('highest').item);
    console.log("lowest:", myQueue.peek('lowest').item);
    console.log("oldest:", myQueue.peek('oldest').item);
    console.log("newest:", myQueue.peek('newest').item);

    console.log("\n dequeue");

    console.log("видаляємо highest:", myQueue.dequeue('highest').item);

    console.log("видаляємо oldest:", myQueue.dequeue('oldest').item);

  }, 100);
}, 100);