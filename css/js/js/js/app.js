document.addEventListener('DOMContentLoaded', () => {
    // حالة التطبيق
    const state = { 
        currentPage: 'profile', 
        user: { 
            email: '', 
            balance: 0.00, 
            vipLevel: 0, 
            depositPlan: 1 
        },
        withdrawalFeedIndex: 0
    };
    
    // عناصر DOM
    const mainContent = document.getElementById('main-content');
    const modalOverlay = document.getElementById('modal-overlay');
    const header = document.querySelector('header');
    
    // وظائف التطبيق
    const appFunctions = {
        // عرض التطبيق
        render: function() {
            header.innerHTML = `
                <div class="header-top">
                    <h1 class="app-title">
                        <img src="https://api.dicebear.com/7.x/bottts/svg?seed=BKS&backgroundColor=00e6ff,9d4edd" alt="Logo">
                        BKS Cincos
                    </h1>
                    <div class="balance-display">
                        <i class="fas fa-wallet"></i>
                        الرصيد: <span id="balance-amount">${state.user.balance.toFixed(2)}$</span>
                    </div>
                </div>
                <div class="withdrawal-feed">
                    <span id="feed-item" class="feed-item"></span>
                </div>
            `;
            
            mainContent.innerHTML = pageTemplates[state.currentPage](state);
            document.getElementById('nav-bar').innerHTML = appData.navItems.map(item => `
                <button class="nav-btn ${state.currentPage === item.page ? 'active' : ''}" data-page="${item.page}">
                    ${item.svg}
                    <p>${item.label}</p>
                </button>
            `).join('');
            
            // تحديث شريط السحب
            helpers.updateWithdrawalFeed(state);
        },
        
        // معالجة الإجراءات
        handleAction: function(action, data) {
            switch (action) {
                case 'login':
                    const email = document.getElementById('login-email').value;
                    if (!email) { alert('الرجاء إدخال البريد الإلكتروني'); return; }
                    state.user.email = email;
                    document.getElementById('login-screen').classList.remove('active');
                    document.getElementById('main-app').classList.add('active');
                    this.render();
                    break;
                case 'navigate': 
                    state.currentPage = data.page; 
                    this.render(); 
                    break;
                case 'copy': 
                    navigator.clipboard.writeText(data.copy).then(() => { 
                        alert('تم نسخ العنوان!'); 
                    }); 
                    break;
                case 'select-vip-for-deposit':
                    state.user.depositPlan = parseInt(data.level);
                    state.currentPage = 'deposit';
                    this.render();
                    break;
                case 'confirm-deposit':
                    modalOverlay.innerHTML = `
                        <div class="modal-content" style="text-align:center;">
                            <button class="modal-close" data-action="close-modal">&times;</button>
                            <h3>تم استلام طلبك</h3>
                            <p><i class="fas fa-clock" style="color: var(--warning-color); font-size: 2rem;"></i></p>
                            <p>طلب الإيداع الخاص بك قيد المراجعة. قد يستغرق الأمر من 3 دقائق إلى 24 ساعة. لا تقم بإجراء إيداع آخر لنفس الخطة حتى يتم تحديث حالة هذا الطلب.</p>
                            <button class="btn" data-action="close-modal">موافق</button>
                        </div>`;
                    modalOverlay.style.display = 'flex';
                    break;
                case 'show-withdraw-modal':
                    const method = JSON.parse(data.method);
                    modalOverlay.innerHTML = `
                        <div class="modal-content">
                            <button class="modal-close" data-action="close-modal">&times;</button>
                            <h3>سحب عبر ${method.name}</h3>
                            <input type="text" id="withdraw-address" placeholder="عنوان المحفظة">
                            <input type="number" id="withdraw-amount" placeholder="المبلغ" min="10">
                            <div class="modal-buttons">
                                <button class="btn" data-action="process-withdrawal">تأكيد</button>
                                <button class="btn" data-action="close-modal" style="background:grey;">إلغاء</button>
                            </div>
                        </div>`;
                    modalOverlay.style.display = 'flex';
                    break;
                case 'close-modal': 
                    modalOverlay.style.display = 'none'; 
                    break;
            }
        },
        
        // إعداد معالج الأحداث
        setupEventListeners: function() {
            document.body.addEventListener('click', (e) => {
                helpers.applyRippleEffect(e);
                
                const target = e.target.closest('button');
                if (!target) return;
                
                const { action, page, copy, level, method } = target.dataset;
                
                if (target.id === 'login-btn') this.handleAction('login');
                else if (page) this.handleAction('navigate', { page });
                else if (copy) this.handleAction('copy', { copy });
                else if (action) this.handleAction(action, { ...target.dataset });
            });
            
            // تحديث شريط السحب كل 3 ثواني
            setInterval(() => {
                helpers.updateWithdrawalFeed(state);
            }, 3000);
        },
        
        // تهيئة التطبيق
        init: function() {
            this.render();
            this.setupEventListeners();
            document.getElementById('login-screen').classList.add('active');
        }
    };
    
    // بدء التطبيق
    appFunctions.init();
});
