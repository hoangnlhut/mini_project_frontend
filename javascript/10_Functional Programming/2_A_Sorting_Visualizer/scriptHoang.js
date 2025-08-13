
const startingArray = document.getElementById("starting-array");
const arrayContainer = document.getElementById("array-container");

//returns a random integer between 1 and 100
const generateElement = () => Math.floor(Math.random() * 100) + 1;
const generateArray = () => {
    const result  = [];
    for(let i = 0; i < 5; i++)
    {
        const element = generateElement();
        result.push(element);
    }
    return result;
};

let arrInput = [];

const bubbleSortedArr = ()=> {
    let countForId  = 1;
    while(true)
    {
        let count = 0;

        for(let i = 0 ; i < arrInput.length-1; i++){
            if(countForId === 1 && i === 0)
            {
                highlightCurrentEls(startingArray, i);
                swapElements(arrInput, i);
            }
            else{
                addSortedArrDivElementToContainer(countForId, i, arrInput);
                const getSpecificNewDiv = document.getElementById(`sorted-array-${countForId}${i}`);
                highlightCurrentEls(getSpecificNewDiv, i);
                swapElements(arrInput, i);
            }
        }

        for(let a = 0 ; a < arrInput.length - 1; a++){
           if(!isOrdered(arrInput[a], arrInput[a + 1]))
           {
                count++;
                break;
           }
        }

        if(count === 0) {
            break;
        }

        countForId++;
    }
};

const generateContainer = () =>  document.createElement("div");

const fillArrContainer  = (htmlElement, arrInput) => {
    htmlElement.textContent = '';
    arrInput.forEach(item => {
        htmlElement.innerHTML += `<span>${item}</span>`;
    });
    
};

const isOrdered = (num1, num2) => num1 <= num2;

const swapElements = (arrInt, index) => {
    if(!isOrdered(arrInt[index], arrInt[index + 1]))
    {
         const temp = arrInt[index];
         arrInt[index] = arrInt[index + 1];
         arrInt[index + 1] = temp;
         return true;
    }

    return false;
};

const highlightCurrentEls = (htmlElement, index) => {
    htmlElement.children[index].style.border = "2px dashed red";
    htmlElement.children[index + 1].style.border = "2px dashed red";
};

const addSortedArrDivElementToContainer = (countForId, index, arrayInputs, isSortedArray = false) => {
    const newDiv = generateContainer();
    if(isSortedArray){
        newDiv.id = "sorted-array";
        newDiv.style.border = "4px solid green";
    }
    else
    {
        newDiv.className = "sorted-array";
        const idOfNewDiv = "sorted-array-"+ countForId  + index;
        newDiv.id = idOfNewDiv;
    }

    fillArrContainer(newDiv,arrayInputs);
    arrayContainer.appendChild(newDiv);
};

document.getElementById("generate-btn").addEventListener("click", () => {
    arrInput = generateArray();
    if(startingArray.innerHTML !== '')
    {
        const getAllChildSortedArray = document.getElementsByClassName("sorted-array");
        [...getAllChildSortedArray].forEach(item => arrayContainer.removeChild(item));

        const getSortedElement = document.getElementById("sorted-array");
        if(getSortedElement != null) arrayContainer.removeChild(getSortedElement);

        // arrayContainer.innerHTML = '<div id="starting-array"></div>';
    }

    fillArrContainer(startingArray, arrInput);
});

document.getElementById("sort-btn").addEventListener("click", () => {
    bubbleSortedArr();
    addSortedArrDivElementToContainer(99, 99, arrInput, true);
});

