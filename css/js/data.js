// بيانات التطبيق
const appData = {
    navItems: [
        { page: 'profile', label: 'أنا', svg: '<svg viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>' },
        { page: 'vip', label: 'VIP', svg: '<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>' },
        { page: 'deposit', label: 'إيداع', svg: '<svg viewBox="0 0 24 24"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>' },
        { page: 'withdraw', label: 'سحب', svg: '<svg viewBox="0 0 24 24"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>' },
        { page: 'tasks', label: 'مهام', svg: '<svg viewBox="0 0 24 24"><path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>' }
    ],
    
    depositAddresses: [
        { currency: 'USDT (TRC20)', address: 'TLsGeELYfexmuhK6g3TVQ44AAt5kxZN3gb', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' },
        { currency: 'BTC (Segwit)', address: 'bc1qlvx4tzwzvm66p0ukfykkv4zsqq7ywug65282u2', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
        { currency: 'BNB (BEP20)', address: '0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' },
        { currency: 'Ethereum (ERC20)', address: '0x83c317eab7f9d70cf1f98ca8cd30fce09d7fe18e', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' }
    ],
    
    withdrawMethods: [
        { name: 'USDT (TRC20)', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/825.png' },
        { name: 'Bitcoin', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png' },
        { name: 'Ethereum', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png' },
        { name: 'BNB Smart Chain', logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png' }
    ],
    
    vipPlans: [],
    
    withdrawalMessages: [],
    
    // إنشاء رسائل السحب العشوائية
    generateWithdrawalMessages: function() {
        const names = ['أحمد', 'محمد', 'علي', 'فاطمة', 'سارة', 'يوسف', 'مريم', 'خالد', 'نور', 'عمر', 'ليلى', 'ياسين'];
        for (let i = 0; i < 20; i++) {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomAmount = (Math.random() * 500 + 10).toFixed(2);
            this.withdrawalMessages.push(`🎉 نجح <strong>${randomName}</strong> في سحب <strong>${randomAmount}$</strong>!`);
        }
    },
    
    // إنشاء خطط VIP مع تفاصيل الأرباح
    generateVipPlans: function() {
        let prices = [5, 8, 12, 18, 27, 40, 60, 90, 135, 200, 300, 450, 675, 1000];
        let dailyLogin = [0.7, 1, 1.5, 2, 3, 4, 5, 7, 9, 12, 15, 20, 25, 30];
        let taskRewards = [0.7, 0.8, 1, 1.2, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8];
        let referralRewards = [1, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10];
        
        for(let i = 1; i <= 14; i++) {
            this.vipPlans.push({
                level: i,
                price: prices[i-1],
                dailyLogin: dailyLogin[i-1],
                taskReward: taskRewards[i-1],
                referralReward: referralRewards[i-1]
            });
        }
        
        // إضافة مستويات VIP إضافية حتى 20
        for(let i = 15; i <= 20; i++) {
            this.vipPlans.push({
                level: i,
                price: this.vipPlans[i-2].price * 1.5,
                dailyLogin: this.vipPlans[i-2].dailyLogin * 1.5,
                taskReward: this.vipPlans[i-2].taskReward * 1.5,
                referralReward: this.vipPlans[i-2].referralReward * 1.5
            });
        }
    },
    
    // تهيئة البيانات
    init: function() {
        this.generateVipPlans();
        this.generateWithdrawalMessages();
    }
};

// تهيئة بيانات التطبيق
appData.init();
