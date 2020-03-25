let addItems = document.querySelector('.add-items');
let itemsList = document.querySelector('.plates');
let items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e){
    e.preventDefault(); //prevents auto reload after the button is clicked which otherwise is it's default behaviour.
    let text = (this.querySelector('[name=item]')).value;
    let item = {
        text,
        done : false
    }
    items.push(item);
    populateList(items, itemsList); //items because that's where the input being given is being pushed and itemsList because that's where the.
    localStorage.setItem('items', JSON.stringify(items));
    this.reset(); //Resets the form after submit type button is clicked.
}

//Here in plates map function is applied as it will map over the array through each and every element inside it and because innerHTML accepts only the string values the array returned after mapping is joined converting the array into string.
function populateList (plates = [], platesList ){
    platesList.innerHTML = plates.map((plate,i) => {
        return `
        <li>
            <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
            <label for="item${i}">${plate.text}</label>
        </li>`
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input
    const el = e.target;
    const index = el.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);