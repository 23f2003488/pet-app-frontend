const ProgressTracker = {
    template: `
    <div class="progress-container">
      <div class="progress-box">
        <h2>Your Progress</h2>

        <div class="xp-status">
          <p><strong>XP:</strong> {{ currentXP }} / {{ maxXP }} (You're {{ xpPercent }}% there!)</p>
        </div>

        <div class="question-summary">
          <p><strong>Correct Answers:</strong> {{ correct }}</p>
          <p><strong>Incorrect Answers:</strong> {{ incorrect }}</p>
        </div>

        <canvas id="xpChart" width="300" height="200"></canvas>

        <button class="back-button" @click="goToDashboard">Back to Pet</button>
      </div>
    </div>
  `,
    data() {
        const currentUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const allProgress = JSON.parse(localStorage.getItem("userProgress") || "{}");
        const progress = currentUser ? allProgress[currentUser.username] : null;
        const xp = progress?.xp || 0;

        return {
            currentXP: xp,
            maxXP: 500,
            correct: progress?.correct || 0,
            incorrect: progress?.incorrect || 0,
            xpHistory: [50, 70, 100, 90, 120, 80, xp]
        };
    },
    computed: {
        xpPercent() {
            return Math.round((this.currentXP / this.maxXP) * 100)
        }
    },
    methods: {
        drawChart() {
            const ctx = document.getElementById('xpChart').getContext('2d')
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'XP Earned',
                        data: this.xpHistory,
                        fill: false,
                        borderColor: '#43a047',
                        backgroundColor: '#66bb6a',
                        tension: 0.3,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: { display: false }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { stepSize: 20 }
                        }
                    }
                }
            })
        },
        goToDashboard() {
            window.location.hash = "#/dashboard"
        }
    },
    mounted() {
        const style = document.createElement('style')
        style.textContent = `
      .progress-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #e8f5e9;
        font-family: 'Comic Sans MS', cursive, sans-serif;
      }

      .progress-box {
        background: #ffffff;
        padding: 30px;
        border-radius: 30px;
        box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        width: 400px;
        text-align: center;
        position: relative;
      }

      h2 {
        color: #43a047;
        margin-bottom: 20px;
      }

      .xp-status p,
      .question-summary p {
        font-size: 1.1rem;
        margin: 10px 0;
        color: #333;
      }

      canvas {
        margin: 25px auto;
      }

      .back-button {
        background-color: #66bb6a;
        color: white;
        border: none;
        padding: 12px 25px;
        border-radius: 25px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 20px;
        box-shadow: 0 6px 12px rgba(0,0,0,0.1);
        transition: transform 0.2s ease;
      }

      .back-button:hover {
        transform: scale(1.05);
      }
    `
        document.head.appendChild(style)

        this.drawChart()
    }
}
