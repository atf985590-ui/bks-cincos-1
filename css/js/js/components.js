// قوالب الصفحات
const pageTemplates = {
    profile: (state) => `
        <div class="page info-card">
            <h2>الملف الشخصي</h2>
            <p><strong>البريد الإلكتروني:</strong> ${state.user.email}</p>
            <p>
                <strong>خطة VIP الحالية:</strong> 
                ${state.user.vipLevel > 0 ? `VIP ${state.user.vipLevel} <span class="vip-badge">VIP</span>` : 'لا يوجد'}
            </p>
            <p><strong>إجمالي الأرباح:</strong> <span style="color: var(--accent-primary)">${(state.user.balance + 15.50).toFixed(2)}$</span></p>
            <div class="vip-details">
                <h4><i class="fas fa-crown"></i> مزايا VIP ${state.user.vipLevel > 0 ? state.user.vipLevel : 1}</h4>
                <div class="vip-benefits">
                    <div class="benefit-item">
                        <div>ربح يومي</div>
                        <div class="benefit-value">${state.user.vipLevel > 0 ? appData.vipPlans[state.user.vipLevel-1].dailyLogin : 0.7}$</div>
                    </div>
                    <div class="benefit-item">
                        <div>مكافأة المهام</div>
                        <div class="benefit-value">${state.user.vipLevel > 0 ? appData.vipPlans[state.user.vipLevel-1].taskReward : 0.7}$</div>
                    </div>
                    <div class="benefit-item">
                        <div>دعوة الأصدقاء</div>
                        <div class="benefit-value">${state.user.vipLevel > 0 ? appData.vipPlans[state.user.vipLevel-1].referralReward : 1}$</div>
                    </div>
                </div>
            </div>
        </div>
    `,
    
    vip: (state) => `
        <div class="page">
            <h2>خطط كبار الشخصيات</h2>
            <div class="grid-layout">
                ${appData.vipPlans.map(plan => `
                    <div class="info-card" style="text-align:center;">
                        <h3>VIP ${plan.level} ${plan.level > 15 ? '<span class="vip-badge">مميز</span>' : ''}</h3>
                        <p style="font-size:1.5rem;font-weight:bold;color:var(--accent-primary);">${plan.price.toFixed(2)}$</p>
                        
                        <div class="vip-details" style="margin: 15px 0;">
                            <div class="vip-benefits">
                                <div class="benefit-item">
                                    <div>ربح يومي</div>
                                    <div class="benefit-value">${plan.dailyLogin}$</div>
                                </div>
                                <div class="benefit-item">
                                    <div>مكافأة المهام</div>
                                    <div class="benefit-value">${plan.taskReward}$</div>
                                </div>
                                <div class="benefit-item">
                                    <div>دعوة الأصدقاء</div>
                                    <div class="benefit-value">${plan.referralReward}$</div>
                                </div>
                            </div>
                        </div>
                        
                        <button class="btn ${plan.level > 15 ? 'btn-gold' : ''}" 
                                data-action="select-vip-for-deposit" 
                                data-level="${plan.level}" 
                                ${state.user.vipLevel >= plan.level ? 'disabled' : ''}>
                            ${state.user.vipLevel >= plan.level ? 'مُفعّلة' : 'اشترك الآن'}
                        </button>
                    </div>
                `).join('')}
            </div>
        </div>
    `,
    
    deposit: (state) => {
        const selectedPlan = appData.vipPlans.find(p => p.level === state.user.depositPlan);
        return `
        <div class="page info-card">
            <h2>إيداع للاشتراك في VIP ${selectedPlan.level}</h2>
            <p>المبلغ المطلوب: <strong style="color:var(--accent-primary);">${selectedPlan.price.toFixed(2)}$</strong></p>
            <p>بريدك الإلكتروني: <strong>${state.user.email}</strong></p>
            
            <div class="instructions">
                <h3><i class="fas fa-info-circle"></i> كيفية الإيداع:</h3>
                <ol>
                    <li>اختر عملة الدفع المناسبة لك من القائمة</li>
                    <li>انسخ عنوان المحفظة المناسب</li>
                    <li>اذهب إلى منصتك (مثل Binance) وأرسل المبلغ المطلوب (${selectedPlan.price.toFixed(2)}$)</li>
                    <li>بعد إتمام التحويل بنجاح، عد إلى هنا واضغط على "تأكيد الإيداع"</li>
                </ol>
            </div>
            
            <hr style="border-color:var(--card-border);margin:20px 0;">
            
            ${appData.depositAddresses.map(addr => `
                <div class="method-item">
                    <img src="${addr.logo}" alt="${addr.currency} logo">
                    <div class="method-info">
                        <span>${addr.currency}</span>
                        <p>${addr.address}</p>
                    </div>
                    <button class="copy-btn" data-copy="${addr.address}">
                        <i class="fas fa-copy"></i> نسخ
                    </button>
                </div>
            `).join('')}
            
            <br>
            <button class="btn" data-action="confirm-deposit" style="width:100%;">
                <i class="fas fa-check-circle"></i> تأكيد الإيداع
            </button>
        </div>`;
    },
    
    withdraw: (state) => `
        <div class="page">
            <h2>اختر وسيلة السحب</h2>
            <div class="grid-layout">
                ${appData.withdrawMethods.map(m => `
                    <div class="info-card method-item animated-element" 
                         data-action="show-withdraw-modal" 
                         data-method='${JSON.stringify(m)}' 
                         style="cursor:pointer;flex-direction:row;justify-content:center;align-items:center;text-align:center;">
                        <img src="${m.logo}" alt="${m.name}">
                        <h3>${m.name}</h3>
                    </div>
                `).join('')}
            </div>
            
            <div class="info-card" style="margin-top: 20px;">
                <h3><i class="fas fa-gift"></i> مكافأة السحب الأولى</h3>
                <p>احصل على مكافأة إضافية 5% عند سحبك الأول!</p>
            </div>
        </div>
    `,
    
    tasks: (state) => `
        <div class="page">
            <h2>المهام اليومية</h2>
            <div class="info-card">
                <h3><i class="fas fa-tasks"></i> المهام المتاحة</h3>
                <div class="method-item">
                    <i class="fas fa-sign-in-alt" style="font-size: 24px;"></i>
                    <div class="method-info">
                        <span>تسجيل الدخول اليومي</span>
                        <p>سجل دخولك اليوم لتحصل على مكافأة ${state.user.vipLevel > 0 ? appData.vipPlans[state.user.vipLevel-1].dailyLogin : 0.7}$</p>
                    </div>
                    <button class="btn">المطالبة</button>
                </div>
                
                <div class="method-item">
                    <i class="fas fa-user-friends" style="font-size: 24px;"></i>
                    <div class="method-info">
                        <span>دعوة صديق</span>
                        <p>ادعُ أصدقاءك لتحصل على ${state.user.vipLevel > 0 ? appData.vipPlans[state.user.vipLevel-1].referralReward : 1}$ لكل صديق</p>
                    </div>
                    <button class="btn">المطالبة</button>
                </div>
                
                <div class="method-item">
                    <i class="fas fa-check-circle" style="font-size: 24px;"></i>
                    <div class="method-info">
                        <span>إكمال المهمة</span>
                        <p>أكمل المهمة لتحصل على ${state.user.vipLevel > 0 ? appData.vipPlans[state.user.vipLevel-1].taskReward : 0.7}$</p>
                    </div>
                    <button class="btn">المطالبة</button>
                </div>
            </div>
        </div>
    `
};

// وظائف المساعدة
const helpers = {
    // تحديث شريط السحب
    updateWithdrawalFeed: function(state) {
        const feedEl = document.getElementById('feed-item');
        if (feedEl && state.withdrawalFeedIndex !== undefined) {
            feedEl.innerHTML = appData.withdrawalMessages[state.withdrawalFeedIndex];
            feedEl.classList.add('visible');
            
            setTimeout(() => {
                feedEl.classList.remove('visible');
                setTimeout(() => {
                    state.withdrawalFeedIndex = (state.withdrawalFeedIndex + 1) % appData.withdrawalMessages.length;
                    feedEl.innerHTML = appData.withdrawalMessages[state.withdrawalFeedIndex];
                    feedEl.classList.add('visible');
                }, 500);
            }, 2500);
        }
    },
    
    // تطبيق تأثير Ripple على الأزرار
    applyRippleEffect: function(e) {
        const target = e.target.closest('button');
        if (!target) return;
        
        const ripple = document.createElement("span");
        ripple.classList.add("ripple");
        target.appendChild(ripple);
        const rect = target.getBoundingClientRect();
        ripple.style.left = `${e.clientX - rect.left - (ripple.offsetWidth / 2)}px`;
        ripple.style.top = `${e.clientY - rect.top - (ripple.offsetHeight / 2)}px`;
        ripple.onanimationend = () => ripple.remove();
    }
};
