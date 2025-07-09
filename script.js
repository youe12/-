// 点餐系统相关（只在有菜单时执行）
if (document.getElementById('dishes')) {
    // 示例菜品数据
    const dishes = [
        {
            id: 1,
            name: '宫保鸡丁',
            desc: '经典川菜，微辣下饭',
            price: 22,
            img: 'https://img.zcool.cn/community/01b6e95d5b2e2fa801216518b2e2e2.jpg',
        },
        {
            id: 2,
            name: '鱼香肉丝',
            desc: '酸甜可口，老少皆宜',
            price: 18,
            img: 'https://img.zcool.cn/community/01b6e95d5b2e2fa801216518b2e2e2.jpg',
        },
        {
            id: 3,
            name: '麻婆豆腐',
            desc: '麻辣鲜香，豆腐嫩滑',
            price: 16,
            img: 'https://img.zcool.cn/community/01b6e95d5b2e2fa801216518b2e2e2.jpg',
        },
        {
            id: 4,
            name: '红烧牛肉面',
            desc: '牛肉鲜嫩，汤头浓郁',
            price: 25,
            img: 'https://img.zcool.cn/community/01b6e95d5b2e2fa801216518b2e2e2.jpg',
        },
        {
            id: 5,
            name: '辣子鸡',
            desc: '香辣可口，肉质鲜嫩',
            price: 25,
            img: 'robot.jpg',
        },
    ];
    const cart = {};

    function renderDishes() {
        const dishesDiv = document.getElementById('dishes');
        dishesDiv.innerHTML = '';
        dishes.forEach(dish => {
            const dishDiv = document.createElement('div');
            dishDiv.className = 'dish';
            dishDiv.innerHTML = `
                <img src="${dish.img}" alt="${dish.name}">
                <div class="dish-name">${dish.name}</div>
                <div class="dish-desc">${dish.desc}</div>
                <div class="dish-price">￥${dish.price}</div>
                <button onclick="addToCart(${dish.id})">加入购物车</button>
            `;
            dishesDiv.appendChild(dishDiv);
        });
    }

    function renderCart() {
        const cartItemsUl = document.getElementById('cart-items');
        cartItemsUl.innerHTML = '';
        let total = 0;
        Object.values(cart).forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.name} x ${item.count}</span>
                <span>￥${item.price * item.count}</span>
                <button onclick="removeFromCart(${item.id})">删除</button>
            `;
            cartItemsUl.appendChild(li);
            total += item.price * item.count;
        });
        document.getElementById('total-price').textContent = `￥${total}`;
    }

    window.addToCart = function(id) {
        const dish = dishes.find(d => d.id === id);
        if (!cart[id]) {
            cart[id] = { ...dish, count: 1 };
        } else {
            cart[id].count++;
        }
        renderCart();
    };

    window.removeFromCart = function(id) {
        if (cart[id]) {
            cart[id].count--;
            if (cart[id].count <= 0) {
                delete cart[id];
            }
            renderCart();
        }
    };

    document.getElementById('checkout-btn').onclick = function() {
        if (Object.keys(cart).length === 0) {
            alert('购物车为空！');
            return;
        }
        alert('下单成功！感谢您的购买！');
        for (let id in cart) delete cart[id];
        renderCart();
    };

    // 初始化
    renderDishes();
    renderCart();
}

// 首页按钮交互（所有页面都可用）
window.onload = function() {
    document.querySelector('.primary-btn')?.addEventListener('click', function() {
        window.location.href = 'books';
    });
    document.querySelector('.secondary-btn')?.addEventListener('click', function() {
        alert('素教学习致力于用AI赋能素质教育，敬请期待更多功能！');
    });
} 
