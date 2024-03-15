function t(t){let e=document.getElementById("productContainer");e&&(e.innerHTML="",t.forEach(t=>{let n=document.createElement("div");n.classList.add("product-card");let c=t.images.length>0?t.images[0]:"";if(c){let e=document.createElement("img");e.src=c,e.alt=t.title,n.appendChild(e)}let o=document.createElement("div");o.innerHTML=`
            <h2>${t.title}</h2>
            <p>${t.description}</p>
            <div>Rating: ${t.rating}</div>
            <div>Stock: ${t.stock} ${t.stock<10?'<span class="low-stock">Low stock</span>':""}</div>
            <div>Category: ${t.category}</div>
            <button>Add to cart</button>
        `,n.appendChild(o),e.appendChild(n)}))}async function e(t){let e="https://dummyjson.com/products";t&&(e+=`/search?q=${t}`);try{let t=await fetch(e);if(!t.ok)throw Error("Failed to fetch products");return(await t.json()).products}catch(t){return console.error("Error fetching products:",t),[]}}document.getElementById("searchButton")?.addEventListener("click",async()=>{let n=document.getElementById("searchInput").value.toLowerCase();t(await e(n))}),e().then(e=>t(e));
//# sourceMappingURL=index.b78fc687.js.map
