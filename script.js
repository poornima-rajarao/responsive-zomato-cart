const mainCourseItems = [
            {
                id: 101,
                name: "Chicken Biryani",
                price: 369,
                image: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Chicken-Biryani-Recipe.jpg"
            },
            {
                id: 102,
                name: "Paneer Butter Masala",
                price: 299,
                image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/07/paneer-butter-masala-recipe.jpg"
            },
            {
                id: 103,
                name: "Mushroom Biryani",
                price: 420,
                image: "https://www.indianveggiedelight.com/wp-content/uploads/2019/09/mushroom-biryani-featured.jpg"
            }
        ];

        const dessertItems = [
            {
                id: 201,
                name: "Choco Fudge",
                price: 149,
                image: "https://bakingamoment.com/wp-content/uploads/2024/12/IMG_4427-fudge-recipe-1200px.jpg"
            },
            {
                id: 202,
                name: "Black Currant",
                price: 99,
                image: "https://5.imimg.com/data5/AU/CD/YR/SELLER-26783608/black-currant-iceceam.jpg"
            },
            {
                id: 203,
                name: "Vanilla Ice Cream",
                price: 79,
                image: "https://cdn.loveandlemons.com/wp-content/uploads/2023/06/homemade-ice-cream.jpg"
            }
        ];

        const mainBody = document.getElementById("main-course-body");
        const dessertBody = document.getElementById("dessert-body");
        const grandTotalEl = document.getElementById("grand-total");
        const buyAllBtn = document.getElementById("buy-all");

        const state = {};

        function formatPrice(price) {
            return price.toLocaleString("en-IN");
        }

        function updateGrandTotal() {
            const total = Object.values(state).reduce((sum, item) => sum + item.qty * item.price, 0);
            grandTotalEl.textContent = formatPrice(total);
        }

        function updateItemTotal(id, totalEl) {
            const total = state[id].qty * state[id].price;
            totalEl.textContent = formatPrice(total);
            totalEl.classList.add("flash");
            setTimeout(() => totalEl.classList.remove("flash"), 200);
        }

        function createRow(item, container) {
            state[item.id] = { ...item, qty: 0 };

            const row = document.createElement("tr");

            row.innerHTML = `
        <td>${item.id}</td>
        <td>${item.name}</td>
        <td><img src="${item.image}" alt="${item.name}" class="item-img"></td>
        <td><i class="bi bi-currency-rupee"></i>${formatPrice(item.price)}/-</td>
        <td>
          <button class="qty-btn" id="minus-${item.id}"><i class="bi bi-dash-circle"></i></button>
          <span id="qty-${item.id}" class="mx-2">0</span>
          <button class="qty-btn" id="plus-${item.id}"><i class="bi bi-plus-circle"></i></button>
        </td>
        <td>
          <i class="bi bi-currency-rupee"></i><span id="total-${item.id}" class="total-highlight">0</span>/-
        </td>
      `;

            container.appendChild(row);

            const qtyEl = document.getElementById(`qty-${item.id}`);
            const totalEl = document.getElementById(`total-${item.id}`);
            const plusBtn = document.getElementById(`plus-${item.id}`);
            const minusBtn = document.getElementById(`minus-${item.id}`);

            plusBtn.onclick = () => {
                state[item.id].qty += 1;
                qtyEl.textContent = state[item.id].qty;
                updateItemTotal(item.id, totalEl);
                updateGrandTotal();
            };

            minusBtn.onclick = () => {
                if (state[item.id].qty > 0) {
                    state[item.id].qty -= 1;
                    qtyEl.textContent = state[item.id].qty;
                    updateItemTotal(item.id, totalEl);
                    updateGrandTotal();
                }
            };
        }

        
        mainCourseItems.forEach(item => createRow(item, mainBody));
        dessertItems.forEach(item => createRow(item, dessertBody));
        updateGrandTotal();

        
        buyAllBtn.onclick = () => {
            const orderedItems = Object.values(state)
                .filter(item => item.qty > 0)
                .map(item => `${item.qty} x ${item.name} = ₹${formatPrice(item.qty * item.price)}`)
                .join("\n");

            const total = Object.values(state).reduce((sum, item) => sum + item.qty * item.price, 0);

            if (total === 0) {
                alert("Please add items to your cart before buying.");
                return;
            }

            alert(`Order Summary:\n\n${orderedItems}\n\nTotal: ₹${formatPrice(total)}\n\n Thank you for your order!`);
        };
