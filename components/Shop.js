const Shop = {
  template: `
    <div class="shop-container">
      <h2>🛍️ Welcome to the Shop!</h2>

      <div v-for="(category, index) in categories" :key="index" class="shop-section">
        <h3>{{ category.name }}</h3>

        <div class="scroll-container">
          <button class="scroll-btn left" @click="scrollLeft(index)">&#8592;</button>

          <div class="items-wrapper" ref="wrappers">
            <div class="item-card" v-for="(item, i) in category.items" :key="i">
              <img :src="item.image" :alt="item.name" />
              <p>{{ item.name }}</p>
              <p class="price">
  {{ category.name === 'Gifts' ? (item.price || 0) + ' XP' : (item.price || 0) + ' Coins' }}
</p>


              <!-- Food Logic -->
              <div v-if="category.name === 'Food'">
                <button class="shop-button" @click="toggleFood(item)">
                  {{ item.bought ? (item.used ? 'Buy Again' : 'Feed') : 'Buy' }}
                </button>
              </div>

              <!-- Costumes & Accessories Logic -->
              <div v-else-if="category.name === 'Costumes' || category.name === 'Accessories'">
  <button class="shop-button" v-if="!item.bought" @click="buyItem(item)">Buy</button>
  <button class="shop-button" v-else @click="equipItem(item)">Equip</button>
</div>


              <!-- Gifts -->
              <div v-else-if="category.name === 'Gifts'">
                <button class="shop-button" :disabled="!isGiftUnlocked(item.name)">
                  {{ isGiftUnlocked(item.name) ? 'Unlocked 🎉' : 'Locked 🔒' }}
                </button>
              </div>
            </div>
          </div>

          <button class="scroll-btn right" @click="scrollRight(index)">&#8594;</button>
        </div>
      </div>

      <button class="submit-button" @click="goToDashboard">Back to Dashboard</button>
    </div>
  `,
  data() {
    return {
      categories: [
        {
          name: "Costumes",
          items: [
            { name: "Alien", image: "assets/img/costumes/alein.png", price: 200, bought: false },
            { name: "Astronaut", image: "assets/img/costumes/astro.png", price: 200, bought: false },
            { name: "Suit", image: "assets/img/costumes/suit.png", price: 200, bought: false },
          ]
        },
        {
          name: "Food",
          items: [
            { name: "Chicken", image: "assets/img/food/chicken.png", price: 50, bought: false, used: false },
            { name: "Bone", image: "assets/img/food/bone.png", price: 30, bought: false, used: false },
          ]
        },
        {
          name: "Accessories",
          items: [
            { name: "Bowl", image: "assets/img/accessories/bowl-ord.png", price: 100, bought: false },
            { name: "Collor", image: "assets/img/accessories/collor.png", price: 70, bought: false },
          ]
        },
        {
          name: "Gifts",
          items: [
            { name: "Golden Bowl", image: "assets/img/gifts/bowl-gold.png", price: 500 },
          ]
        }
      ]
    };
  },
  methods: {
    scrollLeft(index) {
      const wrapper = this.$refs.wrappers[index];
      wrapper.scrollBy({ left: -200, behavior: 'smooth' });
    },
    equipItem(item) {
  localStorage.setItem("equippedCostume", item.image);
  alert(`${item.name} equipped!`);
},
    scrollRight(index) {
      const wrapper = this.$refs.wrappers[index];
      wrapper.scrollBy({ left: 200, behavior: 'smooth' });
    },
    goToDashboard() {
      window.location.hash = "#/dashboard";
    },
    isGiftUnlocked(giftName) {
      // Dummy logic – you can replace with actual logic using localStorage XP
      const userXP = 600;
      return userXP >= 500; // Always true for now
    },
    buyItem(item) {
      item.bought = true;
    },
    toggleFood(item) {
      if (!item.bought) {
        item.bought = true;
        item.used = false;
      } else if (!item.used) {
        item.used = true;
      } else {
        item.bought = false;
        item.used = false;
      }
    }
  },
  mounted() {
    const style = document.createElement('style');
    style.textContent = `
      .shop-container {
        padding: 40px;
        background-color: #fff3e0;
        font-family: 'Comic Sans MS', cursive, sans-serif;
        min-height: 100vh;
      }

      h2 {
        text-align: center;
        color: #ef6c00;
        margin-bottom: 30px;
      }

      .shop-section {
        margin-bottom: 40px;
      }

      .shop-section h3 {
        color: #fb8c00;
        margin-bottom: 10px;
        font-size: 1.3rem;
      }

      .scroll-container {
        position: relative;
        display: flex;
        align-items: center;
      }

      .scroll-btn {
        background-color: #ffa726;
        color: white;
        border: none;
        padding: 10px 15px;
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        z-index: 1;
      }

      .scroll-btn:hover {
        transform: scale(1.1);
      }

      .items-wrapper {
        display: flex;
        overflow-x: auto;
        scroll-behavior: smooth;
        margin: 0 10px;
        padding: 10px;
        background: #fff;
        border-radius: 20px;
        gap: 15px;
        flex-wrap: nowrap;
      }

      .item-card {
        min-width: 130px;
        background-color: #ffe0b2;
        border-radius: 15px;
        text-align: center;
        padding: 10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.15);
        flex-shrink: 0;
      }

      .item-card img {
        width: 100px;
        height: 100px;
        object-fit: contain;
        margin-bottom: 8px;
      }

      .item-card p {
        margin: 4px 0;
        font-size: 0.9rem;
        font-weight: bold;
        color: #6d4c41;
      }

      .item-card .price {
        font-size: 0.85rem;
        color: #444;
        font-weight: normal;
      }

      .shop-button {
        background-color: #4db6ac;
        color: white;
        border: none;
        padding: 6px 14px;
        margin: 4px 4px 0 4px;
        border-radius: 15px;
        font-size: 0.8rem;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        transition: transform 0.2s ease-in-out;
      }

      .shop-button:hover {
        transform: scale(1.05);
      }

      .shop-button:disabled {
        background-color: #ccc;
        color: #666;
        cursor: not-allowed;
      }

      .items-wrapper::-webkit-scrollbar {
        display: none;
      }

      .submit-button {
        display: block;
        margin: 40px auto 0;
        background-color: #8e24aa;
        color: white;
        padding: 12px 24px;
        border: none;
        border-radius: 30px;
        font-size: 1rem;
        cursor: pointer;
        box-shadow: 0 6px 12px rgba(0,0,0,0.2);
      }

      .submit-button:hover {
        transform: scale(1.05);
      }
    `;
    document.head.appendChild(style);
  }
};
