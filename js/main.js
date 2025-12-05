// main.js
document.addEventListener('DOMContentLoaded', function() {
    // إضافة تأثيرات للبطاقات عند التمرير
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    // مراقبة جميع العناصر التي تحتاج إلى تأثيرات
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
    
    // تصفية الخدمات حسب الفئة
    const categoryBtns = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // إزالة النشط من جميع الأزرار
            categoryBtns.forEach(b => b.classList.remove('active'));
            // إضافة النشط للزر المحدد
            this.classList.add('active');
            
            const categoryId = this.getAttribute('data-category');
            
            // تصفية البطاقات
            serviceCards.forEach(card => {
                if (categoryId === 'all' || card.getAttribute('data-category') === categoryId) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // تفعيل نموذج الاتصال
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactForm);
    }
    
    // تأثيرات خاصة للبطاقات
    initializeCardEffects();
    
    // تحديث الأسعار الديناميكية
    updateDynamicPrices();
});

// تأثيرات متقدمة للبطاقات
function initializeCardEffects() {
    const cards = document.querySelectorAll('.service-card, .feature-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '';
        });
    });
}

// دالة معالجة نموذج الاتصال
function handleContactForm(event) {
    event.preventDefault();
    
    // عرض مؤشر التحميل
    const submitBtn = event.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    submitBtn.disabled = true;
    
    // جمع بيانات النموذج
    const formData = {
        name: document.getElementById('name').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        service: document.getElementById('service').value,
        message: document.getElementById('message').value.trim(),
        timestamp: new Date().toISOString()
    };
    
    // التحقق من البيانات
    if (!formData.name || !formData.phone) {
        showNotification('الرجاء ملء جميع الحقول الإلزامية', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // التحقق من رقم الهاتف
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        showNotification('الرجاء إدخال رقم هاتف صحيح', 'error');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        return;
    }
    
    // محاكاة إرسال البيانات
    setTimeout(() => {
        console.log('تم إرسال النموذج:', formData);
        
        // إظهار رسالة نجاح
        showNotification('🎉 تم إرسال طلبك بنجاح! سنتصل بك قريباً', 'success');
        
        // إعادة تعيين النموذج
        event.target.reset();
        
        // استعادة زر الإرسال
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
    }, 2000);
}

// دالة لعرض الإشعارات
function showNotification(message, type) {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        right: 20px;
        background: ${type === 'success' ? '#28a745' : '#dc3545'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: flex;
        justify-content: space-between;
        align-items: center;
        z-index: 9999;
        animation: slideInLeft 0.5s ease-out;
        font-size: 1.1rem;
    `;
    
    document.body.appendChild(notification);
    
    // إغلاق الإشعار
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutLeft 0.5s ease-out';
        setTimeout(() => notification.remove(), 500);
    });
    
    // إغلاق تلقائي بعد 5 ثواني
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutLeft 0.5s ease-out';
            setTimeout(() => notification.remove(), 500);
        }
    }, 5000);
}

// تحديث الأسعار الديناميكية
function updateDynamicPrices() {
    const priceElements = document.querySelectorAll('.service-price');
    
    priceElements.forEach(element => {
        const basePrice = element.getAttribute('data-base-price');
        if (basePrice) {
            // إضافة تنسيق للعملة
            const price = parseInt(basePrice);
            const formattedPrice = price.toLocaleString('ar-SA');
            element.querySelector('span').textContent = `${formattedPrice} ر.س`;
        }
    });
}

// تحسينات التمرير
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // التمرير لأسفل
        header.style.transform = 'translateY(-100%)';
    } else {
        // التمرير لأعلى
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// تأثيرات النقر على الأزرار
document.querySelectorAll('.btn, .whatsapp-btn, .phone-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // تأثير الموجة
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.7);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// إضافة أنماط CSS للرسوم المتحركة
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutLeft {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(-100%); opacity: 0; }
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background 0.3s;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
`;
document.head.appendChild(style);