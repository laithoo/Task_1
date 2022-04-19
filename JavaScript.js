//start job...
function show() {
    //validate Textbox
    if (document.getElementById("Text1").value == "") {
        document.getElementById("error").innerHTML = '<div class="alert alert-danger" role="alert">kindly enter number of rows you want.</div>';
    } else {
    //Delete error message
    document.getElementById("error").innerHTML = "";
    
    //Get categories you want to return  
    var e = document.getElementById("Category");
    var Category = e.value;

    var category = '[';
    for (i = 1; i <= Category; i++) {
        category += "\"category" + i + "\",";
    }
    category = category.slice(0, -1);
    category += "]";

    //Allow pretty
    var pretty;
    var checkBox = document.getElementById("checkbox1");
    if (checkBox.checked == true) {
        pretty = "true";
    } else {
        pretty = "false";
    }
    
    //input number of rows
    var rows = document.getElementById("Text1").value;
   
    //call API
    var xmlhttp = new XMLHttpRequest();
    var url = "https://filltext.com/?rows=" + rows + "&fname={firstName}&lname={lastName}&pretty=" + pretty + "&address={addressObject}&email={email}&category=" + category + "&pertty=true";

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            insert_tab(myArr);           
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    }
}



function insert_tab(arr) {
    //This two variables to store finlal result
    var out = "";
    var out_0 = "";

    //Get categories and store in array 
    const category = [];
    for (i = 0; i < arr.length; i++) {
        category[i] = arr[i].category;
        name[i] = arr[i].fname + ' ' + arr[i].lname;
    }
    let unique_category = [...new Set(category)];

    // descending category
    unique_category.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (b > a) {
            return 1;
        }
        return 0;
    });

    //Get data and prepart to display 
    for (i = 0; i < unique_category.length; i++) {
        //add tab...
        out += '<li><a href=#' + unique_category[i] + '>' + unique_category[i] + ' <b class="style1"> ' + CalculateUsers(arr,unique_category[i]) + ' </b></a></li>';

        //Get User and puting in tags (firstName,lastName,pretty,address,email,category) 
        if (i === 0) {
            out_0 += '<div id=' + unique_category[i] + ' class="tab-pane fade in active">' + fillitems(arr, unique_category[i]) + '</div>';
        } else {
            out_0 += '<div id=' + unique_category[i] + ' class="tab-pane fade">' + fillitems(arr, unique_category[i]) + '</div>';
        }
    }
   
    //Remove duplicate in a category and sort
    out = "<ul class='nav nav-tabs'>" + Array.from(new Set(out.split('</a></li>'))).sort().join('') + "</ul>";
    out_0 = "<div class='tab-content'>" + out_0 + "</div>";

    //implements tags in html page...
    document.getElementById("id00").innerHTML = out;
    document.getElementById("id01").innerHTML = out_0;

    //Set a <wave> element to not be displayed
    document.getElementById("wave").style.display = "none";


    //JQuary show tabs
    $(document).ready(function () {
        $(".nav-tabs a").click(function () {
            $(this).tab('show');
        });
    });

    //myFunction(arr);
}

//Prepare cards...
function fillitems(arr, category) {
    var out_2 = '<div class="row">';
    for (j = 0; j < arr.length; j++) {
        if (arr[j].category === category) {
            //Create Card and putting data inside
            out_2 += '<div class=\"col-4\">' +
                    '<div class=\"list-group-item d-flex align-items-center\">' +
                        '<div class=\"me-4\">' +
                            '<div class=\"avatar rounded-circle \">' +
                                '<h2 class=\"style1\">' + arr[j].fname.charAt(0) + arr[j].lname.charAt(0) + '</h2>' +
                            '</div>' +
                        '</div>' +
                        '<div class=\"flex-fill\"><b>' + arr[j].fname + ' ' + arr[j].lname + ' ' + arr[j].email + '</b><span class=\"d-block text-sm text-muted\">' + arr[j].address.streetAddress + ', ' + arr[j].address.city +  '</span></div>                       ' +
                        '<div class=\"bg-white border px-3 py-2 style2\">' + category + '</div>' +
                    '</div>' +
                '</div>';
        }
    }
    out_2 += '</div>';
    return out_2;
}


//Calculate Number of users...
function CalculateUsers(arr, category) {
    count = 0;
    for (j = 0; j < arr.length; j++) {
        if (arr[j].category === category) {
            count += 1;
        }   
    }
   
    return count;
}

