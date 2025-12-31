// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 汉堡菜单交互
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        
        // 汉堡菜单动画
        hamburger.classList.toggle('toggle');
    });

    // 点击导航链接后关闭菜单
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 减去导航栏高度
                    behavior: 'smooth'
                });
            }
        });
    });

    // 表单提交处理
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            
            // 简单的表单验证
            if (!name || !email || !message) {
                alert('请填写所有必填字段！');
                return;
            }
            
            // 简单的邮箱验证
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('请输入有效的邮箱地址！');
                return;
            }
            
            // 模拟表单提交
            alert('表单提交成功！我们会尽快与您联系。');
            this.reset();
        });
    }

    // 页面滚动时的导航栏效果
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
            navbar.style.padding = '0.8rem 0';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.padding = '1rem 0';
        }
    });

    // 元素进入视口时的动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-item, .content-left, .content-right');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // 为当前页面的导航链接添加active类
    const currentPage = window.location.pathname;
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    navLinksAll.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPage || (currentPage === '/' && linkPath === '/index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// 窗口调整大小时的处理
window.addEventListener('resize', function() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('toggle');
    }
});

// 添加汉堡菜单的CSS动画样式
const style = document.createElement('style');
style.textContent = `
    .hamburger.toggle span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger.toggle span:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.toggle span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .nav-links {
        transition: left 0.3s ease;
    }
`;
document.head.appendChild(style);