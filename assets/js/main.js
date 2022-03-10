function ajaxCallBack(filename, result){ 
    $.ajax({
        url: filename,
        method: "get",
        dataType: "json",
        success: result,
        error: function(xhr, error, status){
            console.log(xhr)  
        }
    });
}
function setItemToLocalStorage(name, data){
    localStorage.setItem(name, JSON.stringify(data));
}
function getItemFromLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
}
let arrayArticles = [];
let articlesInCart = [];
window.onload=function(){
    let url = window.location.pathname;
    if(url == "/Viking_Supplements/" || url == "/Viking_Supplements/index.html"){
        numberOfArticles()
        ajaxCallBack("assets/data/articles.json",function(result){
            ipisItems(result)  
        })
        ajaxCallBack("assets/data/menu.json",function(result){
            navMenu(result, ".menu-list")
            navMenu(result, ".list")
            numberOfArticles() 
        })
    }
    if(url == "/Viking_Supplements/shop.html"){
        numberOfArticles() 
        ajaxCallBack("assets/data/brands.json",function(result){
            ispisBrendova(result)
        })
        ajaxCallBack("assets/data/categories.json",function(result){
            ispisKategorija(result)
        })
        ajaxCallBack("assets/data/articles.json",function(result){
            ispisArtikala(result)
            setItemToLocalStorage("articles",result);
        })
        ajaxCallBack("assets/data/menu.json",function(result){
            navMenu(result, ".menu-list")
            navMenu(result, ".list")
            numberOfArticles() 
        })

document.querySelector("#rangeValue").addEventListener("input", filterChange)
document.querySelector("#search").addEventListener("keyup",filterChange)
document.querySelector("#list").addEventListener("change", filterChange)
    }
    if(url == "/Viking_Supplements/contact.html"){
        ajaxCallBack("assets/data/menu.json",function(result){
            navMenu(result, ".menu-list")
            navMenu(result, ".list")
            numberOfArticles() 
        })
    let formSubmit = document.getElementById("form");
    formSubmit.addEventListener("submit",(e)=>{
	e.preventDefault();
	var username = document.getElementById('username').value
	var email = document.getElementById('mail').value
	var subject = document.getElementById('subject').value
	var nameCheck = /^[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}\s[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}$/
	var mailCheck = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
	var subjectCheck = /^[a-zA-Z]{2,}$/
	var usernameBool = false;
	var emailBool = false;
	var subjectBool = false;
	
	if(nameCheck.test(username)){
	document.getElementById('name-error').innerHTML = "";
	usernameBool = true;
	}
	else{
	document.getElementById('name-error').innerHTML = "*Invalid name,both first and last name must start with upper case*";
	usernameBool= false;
	}
	if(mailCheck.test(email)){
		document.getElementById('mail-error').innerHTML = "";
		emailBool = true;
	}
	else{
		document.getElementById('mail-error').innerHTML = "*Invalid E-Mail*";
		emailBool = false;
	}
	if(subjectCheck.test(subject)){
		document.getElementById('subject-error').innerHTML = "";
		subjectBool = true
	}
	else{
		document.getElementById('subject-error').innerHTML = "*Invalid subject,It has to start with upper case and must be longer than 2 characters*";
		subjectBool = false
	}
	if(usernameBool&&emailBool&&subjectBool)
	{
		alert("You have succesfuly made an appointment");
		setTimeout("location.reload(true);",0)
	}
    });	
    }
    if(url == "/Viking_Supplements/cart.html"){
        ajaxCallBack("assets/data/articles.json",function(result){
            arrayArticles = getItemFromLocalStorage("articles");
            articlesInCart = getItemFromLocalStorage('cart')
            cartCheck();
        })
        ajaxCallBack("assets/data/menu.json",function(result){
            navMenu(result, ".menu-list")
            navMenu(result, ".list")
            numberOfArticles() 
        })
        let formSubmit = document.getElementById("order");
        formSubmit.addEventListener("submit",(e)=>{
        e.preventDefault();
        var username = document.getElementById('username').value
        var email = document.getElementById('mail').value
        var phoneNumber = document.getElementById('phone').value
        var dropList = document.getElementById('list2').value
        var nameCheck = /^[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}\s[A-ZČĆŠĐŽ][a-zčćžđš]{2,15}$/
        var mailCheck = /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/
        var phoneNumerCheck = /^[0-9]{10}$/
        var checkBool = false;
        var usernameBool = false;
        var phoneBool = false;
        var listBool = false;
        var emailBool = false;
        
        if(nameCheck.test(username)){
        document.getElementById('name-error').innerHTML = "";
        usernameBool = true;
        }
        else{
        document.getElementById('name-error').innerHTML = "*Invalid name,both first and last name must start with upper case*";
        usernameBool= false;
        }
        if(mailCheck.test(email)){
            document.getElementById('mail-error').innerHTML = "";
            emailBool = true;
        }
        else{
            document.getElementById('mail-error').innerHTML = "*Invalid E-Mail*";
            emailBool = false;
        }
        if(phoneNumerCheck.test(phoneNumber)){
            document.getElementById('phone-error').innerHTML = "";
            phoneBool = true
            }
        else{
            document.getElementById('phone-error').innerHTML = "*Invalid phone number*";
            phoneBool = false
        }
        if(dropList==0){
            document.getElementById('option-error').innerHTML = "*Please choose delivery company*";
            listBool=false;
        }
        else{
            document.getElementById('option-error').innerHTML = "";
            listBool=true;
        }
        $('.check:checked').each(function(){
            checkBool=true
        })
        if(!checkBool){
            document.getElementById('checkbox-error').innerHTML = "You have to agree with out terms and coditions";
        }
        if(usernameBool&&emailBool&&listBool&&phoneBool&&checkBool)
        {
            let html='';
            html=`<div class="popup active" id="b">
                <div class="productInfo">
                <button id="closeButton">&times;</button>
                <div class="productText">
                <div class="innerProductText">
                    <p class='popupText'>You have succesfuly completed the purchase</p>
                </div>
                </div>
                </div>
            </div>
            <div class="active" id="overlay"></div>`
            document.querySelector("#zezanje").innerHTML=html;
            localStorage.removeItem('cart')
            setTimeout("location.reload(true);",3000)
            cartCheck()
        }
        });  
    }
    if(url == "/Viking_Supplements/about.html"){
        ajaxCallBack("assets/data/menu.json",function(result){
            navMenu(result, ".menu-list")
            navMenu(result, ".list")
            numberOfArticles() 
        })
    }
    //Functions
    function navMenu(navigation, klasa){
            let html="";
                for(let nav of navigation){
                    html+=`<li><a href="${nav.href}" target="_blank">${nav.name}</a></li>`
                }
            html+=`<li>
            <a href="cart.html">
            <i id="cartImg" class="fas fa-shopping-cart"></i><span id="cartIspis"></span>
            </a>
            </li>`
            const body = document.querySelector("body");
            const navbar = document.querySelector(".navbar");
            const menuBtn = document.querySelector(".menu-btn");
            const cancelBtn = document.querySelector(".cancel-btn");
            menuBtn.onclick = ()=>{
                navbar.classList.add("show");
                menuBtn.classList.add("hide");
                body.classList.add("disabled");
            }
            cancelBtn.onclick = ()=>{
                body.classList.remove("disabled");
                navbar.classList.remove("show");
                menuBtn.classList.remove("hide");
            }
            window.onscroll = ()=>{
                this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
            }
            document.querySelector(klasa).innerHTML+=html;
    }

    function ipisItems(data){
    let html="";
    for(let item of data){
        if(item.suggested){
            html+=`<div class="item">
            <div class="itemPic2">
                <a href="# class="activeItem><img id="${item.id}" src="${item.img}" alt="${item.name}"></a>
            </div>
            <div class="itemDescription">
                <h5>${item.name}</h5>
                <p>${staraCena(item.price.oldPrice)}<p>
                <p>$${item.price.newPrice}</p>
            </div>
            </div>`
        }
        popupWindow(data)
    }
    document.querySelector("#slider1").innerHTML=html
    $('#slider1').slick({
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 768,
            settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
            }
        }
        ]    
    });
    let html2="";
    for(let item of data){
        if(item.discount){
            html2+=`<div class="item">
            <div class="itemPic2">
                <a href="# class="activeItem><img id="${item.id}" src="${item.img}" alt="${item.name}"></a>
            </div>
            <div class="itemDescription">
                <h5>${item.name}</h5>
                <p>${staraCena(item.price.oldPrice)}<p>
                <p>$${item.price.newPrice}</p>
            </div>
            </div>`
        }
        popupWindow(data)
    }
    document.querySelector("#slider2").innerHTML=html2
    $('#slider2').slick({
        slidesToShow: 3,
        arrows: false,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
        {
            breakpoint: 768,
            settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
            arrows: false,
            centerMode: true,
            centerPadding: '40px',
            slidesToShow: 1
            }
        }
        ]
    });
    popupWindow(data)
    }
    function ispisArtikala(data){
        let html="";
        data= rangeFilter(data);
        data = serachFilter(data)
        data = sorting(data)
        data = filterCat(data)
        data = brandFilter(data)
        if(data.length==0){
            html=`<div class="result">
            <h2>No matches found<h2>
            </div>`
        }
        else{
            for(let item of data){
                html+=`<div class="item">
                <div class="itemPic">
                    <a href="# class="activeItem><img id="${item.id}" src="${item.img}" alt="${item.name}"></a>
                </div>
                <div class="itemDescription">
                    <h5>${item.name}</h5>
                    <p>${staraCena(item.price.oldPrice)}<p>
                    <p>$${item.price.newPrice}</p>
                </div>
                </div>`
            }
        }
        document.querySelector("#articles").innerHTML=html;
        popupWindow(data)
    }
    function staraCena(cena){
        let html = "";
        if(cena != null){
            html = `<p class="overline">$${cena}</s>`;
        }
        return html;
    }
    function popupWindow(data){
        let html=""
        for(let item of data){
            $(`#${item.id}`).click(function(){
                html=`
                <div class="popup active" id="popup">
                <button id="closeButton">&times;</button>
                <div id="productImg">
                    <img class="aboutItem" src='${item.img}'>
                </div>
                <div class="productInfo">
                <div class="productText">
                <div class="innerProductText">
                    <h4>${item.name}</h4>
                    <p>${item.text}</p>
                    ${staraCena(item.price.oldPrice)}
                    <p>$${item.price.newPrice}</p>
                    <button data-id="${item.id}" class="addToCart">Add to cart</button>
                </div>
                </div>
                </div>
            </div>
            <div class="active" id="overlay"></div>`
            document.querySelector("#zezanje").innerHTML=html;
            $('.addToCart').click(addItemToCart)
            document.querySelector("#closeButton").addEventListener('click',function(){
                document.getElementById("popup").style.display="none"
                document.getElementById("overlay").style.display="none"
            })
        });
        }
    }
    function ispisBrendova(data){
        let html="";
        for(let brend of data){
            html+=`<div class="filters">
            <input type="checkbox" value="${brend.id}" class="brand" name="brands"/>
            <label for="scales">${brend.name}</label>
        </div>`
        }
        document.querySelector("#brands").innerHTML=html;
        $('.brand').change(filterChange);
    }
    function ispisKategorija(data){
        let html="";
        for(let cat of data){
            html+=`<div class="filters">
            <input type="checkbox" value="${cat.id}" class="cat" name="cate"/>
            <label for="scales">${cat.name}</label>
        </div>`
        }
        document.querySelector("#category").innerHTML=html;
        $('.cat').change(filterChange);
    }
    function sorting(data){
        var y= document.querySelector("#list").value
        if(y=="1"){
            data.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return 1
                }
                else if(a.name.toLowerCase()<b.name.toLowerCase()){
                    return -1
                }
                else{
                    return 0;
                }
            })
        }
        if(y=="2"){
            data.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()){
                    return -1
                }
                else if(a.name.toLowerCase()<b.name.toLowerCase()){
                    return 1
                }
                else{
                    return 0;
                }
            })
        }
        if(y=="3"){
            data.sort((a,b)=>{
                if(parseFloat(a.price.newPrice) > parseFloat(b.price.newPrice)){
                    return 1
                }
                else if(parseFloat(a.price.newPrice) < parseFloat(b.price.newPrice)){
                    return -1
                }
                else{
                    return 0;
                }
            })
        }
        if(y=="4"){
            data.sort((a,b)=>{
                if(parseFloat(a.price.newPrice) > parseFloat(b.price.newPrice)){
                    return -1
                }
                else if(parseFloat(a.price.newPrice) < parseFloat(b.price.newPrice)){
                    return 1
                }
                else{
                    return 0;
                }
            })
        }
        else{
            return data;
        }
        return data;
    }
    function filterCat(data){
        let selectedZanrovi = [];
        $('.cat:checked').each(function(el){
            selectedZanrovi.push(parseInt($(this).val()))
            console.log((parseInt($(this).val())))
        });
        if(selectedZanrovi.length != 0){
            return data.filter(x => x.categoryId.some(y => selectedZanrovi.includes(y)));
        }
        return data;
    }
    function brandFilter(data){
        let selectedBrands = [];
        $('.brand:checked').each(function(){
            selectedBrands.push(parseInt($(this).val()));
        });
        if(selectedBrands.length != 0){
            return data.filter(x => selectedBrands.includes(x.brandId));	
        }
        return data;
    }
    function rangeFilter(data){
        let x=document.querySelector("#rangeValue").value
        data=data.filter((e)=>{
            if(parseFloat(e.price.newPrice) <= parseFloat(x)){
                return e;
            }
        })
        document.querySelector("#valueRange").innerHTML=x
        return data
    }
    function serachFilter(data){
        let x=document.querySelector("#search").value
        return data.filter((e)=>{
            if(e.name.toLowerCase().indexOf(x.trim().toLowerCase())!=-1){
                return e;
            }
        })
    }
    function cartCheck(){
        let html = `<table><tr><td colspan="6"><h4>Your cart is empty</h4></td></tr></table>`;
        let total = 0;
        if(articlesInCart != undefined || articlesInCart!=null){
            let counter = 1;
            html = "<table>";
            for(let c of articlesInCart){
                for(let p of arrayArticles){
                    if(c.id == p.id){
                        html +=  `<tr>
                        <td>${counter++}</td>
                        <td><img src="${p.img}" alt="${p.name}"/></td>
                        <td>${p.name}</td>
                        <td><button data-id="${c.id}" class="removeOne">-</button></td>
                        <td>${c.quantity}</td>
                        <td><button data-id="${c.id}" class="addOne">+</button></td>
                        <td>$${Math.round(p.price.newPrice * c.quantity * 100)/ 100}</td>
                        <td><button data-id="${c.id}" class="removeAll">Remove All</button></td>
                    </tr>`
                        total += Math.round(p.price.newPrice * c.quantity * 100)/ 100
                    }
                    
                }
            }
            if(total==0){
                html += `<tr><td colspan="6"><h4>Your cart is empty</h4></td></tr></table>`;
            }
            else{
                html += `<tr><td colspan="6"><h4>Total price: $${total}</h4></td></tr></table>`;
            }   
        }
        $("#regionCart").html(html);
        $('.removeOne').click(removeOne);
        $('.addOne').click(addOne)
        $('.removeAll').click(removeAll);
    }
    function removeOne(){
        let check = $(this).data("id");
        let newCart = [];
        for(let a of articlesInCart){
            if(a.id == check){
                if(parseInt(a.quantity) > 1){
                    a.quantity = parseInt(a.quantity) - 1;
                }
                else{
                    continue;
                }
            }
            newCart.push(a);
        }
        setItemToLocalStorage("cart", newCart);
        numberOfArticles();
        cartCheck();
    }
    function addOne(){
        let check = $(this).data("id");
        let newCart = [];
        for(let a of articlesInCart){
            if(a.id == check){
                if(parseInt(a.quantity) > 0){
                    a.quantity = parseInt(a.quantity) + 1;
                }
                else{
                    continue;
                }
            }
            newCart.push(a);
        }
        setItemToLocalStorage("cart", newCart);
        numberOfArticles();
        cartCheck();
    }
    function removeAll(){
        let check = $(this).data("id");
        let newCart = [];
        for(let a of articlesInCart){
            if(a.id == check){
                    continue;
            }
            newCart.push(a);
        }
        setItemToLocalStorage("cart", newCart);
        numberOfArticles();
        cartCheck();
    }
    function addItemToCart(){
        let productId=$(this).data("id")

        if(articlesInCart){
            if(ProductAlreadyInCart()){
                increaseQuantitiy();
                
            }
            else{
                addNewProduct()
                numberOfArticles()
            }
        }
        else{
            addFirstProduct() 
            numberOfArticles()
                
        }
        function addFirstProduct(){
            let productArray=[]
            productArray[0]={
                id:productId,
                quantity: 1
            }
            setItemToLocalStorage('cart',productArray)
        }
        function ProductAlreadyInCart(){
            return articlesInCart.filter(p=>p.id==productId).length
        }
        function increaseQuantitiy(){
            articlesInCart= getItemFromLocalStorage("cart")
            for(let product of articlesInCart){
                if(product.id==productId){
                    product.quantity++;
                    break;
                }
            }
            setItemToLocalStorage("cart", articlesInCart)
        }
        function addNewProduct(){
            let articlesInCart = getItemFromLocalStorage("cart")
            articlesInCart.push({
                id:productId,
                quantity: 1
            })
            setItemToLocalStorage("cart",articlesInCart)
        }
    }   
    function numberOfArticles(){
        articlesInCart = getItemFromLocalStorage("cart")
        let productDiv = $("#cartIspis")
        let productTxt=""
        if(articlesInCart){
            let productNum = articlesInCart.length
            if(productNum==1){
                productTxt=`${productNum} product`
        }
            else{
                productTxt=`${productNum} products`
            }
        }
        else{
            productTxt = "0 products"
        }
        $(productDiv).html(productTxt)
    }	
    function filterChange(){
        ajaxCallBack("assets/data/articles.json", ispisArtikala)
    }
}
