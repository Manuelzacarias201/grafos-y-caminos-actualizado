import LinkedList from "./LinkedList.mjs";

export default class Graph {
    #matrizAdyacencia = [];
    #map = new Map();

    constructor() {}

    addVertices(...vertices) {
        for (let value of vertices) {
            if (!this.#map.has(value)) {
                this.#matrizAdyacencia.push(new LinkedList());
                this.#map.set(value, this.#matrizAdyacencia.length - 1);
            }
        }
    }

    addVertex(vertex) {
        if (!this.#map.has(vertex)) {
            this.#matrizAdyacencia.push(new LinkedList());
            this.#map.set(vertex, this.#matrizAdyacencia.length - 1);
            return true;
        }
        return false;
    }

    addC(node1, node2, weight = 1) {
        if (this.#map.has(node1) && this.#map.has(node2)) {
            this.#matrizAdyacencia[this.#map.get(node1)].push(node2, weight);
            return true;
        }
        return false;
    }

    dfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const stack = [];
        stack.push(startVertex);

        while (stack.length > 0) {
            const currentVertex = stack.pop();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current) {
                    const neighborVertex = current.value.node;
                    if (!visited[neighborVertex]) {
                        stack.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }

    bfs(startVertex, callback) {
        if (!this.#map.has(startVertex)) {
            return;
        }

        const visited = {};
        const queue = [];
        queue.push(startVertex);

        while (queue.length > 0) {
            const currentVertex = queue.shift();
            if (!visited[currentVertex]) {
                callback(currentVertex);
                visited[currentVertex] = true;
                const neighborsLinkedList = this.#matrizAdyacencia[this.#map.get(currentVertex)];
                let current = neighborsLinkedList.head;
                while (current !== null) {
                    const neighborVertex = current.value.node;
                    if (!visited[neighborVertex]) {
                        queue.push(neighborVertex);
                    }
                    current = current.next;
                }
            }
        }
    }

    dijkstra(startVertex, endVertex) {
        const inf = Number.MAX_SAFE_INTEGER;
        const distances = new Array(this.numVertices()).fill(inf);
        const visited = new Array(this.numVertices()).fill(false);
        const startIndex = this.#map.get(startVertex);
        const endIndex = this.#map.get(endVertex);
        distances[startIndex] = 0;

        while (true) {
            let u = -1;
            let minDistance = inf;

            for (let i = 0; i < this.numVertices(); i++) {
                if (!visited[i] && distances[i] < minDistance) {
                    minDistance = distances[i];
                    u = i;
                }
            }
            if (u === -1) {
                break;
            }

            visited[u] = true;

            const neighbors = this.#matrizAdyacencia[u];
            let current = neighbors.head;

            while (current) {
                const neighborIndex = this.#map.get(current.value.node);
                const weight = current.value.weight;

                if (distances[u] + weight < distances[neighborIndex]) {
                    distances[neighborIndex] = distances[u] + weight;
                }
                current = current.next;
            }
        }

        return distances[endIndex];
    }

    getVertices() {
        return this.#map.keys();
    }

    getNeighbors(vertex) {
        const index = this.#map.get(vertex);
        if (index !== undefined) {
            return this.#matrizAdyacencia[index];
        }
        return null;
    }

    numVertices() {
        return this.#map.size;
    }
}
