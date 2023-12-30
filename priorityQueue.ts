// Priority Queue
import {MaxPriorityQueue} from "@datastructures-js/priority-queue";

const range: number = 10000000;

let end: number = 0;
let count: number = 0;
let start: number = 0;
let testOut: string = '';

type IPair = {
    value: number
    priority: number
}

const queue = new MaxPriorityQueue<IPair>(value => value.priority);

console.log("Priority Enqueued 1:1,2:1,3:1,4:5,5:9");
queue.enqueue({value: 1, priority: 1});
queue.enqueue({value: 2, priority: 1});
queue.enqueue({value: 3, priority: 1});
queue.enqueue({value: 4, priority: 5});
queue.enqueue({value: 5, priority: 9});

testOut = '';
while (!queue.isEmpty()) {
    testOut += " " + queue.dequeue().value;
}
console.log("Priority Queue Dequeued:", testOut);

start = performance.now();
for (let i = 0; i < range; i++) {
    queue.enqueue({
        value: Math.random() * range,
        priority: Math.floor(Math.random() * 9) + 1
    });
}
end = performance.now()
console.log(`Priority queue enqueue time: ${end - start}ms`);

start = performance.now();
count = 0;
while (!queue.isEmpty()) {
    queue.dequeue();
    count++;
}
end = performance.now()
console.log("priority queue dequeued items:", count);
console.log(`priority queue dequeue time: ${end - start}ms`);
console.log("-----");
