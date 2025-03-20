"use strict";

const updateProgress = (current, total) => {
  const percentage = Math.round((current / total) * 100);
  document.getElementById('progressBar').style.width = percentage + '%';
  document.getElementById('progressPercent').textContent = percentage + '%';
};

const start = async () => {
  document.querySelector(".footer > p:nth-child(1)").style.visibility = "hidden";
  
  // Reset progress
  updateProgress(0, 100);
  
  let now = new Date();
  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = Number(document.querySelector(".speed-menu").value);

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  
  // Reset counters before starting
  algorithm.help.resetCounters();
  
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 4) await algorithm.MergeSort();
  if (algoValue === 5) await algorithm.QuickSort();
  
  // Set progress to 100% when done
  updateProgress(100, 100);
  
  let now1 = new Date();
  document.getElementById('Ttime').innerHTML = (now1 - now) / 1000;
  // document.querySelector(".footer > p:nth-child(2)").style.visibility = "visible";
};
var i=0;
let input = "N"; // Initialize input mode to "N" (Random)

const RenderScreen = async () => {
  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
};

const RenderInput = async () => {
  input = String(document.querySelector(".input").value);
  console.log("input mode changed to:", input);
  
  // Show/hide input box based on mode
  const inputBoxParent = document.querySelector(".inputBoxParent");
  const inputBox = document.querySelector(".inputBox");
  
  if (input === "Y") {
    inputBoxParent.style.display = "block";
    inputBox.focus();
  } else {
    inputBoxParent.style.display = "none";
    inputBox.value = ""; // Clear input when switching to random mode
  }
  
  await RenderList();
};

const RenderList = async () => {
  // Get current input mode
  input = String(document.querySelector(".input").value);
  
  let sizeValue = Number(document.querySelector(".size-menu").value);
  
  await clearScreen();
  
  // Reset counters and progress
  document.getElementById('comparisons').textContent = '0';
  document.getElementById('swaps').textContent = '0';
  updateProgress(0, 100);
  
  let list = await randomList(sizeValue);
  const arrayNode = document.querySelector(".array");
  console.log("array Node in app.js is ",arrayNode);
  console.log("list in app.js is ",list);
  
  if (list.length === 0) {
    alert("Please enter valid array values or select array size!");
    return;
  }
  
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = Number(document.querySelector(".size-menu").value);
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;
  
  // Get current input mode
  const currentInputMode = String(document.querySelector(".input").value);

  if (currentInputMode === "Y") {
    let inpBox = document.querySelector(".inputBox");
    let inputReceived = inpBox.value.trim();

    console.log("input received is ", inputReceived);

    if (!inputReceived || inputReceived === "") {
      alert("Please enter array values separated by spaces!");
      return [];
    }

    // Split by whitespace (spaces, tabs, etc.) and process each value
    let inputArray = inputReceived.split(/\s+/).filter(item => item !== '');
    console.log("input array before processing:", inputArray);
    
    // Convert to numbers, filter out invalid values
    for (let i = 0; i < inputArray.length; i++) {
      let value = inputArray[i].trim();
      if (value !== "") {
        let numValue = parseInt(value);
        if (!isNaN(numValue) && numValue > 0) {
          // Ensure values are within reasonable range for visualization
          if (numValue > 100) numValue = 100;
          if (numValue < 1) numValue = 1;
          list.push(numValue);
        } else {
          console.warn("Invalid number:", value);
        }
      }
    }
    
    console.log("processed list:", list);
    
    if (list.length === 0) {
      alert("Please enter valid numbers separated by spaces!");
      return [];
    }
    
    Length = list.length;
    console.log("Final Length:", Length, "list.length:", list.length);
  } else {
    // Random mode - generate random numbers
    if (Length === 0) {
      Length = 20; // Default size if none selected
    }
    
    for (let counter = 0; counter < Length; ++counter) {
      let randomNumber = Math.floor(
        Math.random() * (upperBound - lowerBound + 1) + lowerBound
      );
      list.push(parseInt(randomNumber));
    }
  }
  
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".size-menu").addEventListener("change", RenderList);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
document.querySelector(".input").addEventListener("change", RenderInput);

// Add event listener for input box to re-render when user types (with debounce)
let inputTimeout;
const inputBox = document.querySelector(".inputBox");

inputBox.addEventListener("input", () => {
  clearTimeout(inputTimeout);
  inputTimeout = setTimeout(() => {
    if (document.querySelector(".input").value === "Y") {
      RenderList();
    }
  }, 500); // Wait 500ms after user stops typing
});

// Allow Enter key to apply input immediately
inputBox.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && document.querySelector(".input").value === "Y") {
    e.preventDefault();
    RenderList();
  }
});

// Initialize on page load
window.onload = () => {
  // Hide input box initially since default is "N" (Random)
  document.querySelector(".inputBoxParent").style.display = "none";
  RenderScreen();
};