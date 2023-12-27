// Priority Queue 
interface IQueue<T> {
    enqueue(dataItem: T, priority:number): void;
    dequeue(): T | null;
    empty: boolean;
    size: number;
 }

// Victorias Improved Queue
class SimpleQueue<T> implements IQueue<T> {
    private queueData: T[] = [];
    
    public get empty(): boolean {
        return this.queueData.length<=0;
    }

    public get size(): number {
        return this.queueData.length;
    }

    public enqueue(dataItem: T, priority:number = 1): void {
        this.queueData.push(dataItem);
    }

    public dequeue(): T | null {
        return this.empty ? null : this.queueData.shift() ?? null;
    }
}

// Simple implementation using [T,prio] and sort
class SimplePriorityQueue<T> implements IQueue<T> {
    private queueData: [prio:number,value:T][] = [];
    
    public get empty(): boolean {
        return this.queueData.length<=0;
    }

    public get size(): number {
        return this.queueData.length;
    }

    public enqueue(dataItem: T, priority:number = 1): void {
        this.queueData.push([priority,dataItem]);
        this.queueData.sort((a,b) => {return b[0]-a[0]});
    }

    public dequeue(): T | null {
        if(this.empty) return null;
        const head = this.queueData.shift() ?? [null,null];
        return head[1];
    }
}

// Map based implementation using map prio:array
class MapPriorityQueue<T> implements IQueue<T> {
    private queueData: Map<number,T[]> = new Map<number,T[]>();
    
    public get empty(): boolean {
        return this.queueData.size<=0;
    }

    public get size(): number {
        return this.queueData.size;
    }

    public enqueue(dataItem: T, priority:number = 1): void {
        let qdata:T[] = this.queueData.get(priority) ?? [];
        qdata.push(dataItem);
        this.queueData.set(priority,qdata);
    }

    public dequeue(): T | null {
        if(this.empty) return null;
        let priority:number = Math.max(...this.queueData.keys());
        let qdata:T[] = this.queueData.get(priority) ?? [];
        let item:T|null = qdata.shift() ?? null;
        if(qdata.length === 0) {
            this.queueData.delete(priority);
        } else {
            this.queueData.set(priority,qdata);
        }
        return item ?? null;
    }
}

const range:number = 10000;
let start:number = 0, end:number = 0, count:number = 0;
let testOut:string = '';

// Simple queue
const simpleQ = new SimpleQueue();
start = performance.now();
for(let i=0; i<range; i++) {
    simpleQ.enqueue(Math.random()*range);
}
end = performance.now()
console.log("Simple queue enqueue time:", end-start);

start = performance.now();
count = 0;
while(!simpleQ.empty) {
    simpleQ.dequeue();
    count++;
}
end = performance.now()
console.log("Simple queue dequeued items:",count);
console.log("Simple queue dequeue time:", end-start);
console.log("-----");

// Simple priority queue
const simplePrioQ = new SimplePriorityQueue();

console.log("Simple Priority Enqueued 1:1,2:1,3:1,4:5,5:9");
simplePrioQ.enqueue(1,1);
simplePrioQ.enqueue(2,1);
simplePrioQ.enqueue(3,1);
simplePrioQ.enqueue(4,5);
simplePrioQ.enqueue(5,9);

while(!simplePrioQ.empty) {
    testOut += " " + simplePrioQ.dequeue();
}
console.log("Simple Priority Queue Dequeued:",testOut); 

start = performance.now();
for(let i=0; i<range; i++) {
    simplePrioQ.enqueue(Math.random()*range,Math.floor(Math.random()*9)+1);
}
end = performance.now()
console.log("Simple Priority queue enqueue time:", end-start);

start = performance.now();
count = 0;
while(!simplePrioQ.empty) {
    simplePrioQ.dequeue();
    count++;
}
end = performance.now()
console.log("Simple priority queue dequeued items:",count);
console.log("Simple priority queue dequeue time:", end-start);
console.log("-----");

// Map priority queue
const mapPrioQ = new MapPriorityQueue();

console.log("Map Priority Enqueued 1:1,2:1,3:1,4:5,5:9");
mapPrioQ.enqueue(1,1);
mapPrioQ.enqueue(2,1);
mapPrioQ.enqueue(3,1);
mapPrioQ.enqueue(4,5);
mapPrioQ.enqueue(5,9);

testOut = '';
while(!mapPrioQ.empty) {
    testOut += " " + mapPrioQ.dequeue();
}
console.log("Map Priority Queue Dequeued:",testOut); 

start = performance.now();
for(let i=0; i<range; i++) {
    mapPrioQ.enqueue(Math.random()*range,Math.floor(Math.random()*9)+1);
}
end = performance.now()
console.log("Map Priority queue enqueue time:", end-start);

start = performance.now();
count = 0;
while(!mapPrioQ.empty) {
    mapPrioQ.dequeue();
    count++;
}
end = performance.now()
console.log("Map priority queue dequeued items:",count);
console.log("Map priority queue dequeue time:", end-start);
console.log("-----");