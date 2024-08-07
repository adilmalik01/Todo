let addBtn = document.querySelector("#addtask")
let textInput = document.querySelector("#textInput")
let resultDiv = document.querySelector(".body")

window.onload = () => {
    createTodo()
}

addBtn.addEventListener("click", (e) => {
    e.preventDefault()
    inputValue = textInput.value
    if (inputValue) {
        saveLocal(inputValue)
        window.location.reload()
        return
    }
    textInput = ""
})

let getLocal = JSON.parse(localStorage.getItem("todo")) || []
const saveLocal = (inputValue) => {
    let data = {
        todoData: inputValue,
        completed: false
    }
    getLocal.push(data)
    localStorage.setItem("todo", JSON.stringify(getLocal))
}




function createTodo() {

    getLocal.forEach((item, index) => {
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');

        const leftSideDiv = document.createElement('div');
        leftSideDiv.classList.add('leftSide');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `checkInput-${index}`;
        checkbox.classList.add(`${checkbox.checked ? "completed " : null}`)
        checkbox.checked = item.completed;
        checkbox.onclick = () => checkedItem(index, checkbox.checked);

        leftSideDiv.appendChild(checkbox);

        const centerSideDiv = document.createElement('div');
        centerSideDiv.classList.add('centerSide');
        if (item.completed) {
            centerSideDiv.classList.add('completed');
        }


        const paragraph = document.createElement('p');
        paragraph.textContent = item.todoData;

        centerSideDiv.appendChild(paragraph);

        const rightSideDiv = document.createElement('div');
        rightSideDiv.classList.add('rightSide');

        const trashIcon = document.createElement('i');
        trashIcon.classList.add('bi', 'bi-trash-fill');
        trashIcon.onclick = () => deleteTodoItem(item)

        rightSideDiv.appendChild(trashIcon);

        todoDiv.appendChild(leftSideDiv);
        todoDiv.appendChild(centerSideDiv);
        todoDiv.appendChild(rightSideDiv);


        resultDiv.appendChild(todoDiv);
    });

}



function checkedItem(i, complete) {
    let getLocal = JSON.parse(localStorage.getItem("todo")) || []
    getLocal[i].completed = complete
    localStorage.setItem("todo", JSON.stringify(getLocal))
    window.location.reload()

}


function deleteTodoItem(i) {
    let getLocal = JSON.parse(localStorage.getItem("todo")) || []
    getLocal.splice(i, 1)
    localStorage.setItem("todo", JSON.stringify(getLocal))
    window.location.reload()
}