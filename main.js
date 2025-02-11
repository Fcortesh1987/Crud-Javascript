function ValidateForm(){
    let name = document.getElementById('inputName').value;
    let email = document.getElementById('inputEmail').value;
    let phone = document.getElementById('inputPhone').value;

    if (name == ""){
        alert('El campo nombre es requerido');
        return false;
    }
    if (email == ""){
        alert('El campo correo es requerido');
        return false;
    }else if(!email.includes('@')){
        alert('El campo de correo es requerido');
        return false;
    }
    if (phone == ""){
        alert('El campo telefono es requerido');
        return false;
    }
    return true;
}

function ReadData(){

    let listPeople;

    if (localStorage.getItem('listPeople') == null){
        listPeople = [];
    }else{
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    var html = "";

    listPeople.forEach(function(element, index) {
        html += "<tr>";
        html += "<td>"+ element.name + "</td>";
        html += "<td>"+ element.email + "</td>";
        html += "<td>"+ element.phone + "</td>";
        html += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar Dato</button> <button onclick="updateData('+ index +')" class="btn btn-warning">Editar Dato</button></td>';
        html += "</tr>";
    });

    document.querySelector('#tableData').innerHTML = html;

}
document.onload = ReadData();

function AddData(){
    if (ValidateForm() == true) {
        let name = document.getElementById('inputName').value;
        let email = document.getElementById('inputEmail').value;
        let phone = document.getElementById('inputPhone').value;

        var listPeople;

        if (localStorage.getItem('listPeople') == null){
            listPeople = [];
        } else {
            listPeople = JSON.parse(localStorage.getItem('listPeople'));
        }

        listPeople.push({
            email: email,
            name: name,
            phone: phone
        });

        localStorage.setItem('listPeople', JSON.stringify(listPeople));

        ReadData();

        document.getElementById('inputName').value="";
        document.getElementById('inputEmail').value="";
        document.getElementById('inputPhone').value="";
    }
}

function deleteData(index) {

    let listPeople;

    if (localStorage.getItem('listPeople') == null){
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    listPeople.splice(index, 1);
    localStorage.setItem('listPeople', JSON.stringify(listPeople));

    ReadData();

}

function updateData(index){
    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'block';

    let listPeople;

    if (localStorage.getItem('listPeople') == null){
        listPeople = [];
    } else {
        listPeople = JSON.parse(localStorage.getItem('listPeople'));
    }

    document.getElementById('inputName').value = listPeople[index].name;
    document.getElementById('inputEmail').value = listPeople[index].email;
    document.getElementById('inputPhone').value = listPeople[index].phone;

    document.querySelector('#btnUpdate').onclick = function() {
        if (ValidateForm() == true){
            listPeople[index].name = document.getElementById('inputName').value;
            listPeople[index].email = document.getElementById('inputEmail').value;
            listPeople[index].phone = document.getElementById('inputPhone').value;

            localStorage.setItem('listPeople', JSON.stringify(listPeople));
            ReadData();

            document.getElementById('inputName').value = "";
            document.getElementById('inputEmail').value = "";
            document.getElementById('inputPhone').value = "";

            document.getElementById('btnAdd').style.display = 'block';
            document.getElementById('btnUpdate').style.display = 'none';
        }
    }
}



