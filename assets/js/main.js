document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            backToTop.classList.toggle('show', window.pageYOffset > 300);
        });
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            header.style.padding = window.scrollY > 50 ? '10px 0' : '15px 0';
        });
    }
    window.sendWhatsApp = function(serviceName) {
        const pageUrl = window.location.href;
        const message = `أنا أريد هذه الخدمة: ${serviceName}\nمن صفحة: ${pageUrl}\nرقم جوالي هو:\nالموعد الذي أرغب بتنفيذ الخدمة فيه هو:\nعنواني بالتفصيل هو:`;
        window.open(`https://wa.me/201110760081?text=${encodeURIComponent(message)}`, '_blank');
    };
});