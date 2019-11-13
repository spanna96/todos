window.addEventListener('DOMContentLoaded', async () => {
    let todoElements = [];
    localStorage.setItem("todo", JSON.stringify(todoElements)); //запись массива
    const btnAdd = document.getElementById('btnAdd');
    const inputField = document.getElementById("fld1");
    const nodes = headElement.children;

    const btnSetColor1 = document.getElementById('btnColor1');
    const btnSetColor2 = document.getElementById('btnColor2');
    const btnSetColor3 = document.getElementById('btnColor3');
    const btnSetColor4 = document.getElementById('btnColor4');
    const btnSetColor5 = document.getElementById('btnColor5');

    btnAdd.onclick = function () {
        let c = Math.round(randomColorNumb(1, 5));
        if (inputField.value.trim()) //проверка содержания строки без пробелов
            todoElements.push({ text: inputField.value, color: 'Color' + c });
        render();
        localStorage.setItem("todo", JSON.stringify(todoElements));
    };


    btnSetColor1.onclick = () => {
        changeColor('color1');
    };
    btnSetColor2.onclick = () => {
        changeColor('color2');
    };
    btnSetColor3.onclick = () => {
        changeColor('color3');
    };
    btnSetColor4.onclick = () => {
        changeColor('color4');
    };
    btnSetColor5.onclick = () => {
        changeColor('color5');
    };

    inputField.addEventListener("keypress", (keyPressed) => {
        const keyEnter = 13;
        if (keyPressed.which == keyEnter) {
            let c = Math.round(randomColorNumb(1, 5));
            if (inputField.value.trim()) //проверка содержания строки без пробелов
            todoElements.push({ text: inputField.value, color: 'Color' + c });
             render();
        };
    });//добавить нажатием Enter

    function render() {
        let toClear = headElement.lastElementChild;
        while (toClear) {
            headElement.removeChild(toClear);
            toClear = headElement.lastElementChild;
        };

        todoElements.forEach((e, i) => {
            const div = document.createElement("div");
            const headElement = document.getElementById("lkio");
            const checkBox = document.createElement("input");
            const textField = document.createElement("span");
            const delBtn = document.createElement("input");
            const editBtn = document.createElement("input");

            div.id = +i;
            nodes.class = "";


            textField.id = "txt";
            checkBox.type = "checkBox";
            checkBox.id = "chkBox";
            checkBox.class = "check";
            delBtn.type = "button";
            delBtn.id = "dltBtn";
            delBtn.value = "✘";
            delBtn.onclick = clickToDelete; //кнопка удалить
            editBtn.type = "button";
            editBtn.id = "edtBtn";
            editBtn.value = "✎";
            editBtn.onclick = clickToEdit;

            textField.textContent = e.text;

            div.appendChild(checkBox);
            div.appendChild(textField);
            div.appendChild(editBtn);
            div.appendChild(delBtn);

            div.className = "gridEl " + e.color;


            headElement.appendChild(div);

        });
        inputField.value = "";

    };//функция для ввода данных


    function clickToDelete() {
        const index = this.parentElement.id;
        todoElements.splice(index, 1);
        render()

    };//функция удаления данных



    function changeColor(color) {
        for (let i = 0; i < nodes.length; i++) {
            if (nodes[i].firstChild.checked) todoElements[i].color = color;
        }
        render();
    };//функция изменения цвета

    function randomColorNumb(min, max) {
        return Math.random() * (max - min) + min; //cделать округление до целого
    };//функция рандома чисел

    function clickToEdit() {
        const txtBlock = this.parentElement;
        const index = txtBlock.id;
        const div = document.getElementById(index);
        const lastTxt = txtBlock.textContent;
    
        const textForEdit = document.createElement("input");
        textForEdit.id = "edtFld";
        textForEdit.value = txtBlock.textContent; //присваиваем уже существующий текст
        let thisElement = todoElements[index];
        txtBlock.textContent = '';
        txtBlock.appendChild(textForEdit);


        let colorClass = txtBlock.className.slice(7);

        textForEdit.addEventListener("keypress", (keyPressed) => {
            const keyEnter = 13;

            if (keyPressed.which == keyEnter) {
                
                if (textForEdit.value.trim()){
                    todoElements.splice(index, 1, { text: textForEdit.value, color: colorClass });
                } else {
                    todoElements.splice(index, 1, { text: lastTxt, color: colorClass });
                }
                render();

            };
        });

    };//функция редактирования данных

});
