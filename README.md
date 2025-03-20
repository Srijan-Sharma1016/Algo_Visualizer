# Algo Visualizer - Sorting Algorithm Visualizer

A dynamic web application that visualizes the internal mechanics of various sorting algorithms in real-time. Built to demonstrate the differences in algorithmic efficiency ($O(N^2)$ vs $O(N \log N)$) through interactive animations.

**[Live Demo](https://algo-visualizer-git-main-srijansharma1016s-projects.vercel.app/)**
## 🚀 Features
* **Interactive Visualization:** Watch algorithms sort data in real-time.
* **Custom Controls:** Adjust array size and sorting speed.
* **Performance Metrics:** Displays real-time Time Complexity execution.
* **Color-Coded Logic:**
    * **Default:** Unsorted
    * **Compare/Swap:** Active Elements
    * **Sorted:** Final position

## 🛠 Algorithms Implemented
| Algorithm | Time Complexity | Space Complexity | Description |
| :--- | :---: | :---: | :--- |
| **Bubble Sort** | $O(N^2)$ | $O(1)$ | Simple pairwise swapping. |
| **Selection Sort** | $O(N^2)$ | $O(1)$ | Selects smallest element and moves to front. |
| **Insertion Sort** | $O(N^2)$ | $O(1)$ | Builds sorted array one item at a time. |
| **Merge Sort** | $O(N \log N)$ | $O(N)$ | Divide and conquer strategy. |
| **Quick Sort** | $O(N \log N)$ | $O(\log N)$ | Partition-based sorting. |

## 💻 Tech Stack
* **Frontend:** HTML5, CSS3
* **Scripting:** Vanilla JavaScript (ES6+)
* **Deployment:** Vercel